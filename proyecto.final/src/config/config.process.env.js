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
}