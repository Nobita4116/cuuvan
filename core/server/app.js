import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import session from 'express-session';
import favicon from 'serve-favicon';
import cors from 'cors'
import {getConstantApp} from './libs/common';

var keys = require( "keygrip" )(['ico-salt1', 'ico-salt2']),
    cookies = require( "cookies" );

import routes from './routes';

const app = express();

let pathView = path.join(getConstantApp('core').serverPath, getConstantApp('core').views);
app.set('views', pathView);
app.set('view engine', 'ejs');

app.use(cookies.express(keys));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());
app.use(favicon(path.join(__dirname, '../../public/dist/css/favicon/favicon-96x96.png')));

app.use(cors({origin: '*'}));

app.use(session({
    secret: 'NuFxehMXuA',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));

// Setup middlewares
import {isIP} from 'net';
app.use((req, res, next) => {
    if (isIP(req.hostname) == 0) {
        req.baseUri = req.protocol + '://' + req.hostname + '/';
    } else {
        if (!req.secure) {
            let port = app.get('port');
            req.baseUri = req.protocol + '://' + req.hostname + (port == 80? '' : (':' + port)) + '/';
        } else {
            let port = app.get('https_port');
            req.baseUri = req.protocol + '://' + req.hostname + (port == 443? '' : (':' + port)) + '/';
        }
    }
    next();
});

// Setup other routes
app.use(routes);

// Catch 404 and forward to error handler
// app.use((req, res, next) => {
//     let err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

// Error handler
// app.use((err, req, res, next) => {
//     // Render the error page
//     if (err.status == 404) return res.redirect('/');
//     res.status(err.status || 500).end(err.message);
// });

export default app;