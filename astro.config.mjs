
// Configuración de Astro
import { defineConfig } from 'astro/config';

// Configuración del sitio
import { SITE } from './src/config/site.js';
import ICONIFY from './src/config/iconify.js';

// Integraciones
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

export default defineConfig({
  site: SITE.url,
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [
    mdx(), 
    sitemap(), 
    icon({ include: ICONIFY })
  ]
});