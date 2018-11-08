// log levels: { TRACE: 0|trace, DEBUG: 1|debug, INFO: 2|info, WARN: 3|warn, ERROR: 4|error, SILENT: 5|silent }
import getLogger from 'loglevel-colored-level-prefix';
import path from 'path';

const log = getLogger();
log.setDefaultLevel(process.env.LOG_LEVEL || log.levels.DEBUG);
export { log };

// Winston log to file
import winston from 'winston';
const winstonLogger = (filename) => {
    return new (winston.Logger)({
        transports: [
            // new (winston.transports.Console)(), // Enable console log
            new (winston.transports.File)({ filename: path.join(__dirname, '../../../logs/', (filename || 'all') + '.log'), maxsize: 1000000 })
        ]
    });
};
export { winstonLogger as logToFile };

export const winstonLog = new (winston.Logger)({
    transports: [
        // new (winston.transports.Console)(), // Enable console log
        new (winston.transports.File)({ filename: path.join(__dirname, '../../../logs/', 'app.log'), maxsize: 1000000 })
    ]
});