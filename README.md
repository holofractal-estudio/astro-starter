
# Astro Starter

> Código base para clonar y crear sitios web estáticos básicos usando componentes prediseñados y personalizables


## Descripción general del workflow para nuevos proyectos


### Personalizar archivos de configuración para cada sitio

> src/config/global/site.js 
- generalidades del sitio web como url, nombre, descripción, idioma, etc

> src/config/global/seo.js 
- valores default para etiquetas meta de cada página 
- hacer referencia a valores de site.js, podría no necesitar editarse

> src/config/global/iconify.js 
- nombres de iconos de los sets instalados a incluir en el proyecto
- por default se incluyen todos los íconos (['*']) para empezar a diseñar
- se van especificando sobre la marcha para quitar el '*' para un build de producción
* [ se implementará componente Icon.astro para usarlo en páginas y por default usa estos iconos ]

#### Archivos de configuración para personalizar componentes y páginas con objetos y funciones javascript


> src/config/data/*.mjs
- objetos con datos que se usan como defaults en diseño de páginas
- pueden ser objetos complejos con configuraciones completas para una página
- pueden ser templates de objetos de props predefinidos que se importan en página y se pasan a un componente
- pueden ser objetos con contenido (texto, diseño) que se repite en varias páginas 
- evitar incluir objetos que se importen directo a un componente (para esto es /config/comps/*.mjs)
- la diferencia con los de la carpeta config/comps es que se usan directo en paginas, no se procesan para usarse en componentes
- tienen una estructura más libre, segun las necesidades del proyecto
- SÍ se modifican a *NIVEL PROYECTO* para uso en páginas


> src/config/comps/*.mjs
- objetos con configuraciones default para componentes prediseñados
- se usan para configurar y generar objetos definidos en src/components/data/*.mjs
- tienen una estructura fija porque contienen propiedades específicas que se usan para generar los objetos con funciones
- si se modifica la estructura de los objetos *puede generar errores en el script indexer*
- los objetos definidos en src/components/data/*.mjs 
	- importan objetos config de esta carpeta
	- generan un objeto procesado a través de una funcion que tome los datos del config
	- se procesan con script 'indexer' para que queden explícitamente escritos en el proyecto
	- se exportan en src/components/data.mjs para importar en componentes
- SÍ se modifican a *NIVEL PROYECTO* para personalizar componentes o diseño general


> *** src/components/data/*.mjs
- aquí se pueden crear funciones para generar diccionarios de clases de tailwind por ejemplo
- toman datos de config/comps para decidir cómo generar las clases explícitas automaticamente
- útil para clases de colores y tamaños explícitos que puedan ser fácilmente configurados
- la razón por la que se procesan con indexer es para que tailwind detecte los nombres de clases
- también puede tener otro tipo de usos para generar datos default personalizados para componentes
- NO se modifican a *NIVEL PROYECTO*, sino a *NIVEL STARTER*



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