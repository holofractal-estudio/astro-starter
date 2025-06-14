// Genera URL y descarga el archivo CSS de Material Symbols
// Basado en la configuración de material-symbols.config.js

import fs from 'node:fs/promises';
import https from 'https';
import path from 'node:path';
import config from '../config/google-icons.js';

const {
  generateOriginalCss = true,
  outputPaths = {},
  className = 'material-symbols',
  style,
  variation,
  icons,
} = config;

const cssOutPath = outputPaths.css || 'src/styles/material-symbols.css';
const cssOriginalOutPath = outputPaths.cssOriginal || 'src/styles/material-symbols-original.css';
const fontOutPath = outputPaths.font || 'public/fonts/material-symbols.woff2';
const cssFontUrl = outputPaths.cssFontUrl || '/fonts/material-symbols.woff2';
 

const baseUrl = 'https://fonts.googleapis.com/css2';
const family = `Material+Symbols+${capitalize(style)}`;

const variationKeys = Object.keys(variation).join(',');
const variationValues = Object.values(variation).join(',');

const sortedIcons = sortAlphabetically(icons);
const iconList = sortedIcons.join(',');

const url = `${baseUrl}?family=${family}:${variationKeys}@${variationValues}&icon_names=${iconList}`;

function sortAlphabetically(array) {
  return [...array].sort((a, b) => a.localeCompare(b));
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function download(url) {
  return new Promise((resolve, reject) => {
    https.get(
      url,
      {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
        },
      },
      (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => resolve(data));
      }
    ).on('error', reject);
  });
}

function downloadBinary(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    }).on('error', reject);
  });
}

async function run() {
  try {
    console.log(`\nGenerando URL: ${url}\n`);

    const css = await download(url);

    if (generateOriginalCss) {
      await fs.writeFile(cssOriginalOutPath, css);
      console.log(`✔ CSS original guardado en ${cssOriginalOutPath}\n`);
    }

    const fontUrlMatch = css.match(/src:\s*url\(['"]?([^'")]+)['"]?\)/);
    if (!fontUrlMatch) throw new Error('No se pudo encontrar la URL de la fuente en el CSS');

    const fontUrl = fontUrlMatch[1];
    const fontBuffer = await downloadBinary(fontUrl);

    let localCss = css.replace(fontUrl, cssFontUrl);
    localCss = localCss.replace(/\.material-symbols-[^{\s]+/g, '.'+className);

    localCss = `\n/* Fuente generada desde: ${url} */\n\n` + localCss;

    await fs.writeFile(cssOutPath, localCss);
    console.log(`✔ CSS modificado guardado en ${cssOutPath}\n`);

    await fs.mkdir(path.dirname(fontOutPath), { recursive: true });
    await fs.writeFile(fontOutPath, fontBuffer);
    console.log(`✔ Fuente guardada en ${fontOutPath}\n`);
  } catch (err) {
    console.error('\nError al generar archivos:', err);
  }
}

run();
