import cluster from 'cluster';

import {log} from '../utils/logger';

const numWorkers = process.env.WORKER_NUM || require('os').cpus().length;

var workers = [];
cluster.setupMaster({ exec: __dirname + '/boot.js' });
if (cluster.isMaster) {
    log.info(`Master ${process.pid} is running`);
    for (let i = 0; i < numWorkers; i++) {
        ! function spawn(i) {
            workers[i] = cluster.fork(); // Fork workers.
            workers[i].on('exit', function() {
                log.error(`Worker ${workers[i].process.pid} died`);
                spawn(i); // Restart worker on exit
            });
        }(i);
    }
}
