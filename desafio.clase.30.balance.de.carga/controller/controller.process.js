const minimist = require('minimist');
const { fork } = require('child_process');

const argumentos = minimist(process.argv.slice(2));

const datosProcess = (req, res) => {
    let informacion = {
        argumentos: argumentos._.join(" "),
        plataforma: process.platform,
        version: process.version,
        memoria: process.memoryUsage().rss,
        pathEjecucion: process.execPath,
        id: process.pid,
        carpeta: process.mainModule.path,
    }
    return (informacion);
}

const random = (req, res) => {
    let numero = 25000000;
    let arrayNumeros = [];
    if (req.query.cant) {
        numero = req.query.cant
    }
    const informacion = fork('./utils/api.random.js');
    informacion.send(numero);
    informacion.on('message', (dato) => {
        arrayNumeros = dato;
        res.render('table', {
            process: process.pid,
            titulo: `Generacion números random`,
            listaDeNumeros: dato,
        })
    })
}

module.exports = {
    datosProcess,
    random
};