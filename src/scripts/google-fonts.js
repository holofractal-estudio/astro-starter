// Descarga múltiples fuentes desde Google Fonts con soporte para variantes e íconos

import fs from 'node:fs/promises';
import path from 'node:path';
import https from 'https';
import fontConfig from '../config/fonts.js';

const {
  cssOutPath = 'src/styles/fonts.css',
  fontsDir = 'public/fonts',
  fonts = [],
} = fontConfig;

const baseUrl = 'https://fonts.googleapis.com/css2';

function normalizeFamilyName(family) {
  return family.toLowerCase().replace(/\s+/g, '-');
}

function sortAxesKeys(keys) {
  return keys.sort((a, b) => {
    if (a === b) return 0;
    const aIsLower = /^[a-z]/.test(a);
    const bIsLower = /^[a-z]/.test(b);

    if (aIsLower && !bIsLower) return -1;
    if (!aIsLower && bIsLower) return 1;

    return a < b ? -1 : 1;
  });
}

function buildFontUrl({ family, axes = {}, icon_names, display = 'swap' }) {
  const sortedAxesKeys = sortAxesKeys(Object.keys(axes));
  const axesPart = sortedAxesKeys.length
    ? `:${sortedAxesKeys.join(',')}@${sortedAxesKeys.map(key => axes[key]).join(',')}`
    : '';
  const familyParam = `family=${family.replace(/\s+/g, '+')}${axesPart}`;
  const iconParam = icon_names ? `&icon_names=${[...icon_names].sort((a, b) => a.localeCompare(b))}` : '';
  const displayParam = `&display=${display}`;
  return `${baseUrl}?${familyParam}${iconParam}${displayParam}`;
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

function replaceAllFontUrls(css, originalUrl, replacementUrl) {
  return css.replace(new RegExp(originalUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), replacementUrl);
}

async function extractFontUrls(css) {
  const matches = [...css.matchAll(/src:\s*url\(['"]?([^'")]+)['"]?\)/g)];
  return [...new Set(matches.map(match => match[1]))];
}

async function run() {
  const cssImports = [];

  for (const config of fonts) {
    try {
      const url = buildFontUrl(config);
      console.log(`\n🔗 Descargando CSS desde: ${url}\n`);

      const css = await download(url);
      const fontUrls = await extractFontUrls(css);
      if (!fontUrls.length) throw new Error('No se encontraron URLs de fuentes en el CSS');

      const fontName = normalizeFamilyName(config.family);
      const fontFile = `${fontName}.woff2`;
      const cssFile = `font-${fontName}.css`;
      const fontPathRelative = `/${path.posix.join(fontsDir.replace(/^public\//, ''), fontFile)}`;

      await fs.mkdir(fontsDir, { recursive: true });
      const fontBuffer = await downloadBinary(fontUrls[0]);
      await fs.writeFile(path.join(fontsDir, fontFile), fontBuffer);
      console.log(`✔ Fuente ${config.family} guardada como ${fontFile}`);

      let localCss = css;
      for (const url of fontUrls) {
        localCss = replaceAllFontUrls(localCss, url, fontPathRelative);
      }

      if (config.class) {
        localCss = localCss.replace(/\.[\w-]+(?=\s*\{)/g, `.${config.class}`);
      }

      const cssOutputDir = path.dirname(cssOutPath);
      const cssFilePath = path.join(cssOutputDir, cssFile);
      await fs.mkdir(cssOutputDir, { recursive: true });
      await fs.writeFile(cssFilePath, `/* Fuente generada desde: ${url} */\n\n${localCss}`);
      console.log(`✔ CSS de ${config.family} guardado en ${cssFile}`);

      cssImports.push(`@import './${cssFile}';`);
    } catch (err) {
      console.error(`\n❌ Error con la fuente ${config.family}:`, err);
    }
  }

  if (cssImports.length > 0) {
    await fs.writeFile(cssOutPath, cssImports.join('\n') + '\n');
    console.log(`\n📄 Archivo maestro de fuentes generado en ${cssOutPath}\n`);
  }

  console.log(`\n🎉 Descarga de fuentes completada\n`);
}

run();
