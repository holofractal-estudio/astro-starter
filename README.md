# Astro Starter Dev Notes 


## Icon sets

https://icon-sets.iconify.design/material-symbols/
https://icon-sets.iconify.design/material-symbols-light/


## SEO

https://medium.com/@aisyndromeart/optimizing-astro-js-websites-for-seo-a-guide-for-developers-25fcd20c8e30

https://www.freecodecamp.org/news/what-is-open-graph-and-how-can-i-use-it-for-my-website/

https://ogp.me/

- Colocar imagenes para opengraph en /og/index.png (general, o una por página)


### Estructura para personalizar SEO simplificado en páginas (y sus valores default):

seo:

- title = SITE.name
- description = SITE.description

- ogTitle = title
- ogDescription = description
- ogType = "website" | "article" si detecta metadata
- ogImage = SITE.name + "/og/index.jpg"

- publishedTime (fecha ISO)
- modifiedTime (fecha ISO)
- expirationTime (fecha ISO)
- authors (array de strings)
- section (string)
- tags (array de strings)

