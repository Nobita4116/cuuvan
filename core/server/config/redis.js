function retry_strategy(options) {
	console.log('---------retry_strategy-----------', options);
	return 5000;
}

/**
 * Config redis database
 */
export default {
	localhost: {
		cache: {
			host: 'localhost',
			port: '6379',
			// password: 'zB5CwrwwF2Li7DW48Wvc',
			db: 0,
			prefix: 'ico:cache:',
			persistent: true,
			connect_timeout: 10000,
			retry_strategy
		}
	},
	development: {
		cache: {
			host: '10.5.44.125',
			port: '6379',
			password: 'PP#WWB4mcoAE4!gV',
			db: 0,
			prefix: 'ico:cache:',
			persistent: true,
			connect_timeout: 9000,
			retry_strategy
		}
	},
	production: {
		cache: {
			host: 'localhost',
			port: '6379',
			password: 'zB5CwrwwF2Li7DW48Wvc',
			db: 0,
			prefix: 'ico:cache:',
			persistent: true,
			connect_timeout: 9000,
			retry_strategy
		}
	}
};