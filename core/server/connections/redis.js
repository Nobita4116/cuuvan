import redis from 'redis';
import {log} from '../utils/logger';
import {redis as redisConfig} from '../config';

import Promise from 'bluebird';
Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);
const redisCache = redis.createClient(redisConfig.cache);
redisCache.on('connect', () => {
    log.info('[redisCacheConnected]');
});
redisCache.on('reconnecting', () => {
    log.info('[redisCacheReconnecting]');
});
redisCache.on('error', (err) => {
    log.info('[redisCacheError]', err);
});

export {redisCache};