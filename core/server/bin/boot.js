import http from 'http';
import https from 'https';
import fs from 'fs';
import path from 'path';

import app from '../app';
import { log, winstonLog } from '../utils/logger';

// Start http server
const HTTP_PORT = normalizePort(process.env.PORT || 6868);
app.set('port', HTTP_PORT);
 http.createServer(app).listen(HTTP_PORT, onListening);

function onListening() {
    let addr = this.address();
    let bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    log.info('Web server listening on ' + bind);
}

function normalizePort(val) {
    let port = parseInt(val, 10);
    if (isNaN(port)) return val;            
    if (port >= 0) return port;             
    return false;
}

const shutdown = () => {
    log.info('----------[shutdown]------------', new Date());
    process.exit(0);
};
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

process.on('uncaughtException', (err) => {
    winstonLog.error('Logging caught exception');
    winstonLog.error('[Caught exception]: %j', err, err.stack);
    
    process.exit(1);
});
 
process.on('unhandledRejection', (reason, p) => {
    winstonLog.error('Logging unhandled rejection');
    winstonLog.error('[Unhandled rejection] for %j with reason %j stack ', p, reason, reason ? reason.stack : undefined);
});
