// @ts-check
import { defineConfig } from 'astro/config';

// Integraciones
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

import { SITE } from './src/config/site.js';

// https://astro.build/config
export default defineConfig({
  site: SITE.url,
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [mdx(), sitemap(), icon()]
});