export default {
	
	generateOriginalCss: false,

	outputPaths: {
		css: 'src/styles/google-icons.css',
		cssOriginal: 'src/styles/google-icons-original.css',
		font: 'public/fonts/google-icons.woff2',
		cssFontUrl: '/fonts/google-icons.woff2'
	},

	className: 'google-icons', // class name for the icon font

	style: 'outlined', // outlined, rounded, sharp

	variation: {
		opsz: '24', //'20..48',
		wght: '100..700', //'100..700',
		FILL: '0', //'0..1',
		GRAD: '-50' //'-50..200',
	},

	icons: [
		'home', 
		'menu', 
		'search', 
		'settings'
	]

};
