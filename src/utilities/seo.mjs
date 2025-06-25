import { SITE } from '@config/global/site.mjs'
import { SEO_DEFAULTS } from '@config/global/seo.mjs'

export function getSeoData (seoData) {
	
	// empezar con los defaults
	var seo = {...SEO_DEFAULTS}

	// si la página no especifica title para opengraph, usar title del sitio
	if ( !!(seoData.title) && !(seoData.openGraph?.basic?.title) )  {
		seo.openGraph.basic.title = seoData.title
	}
	// si la página no especifica description para opengraph, usar description del sitio
	if ( !!(seoData.description) && !(seoData.openGraph?.optional?.description) )  {
		seo.openGraph.optional.description = seoData.description
	}

	// agregar datos de opengraph definidos en la página con aliases para simplificar
	if ("ogTitle" in seoData) {
		seo.openGraph.basic.title = seoData.ogTitle
	}
	if ("ogImage" in seoData) {
		seo.openGraph.basic.image = SITE.url + seoData.ogImage
	}
	if ("ogType" in seoData) {
		seo.openGraph.basic.type = seoData.ogType
	}
	if ("ogDescription" in seoData) {
		seo.openGraph.optional.description = seoData.ogDescription
	}

	// agregar datos especificos de article
	if ("publishedTime" in seoData) {
		if ( !("article" in seo.openGraph) ) { seo.openGraph.article = {} }
		seo.openGraph.basic.type = "article"
		seo.openGraph.article.publishedTime = seoData.publishedTime
	}
	if ("modifiedTime" in seoData) {
		if ( !("article" in seo.openGraph) ) { seo.openGraph.article = {} }
		seo.openGraph.basic.type = "article"
		seo.openGraph.article.modifiedTime = seoData.modifiedTime
	}
	if ("expirationTime" in seoData) {
		if ( !("article" in seo.openGraph) ) { seo.openGraph.article = {} }
		seo.openGraph.basic.type = "article"
		seo.openGraph.article.expirationTime = seoData.expirationTime
	}
	if ("authors" in seoData) {
		if ( !("article" in seo.openGraph) ) { seo.openGraph.article = {} }
		seo.openGraph.basic.type = "article"
		seo.openGraph.article.authors = seoData.authors
	}
	if ("section" in seoData) {
		if ( !("article" in seo.openGraph) ) { seo.openGraph.article = {} }
		seo.openGraph.basic.type = "article"
		seo.openGraph.article.section = seoData.section
	}
	if ("tags" in seoData) {
		if ( !("article" in seo.openGraph) ) { seo.openGraph.article = {} }
		seo.openGraph.basic.type = "article"
		seo.openGraph.article.tags = seoData.tags
	}

	// agregar datos de la pagina a defaults
	seo = {...seo, ...seoData}
	return seo
}

/*
openGraph: {
	basic: {
	  title: SITE.name,
	  image: SITE.url + '/og/index.png',
	  url: SITE.url,
	  type: 'website',
	},
	optional: {
	  siteName: SITE.name,
	  locale: "es_MX",
	  description: SITE.description, 
	}
  }
  */