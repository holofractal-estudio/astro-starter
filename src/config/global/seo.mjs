
import { SITE } from '@config/global/site.mjs';

// Config object docs: https://github.com/jonasmerlin/astro-seo
export const SEO_DEFAULTS = {
  title: SITE.name,
  titleTemplate: '%s | ' + SITE.name,
  charset: 'UTF-8',
  description: SITE.description,
  openGraph: {
    basic: {
      title: SITE.name,
      type: 'website',
      image: SITE.url + '/og/index.jpg',
      // url: SITE.url, // astro-seo lo define automáticamente 
    },
    optional: {
      description: SITE.description, 
      siteName: SITE.name,
      locale: "es_MX",
    }
  }
};
