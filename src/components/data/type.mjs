import config from "../../config/components/typography.mjs";

function generate () {
	return `typewww ${config.data1} ${config.data2} ${config.data3}`
}


export default {
	class: {
		level: generate()
	}
}