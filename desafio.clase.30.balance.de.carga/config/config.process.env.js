require('dotenv').config()
const minimist = require('minimist');

const argumentos = minimist(process.argv.slice(2), {
    default: {
        PORT: 8080,
        MODE: 'FORK'
    },
    alias: {
        p: 'PORT',
        m: 'MODE',
    }
});

module.exports = {
    PORT: argumentos.PORT,
    MODE: argumentos.MODE,
    PERSISTENCIA: process.env.PERSISTENCIA,
    MONGODB_URI: process.env.MONGODB_URI,
    FIREBASE_ROUTE: process.env.FIREBASE_ROUTE
}