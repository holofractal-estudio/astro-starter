# Estilos


## Tailwind

### Recursos

Bloques UI
https://preline.co/docs	***

https://flowbite.com/
https://tailblocks.cc/
https://headlessui.com/

Sandbox
https://play.tailwindcss.com/ *

Ejemplo de código de componente Astro con asignación dinámica de clases
https://www.reddit.com/r/flowbite/comments/1dj4if3/question_are_there_any_prebuild_components_for/


Libreria de componentes de la comunidad hechos con Tailwind
https://www.creative-tim.com/

Paletas de colores mas detalladas basadas en las originales
https://fullwindcss.com/



#### Preline UI

Integración Astro
https://preline.co/docs/frameworks-astro.html




#### Flowbite

Astro integration 
https://flowbite.com/docs/getting-started/astro/

Example project
https://github.com/leabs/astro-tailwind-flowbite-template
https://www.youtube.com/watch?v=FBFbW2TNRL8&ab_channel=Leabs

Official Flowbite Starter
https://github.com/themesberg/tailwind-astro-starter



### tailwind-merge

Utilidad para concatenar strings de clases resolviendo conflictos, para componentes donde las clases se asignan dinamicamente con props

https://github.com/dcastil/tailwind-merge



## Estrategias para estilizar componentes dinámicamente


### Definir colores simbólicos

Variables definidas en @theme

Descripción simbolica del color, ejemplo:
prim-n (primario)
secn-n (secundario)
terc-n (terciario?)
base-n (fondo/texto)

Los numeros pueden ser como los de tailwind, o puedo definir escalas mas cerradas 1-5

Asignar las paletas de colores manualmente y aplicarlas a todos los componentes

Puedo usar paleta de variables de Tailwind 

Definir variables version dark o usar shades (-n)


### Donde definir diccionarios de clases

En componente sería mas modular, teniendo todas las posibles opciones de diseño en un mismo archivo. La otra es recolectar todo en un js pero sería muy largo y separado de su contexto.

Tomar en cuenta no concatenar nombres de clases por fragmentos. Ver hasta donde se pueden concatenar cadenas de clases con nombres completos. Para manejar opciones de colores por separado de layout, por ejemplo.

Definir variables en @theme para componentes especificos (project default). Poder sobreescribir con props en cada caso.


### Personalización con props

Tener diccionario en componente, y en props tener la opción de pasar o clave de objeto predeterminado, u objeto con propiedades personalizadas (key / val). 

Si pasa ambos, toma objeto referido como base, y lo combina con valores enviados. Permite tener objeto de diseño default y definir solo lo que cambia en props.

El diccionario define objetos que agrupan strings de clases para elementos especificos, u otros objetos anidados con strings de clases. Según la estructura del componente.

Pueden ser distintos objetos como props si el componente es complejo. En componente definir objetos a usar en template según info de props.

Todos los strings pasados como props aunque esten en objetos estructurados, reprensentan claves del diccionario, tratar de que nunca sean strings de clases en mdx.

Podria haber excepciones donde el string enviado no sea una clave del diccionario. En ese caso se interpreta como string de clases.

Será necesario crear una función constructora del objeto data del componente. Para tener flexibilidad de uso e intepretar con logica en la función.

Los objetos no solo envían diseño sino también texto (contenido), o flags. Agrupar objetos por elementos del componente.

Cuando son arrays de elementos, enviar como array de objetos que definen cada elemento. Podría ser que cada uno tenga su objeto para definir apariencia, o que todos tengan la misma apariencia. Manejar cada caso de modo que no haya que enviar el mismo objeto repetido para cada elemento en caso de ser el mismo diseño.
