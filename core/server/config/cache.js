/**
 * Config cache
 */
export default {
	localhost: {
		enabled: process.env.CACHE || true,
		lifetime: 3600
	},
	development: {
		enabled: process.env.CACHE || true,
		lifetime: 3600
	},
	production: {
		enabled: process.env.CACHE || true,
		lifetime: 3600
	}
};