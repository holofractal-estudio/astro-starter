
# Astro Starter

> Código base para clonar y crear sitios web estáticos básicos usando componentes prediseñados y personalizables


## Descripción general del workflow para nuevos proyectos


### Personalizar archivos de configuración para cada sitio

> src/config/site.js 
- generalidades del sitio web como url, nombre, descripción, etc

> src/config/seo.js 
- valores default para etiquetas meta de cada página 
- hacer referencia a valores de site.js, podría no necesitar editarse

> src/config/iconify.js 
- nombres de iconos de los sets instalados a incluir en el proyecto
- por default se incluyen todos los íconos (['*']) para empezar a diseñar
- se van especificando sobre la marcha para quitar el '*' para un build de producción
* [ se implementará componente Icon.astro para usarlo en páginas y por default usa estos iconos ]

> src/config/google-icons.js
- valores para descargar fuentes subseteadas con iconos de material-symbols
- ejecutar 'npm run google-icons-gen' en terminal para descargar la fuente
- alternativa a iconify para tener más control de apariencia de iconos con fuente variable y weights
*  [ se implementará componente Icon.astro con prop que especifica que se usa este tipo de iconos ]


#### Por implementar

> src/config/fonts.js 
- valores para descargar e incluir fuentes de Google Fonts con script 'npm run get-fonts' en terminal

> src/config/components.js 
- diccionario de valores a establecer como default para cada componente a nivel de proyecto
- para hacer decisiones de estilo y diseño manteniendo la personalizacion en MDX al mínimo
- objeto con key por componente (solo los usados o necesarios) conteniendo objeto de configuración default
- puede manejar las mismas propiedades que las que recibe el componente por props
- el componente revisa si existe este objeto para definir valores defaults y luego hace overrides con props


### Diseñar páginas usando MDX con componentes Astro

- Un enfoque de diseño declarativo, con la menor cantidad de HTML posible
- Usar frontmatter para declarar objetos con la información necesaria para diseñar contenido con componentes
- Solo usar 'HTML-like syntax' para diseñar la página con el formato 
	"<Componente {...frontmatter.componente} />" manteniendo el cuerpo del MDX enfocado en layout y texto.
- Usar Markdown donde sea posible para evitar etiquetas para elementos básicos
- Usar 'const componentes = {}' para sustituir tags de Markdown por componentes bien diseñados
- Usar estilos globales default para elementos Markdown




## Componentes Astro

> Guías y reglas para comprender como funcionan y se usan los componentes