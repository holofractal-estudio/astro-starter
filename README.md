
# Astro Starter

> Código base para clonar y crear sitios web estáticos básicos usando componentes prediseñados y personalizables


## Descripción general del workflow para nuevos proyectos


### Personalizar archivos de configuración para cada sitio

> src/config/site.js 
- generalidades del sitio web como url, nombre, descripción, idioma, etc

> src/config/seo.js 
- valores default para etiquetas meta de cada página 
- hacer referencia a valores de site.js, podría no necesitar editarse

> src/config/iconify.js 
- nombres de iconos de los sets instalados a incluir en el proyecto
- por default se incluyen todos los íconos (['*']) para empezar a diseñar
- se van especificando sobre la marcha para quitar el '*' para un build de producción
* [ se implementará componente Icon.astro para usarlo en páginas y por default usa estos iconos ]

#### Por implementar

> src/config/components.js 
- diccionario de valores a establecer como default para cada componente a nivel de proyecto
- para hacer decisiones de estilo y diseño manteniendo la personalizacion en MDX al mínimo
- objeto con key por componente (solo los usados o necesarios) conteniendo objeto de configuración default
- puede manejar las mismas propiedades que las que recibe el componente por props
- el componente revisa si existe este objeto para definir valores defaults y luego hace overrides con props


### Instalar e incluir fuentes de Google con Fontsource

> Objetivo: tener fuentes populares preinstaladas y solo cargarlas en el proyecto cuando se utilicen

> Para instalar fuentes nuevas:
- buscar fuentes en fontsource.org y revisar pesos y ejes si son variables
- npm install @fontsource/font-name | @fontsource-variable/var-font-name
- revisar archivos css en node_modules/@fontsource...
- si es variable, elegir la combinación de ejes modificables en las opciones de css incluídas en el pack 
- si es static, elegir normal y/o italic (vienen en css aparte)
- copiar el código de font-face para latin en los css seleccionados
- pegar font-faces en src/styles/fonts/[static|variable]/font-name.css
- sustituir url de los src para incluir la ruta completa url(@fontsource/font-name/files/...woff2)

> Para incluir fuente en proyecto:
- en src/styles/global.css, dentro de @layer base se importa './tipografia.css'
- en src/styles/tipografia.css: import './fonts/[static|variable]/font-name.css';

> Documentar uso de font-variation-settings o crear utilities para modificarlos facilmente



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