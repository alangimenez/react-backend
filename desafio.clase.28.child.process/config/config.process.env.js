require('dotenv').config()
const minimist = require('minimist');

const argumentos = minimist(process.argv.splice(2), {
    default: {
        PORT: 8080
    }
});

module.exports = {
    PORT: argumentos.PORT,
    PERSISTENCIA: process.env.PERSISTENCIA,
    MONGODB_URI: process.env.MONGODB_URI,
    FIREBASE_ROUTE: process.env.FIREBASE_ROUTE
}