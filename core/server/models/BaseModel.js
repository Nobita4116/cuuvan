import { Model } from 'sequelize';

// import {redisCache} from '../connections';
// import {cache as cacheConfig} from '../config';

/**
 * Wrapper class Model of sequelize
 * 
 * @export
 * @class BaseModel
 * @extends {Model}
 */
export default class BaseModel extends Model {

    /**
     * Creates an instance of BaseModel.
     * @param {any} args 
     * @memberof BaseModel
     */
	constructor(...args) {
		super(...args);
	}

    /**
     * Init model
     * 
     * @static
     * @param {Object} attributes 
     * @param {Object} options 
     * @returns 
     * @memberof BaseModel
     */
	static init(attributes, options) {
		return super.init(attributes, {
			...options
		});
	}

	/**
	 * Overide findOne method
	 * 
	 * @static
	 * @param {any} options 
	 * @param {any} cacheKey 
	 * @returns 
	 * @memberof BaseModel
	 */
	static findOne(options, cacheKey) {
		return super.findOne(options);
		// if (!cacheKey) return super.findOne(options);
		// return new Promise(resolve => {
		// 	this.getFromCache(cacheKey).then(data => {
		// 		if (data) return resolve(this.build(JSON.parse(data), {isNewRecord: false}));
		// 		return super.findOne(options)
		// 	}).then(data => {
		// 		if (data) this.saveToCache(cacheKey, JSON.stringify(data));
		// 		return resolve(data);
		// 	})
		// 	.catch(err => reject(err))
		// });
	}

	/**
	 * Overide findAll method
	 * 
	 * @static
	 * @param {any} options 
	 * @param {any} cacheKey 
	 * @returns 
	 * @memberof BaseModel
	 */
	static findAll(options, cacheKey) {
		return super.findAll(options);
		// if (!cacheKey) return super.findAll(options);
		// return new Promise(resolve => {
		// 	this.getFromCache(cacheKey).then(data => {
		// 		if (data) return resolve(this.build(JSON.parse(data), {isNewRecord: false}));
		// 		return super.findAll(options);
		// 	}).then(data => {
		// 		if (data) this.saveToCache(cacheKey, JSON.stringify(data));
		// 		return resolve(data);
		// 	}).catch(err => reject(err))
		// });
	}

	/**
	 * Get data from cache
	 * 
	 * @static
	 * @param {String} key 
	 * @returns 
	 * @memberof BaseModel
	 */
	// static getFromCache(key) {
	// 	if (!cacheConfig.enabled) return Promise.resolve(null);
	// 	return redisCache.getAsync(key);
	// }

	// static saveToCache(key, data, ttl = cacheConfig.lifetime) {
	// 	if (!cacheConfig.enabled) return;
	// 	redisCache.setexAsync(key, ttl, data);
	// }

	/**
	 * Overide update method
	 * 
	 * @static
	 * @param {any} values 
	 * @param {any} options 
	 * @returns 
	 * @memberof BaseModel
	 */
	static update(values, options) {
		return super.update(values, {individualHooks: true, ...options});
	}

	/**
	 * Overide destroy method
	 * 
	 * @static
	 * @param {any} options 
	 * @returns 
	 * @memberof BaseModel
	 */
	static destroy(options) {
		return super.destroy({individualHooks: true, ...options})
	}

	/**
	 * Init associations
	 * 
	 * @static
	 * @memberof BaseModel
	 */
	static association() {
        
	}

	static findAllFromCache(options, cacheKey) {
		if (!cacheKey) return super.findAll(options);
		return new Promise((resolve, reject) => {
			this.getHashFromCache(cacheKey).then(data => {
				if (data && data.length) {
					let allInst = data.map(ins => {
						return this.build(JSON.parse(ins), {isNewRecord: false})
					})

					return resolve(allInst)
				}
				return super.findAll(options)
			}).then(data => {
				if (data && data.length) {
					data.forEach(inst => {
						this.saveHashToCache(cacheKey, inst.id, JSON.stringify(inst))
					})
				}
				return resolve(data);
			})
			.catch(err => {
				console.log(err)
				reject(err)
			})
		});
	}

	static countAllFromCache(options, cacheKey) {
		if (!cacheKey) return super.count(options);
		return new Promise((resolve, reject) => {
			this.countHashFromKey(cacheKey).then(data => {
				if (data) {
					return resolve(data)
				}
				return super.findAll(options)
			}).then(data => {
				if (data && data.length) {
					data.forEach(inst => {
						this.saveHashToCache(cacheKey, inst.id, JSON.stringify(inst))
					})
				}
				return resolve(data.length);
			})
			.catch(err => reject(err))
		});
	}

	storeToCache(key, data, ttl = 3600) {
		// if (!cacheConfig.enabled) return;
		// redisCache.setexAsync(key, ttl, data);
	}

	removeToCache(key) {
		// if (!cacheConfig.enabled) return;
		// redisCache.delAsync(key);
	}

	setTimeCreate() {
		this.createdAt = new Date();
		this.updatedAt = new Date();
	}

	setTimeUpdate() {
		this.updatedAat = new Date();
	}

	/**
	 * Function clear cache
	 * 
	 * @memberof BaseModel
	 */
	clearCache() {}
}