
// Integraciones
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

// Configuración del sitio
import { SITE } from './src/config/site.js';
import ICONIFY from './src/config/iconify.js';

// Configuración de Astro
import { defineConfig } from 'astro/config';
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