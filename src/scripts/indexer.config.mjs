export default {
	
    'astro': {
        type: 'comp',
        src: 'src/components/astro/**/*.astro',
        out: 'src/components/astro.mjs'
    },
    'data': {
        type: 'obj',
        src: 'src/components/data/**/*.mjs',
        out: 'src/components/data.mjs'
    }
	
};
