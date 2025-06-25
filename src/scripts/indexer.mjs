// -----------------------------
// 📦 Dependencias
// -----------------------------
import { promises as fs } from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';
import { glob } from 'glob';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

// Ruta default del archivo config
const DEFAULT_CONFIG_PATH = 'src/scripts/indexer.config.mjs';

// -----------------------------
// 🔧 Función que genera el archivo index
// Esta función escanea los archivos indicados por el patrón 'src',
// los importa o referencia según el 'type', y genera un archivo 'out' con exports.

async function generateTask({ name, src, out, type }) {
    // console.log(`\n✅ Generando tarea: [${name}]`);

    let files;
    try {
        files = await glob(src, { cwd: process.cwd() });
    } catch (err) {
        console.error(`❌ [${name}] Error al usar glob:`, err);
        return;
    }
    if (!files || files.length === 0) {
        console.warn(`❌ [${name}] No se encontraron archivos para el patrón: ${src}`);
        return;
    }
    // console.log(`✅ [${name}] Archivos encontrados (${files.length}):`);
    // files.forEach(f => console.log(`   - ${f}`));

    let content = `\n// Auto-generado por scripts/indexer.mjs: ${name} \n\n`;

    for (const file of files) {
        const ext = path.extname(file);
        const base = path.basename(file, ext);
        const absPath = path.resolve(file);
        const relPath = './' + path.relative(path.dirname(out), file).replace(/\\/g, '/');

        if (type === 'obj') {
            try {
                const imported = await import(pathToFileURL(absPath).href);
                const data = imported.default;
                // console.log(`✅ [${name}] Importado ${base}:`, data);
                const json = JSON.stringify(data, null, 2);
                content += `export const ${base} = ${json};`;
            } catch (err) {
                console.error(`❌ [${name}] Error al importar objeto desde ${absPath}:`, err);
            }
        } else {
            content += `export { default as ${base} } from '${relPath}';\n`;
        }
    }

    try {
        await fs.mkdir(path.dirname(out), { recursive: true });
        await fs.writeFile(out, content, 'utf8');
        console.log(`✅ [${name}] Generado ${out} (${files.length} elementos)`);
    } catch (err) {
        console.error(`❌ [${name}] Error al escribir archivo:`, err);
    }
}

// -----------------------------
// 📂 Ejecutar múltiples tareas por nombre desde config
// -----------------------------
async function runSelectedTasks(configPath, selectedNames) {

    let config;
    try {
        const configUrl = pathToFileURL(path.resolve(configPath)).href;
        config = (await import(configUrl)).default;
    } catch (err) {
        console.error('❌ Error al cargar config:', err);
        process.exit(1);
    }

    if (!config || typeof config !== 'object' || Object.keys(config).length === 0) {
        console.warn('❌ El archivo de configuración está vacío o malformado.');
        return;
    }

    const allNames = Object.keys(config);
    const namesToRun = selectedNames.length > 0 ? selectedNames : allNames;

    for (const name of namesToRun) {
        const task = config[name];
        if (!task) {
            console.warn(`❌ Tarea '${name}' no encontrada en config.`);
            continue;
        }
        if (!task.type || !task.src || !task.out) {
            console.warn(`❌ Tarea '${name}' está incompleta. Debe tener 'type', 'src' y 'out'.`);
            continue;
        }
        await generateTask({ name, ...task });
    }
}

// -----------------------------
// 🚀 CLI: Parseo de argumentos y ejecución
// -----------------------------
(async () => {
    const argv = yargs(hideBin(process.argv))
        .usage('Uso: node $0 --config archivo.config.js [tarea1 tarea2 ...]')
        .option('config', {
            alias: 'C',
            type: 'string',
            demandOption: false,
            describe: 'Ruta al archivo de configuración .js'
        })
        .help()
        .argv;

    const selectedTasks = argv._.map(String);
    await runSelectedTasks(argv.config || DEFAULT_CONFIG_PATH, selectedTasks);
})();
