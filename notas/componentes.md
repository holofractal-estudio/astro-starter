
# Cómo usar componentes Astro prediseñados, personalizables y flexibles

## Ideas

- diseñar paginas en astro usando componentes con props
- desahogar html creando objetos donde se definan los props de los componentes

dentro de componentes:
- usar props como parámetros para personalizar componentes
- dentro de la lógica del componente (la parte js) construir objeto que asigne las clases adecuadas de acuerdo a los parámetros enviados 
	- el objeto a construir puede contener strings de clases para elementos específicos
	- tambien puede contener banderas o claves para condicionar el renderizado de elementos
	- se puede usar una función definida ahí mismo para construir el objeto con la lógica de los props
	- crear diccionarios dentro del mismo componente para ayudar a la construccion del objeto
	- al final se tiene un objeto con todos los datos necesarios para renderizar el componente
	- se usa una propiedad específica del objeto en html, toda la lógica se procesa en función
	- se puede iniciar con un objeto output con valores default que se sobreescriben en la función segun los parametros recibidos
	- también se puede usar un objeto input (props) default (que podría definirse fuera del componente para personalizar por proyecto)
- enviar strings de clases como props para elementos específicos (para extender personalización)
- enviar objetos completos (o parciales) predefinidos en lugar de props individuales (flexible y opcional)
	- dentro de la instancia del componente se construye el objeto de props


## Estrategia de diseño de componentes

- crear componente de prueba para esquematizar

- primero diseñar el componente sin variantes o personalización
- usar ejemplos de preline y demás
- estandarizar diseño si vienen de diferentes fuentes

- identificar posibles variantes y abstracción de contenido
- diseñar objeto de configuración (output) con datos fijos (default) dentro del componente para asignar con {} en html
- teniendo objeto config, ver qué propiedades pueden tener variantes para elegir con props 
- diseñar objeto input que sería el que leería la funcion para crear el output
- ver que propiedades usar en el input para configurar el output
- en la instancia probar usando objetos default
- probar diferentes configuraciones de props
- tener archivo con objeto de configuracion global (flexible y personalizable) que contenga objetos input (completos o parciales) para pasar por default a todas las páginas o a ciertas páginas para tener variantes listas para usar


## Resumen grafico

> en page.astro
---
import { default_comp_data } from "@config/data.mjs"
const comp_data = {
	prop1: "custom", |
	prop2: "custom", 
	...default_comp_data
	}
---
<Comp { ...comp_data } prop3="custom" prop3="custom" divclass="class-names"/>


> en Comp.astro
---
const props = set_props({ // objeto input base (default + props)
	prop1: "default", 
	prop2: "default", 
	...Astro.props 
})
function set_props (input) { 
	/* construcción de objeto props */
	}
---
<div {...props}>{ props.content }</div>