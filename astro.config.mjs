// @ts-check
import { defineConfig } from 'astro/config';

// Integraciones
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [mdx(), sitemap(), icon()]
});