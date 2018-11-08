/**
 * Config sql database
 */
export default {
	localhost: {
		default: {
			host: process.env.MYSQL_HOST || '127.0.0.1',
			port: process.env.MYSQL_PORT || '3306',
			username: process.env.MYSQL_USERNAME || 'root',
			password: process.env.MYSQL_PASSWORD || '',
			database: process.env.MYSQL_DB || 'dev_cuuvan',
			dialect: 'mysql',
			logging: true,
			pool: { max: 10, min: 0, idle: 1000}
		}
	},
	development: {
		default: {
			host: process.env.MYSQL_HOST || '127.0.0.1',
			port: process.env.MYSQL_PORT || '3306',
			username: process.env.MYSQL_USERNAME || 'root',
			password: process.env.MYSQL_PASSWORD || '',
			database: process.env.MYSQL_DB || 'dev_cuuvan',
			dialect: 'mysql',
			logging: true,
			pool: { max: 10, min: 0, idle: 1000}
		}
	},
	production: {
		default: {
			host: process.env.MYSQL_HOST || '127.0.0.1',
			port: process.env.MYSQL_PORT || '3306',
			username: process.env.MYSQL_USERNAME || 'root',
			password: process.env.MYSQL_PASSWORD || '',
			database: process.env.MYSQL_DB || 'dev_cuuvan',
			dialect: 'mysql',
			logging: true,
			pool: { max: 10, min: 0, idle: 1000}
		}
	}
};