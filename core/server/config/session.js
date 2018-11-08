export default {
    localhost: {
        name: 'ssid',
        secret: 'ICO-SYSTEM',
        cookie: {
            domain: '',
            path: '/',
            maxAge : 7*24*3600*1000,
            // secure: true,  // Hide cookie client side
        },
        resave: true,
        saveUninitialized: true
    },
    development: {
        name: 'ssid',
        secret: 'ICO-SYSTEM',
        cookie: {
            domain: '',
            path: '/',
            maxAge : 7*24*3600*1000,
            // secure: true,  // Hide cookie client side
        },
        resave: true,
        saveUninitialized: true
    },
    production: {
        name: 'ssid',
        secret: 'ICO-SYSTEM',
        cookie: {
            domain: '',
            path: '/',
            maxAge : 7*24*3600*1000,
            // secure: true,  // Hide cookie client side
        },
        resave: true,
        saveUninitialized: true
    }
}