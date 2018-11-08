import database from './database';
import redis from './redis';
import session from './session';
import cache from './cache';

/**
 * Node env
 */
const NODE_ENV = process.env.NODE_ENV || 'localhost';

/**
 * Global config
 */
const _database = database[NODE_ENV];
const _redis = redis[NODE_ENV];
const _cache = cache[NODE_ENV];
const _session = session[NODE_ENV];

export {_database as database, _redis as redis, _cache as cache, _session as session};
export default {
    database: _database,
    redis: _redis,
    cache: _cache,
    session: _session
};
