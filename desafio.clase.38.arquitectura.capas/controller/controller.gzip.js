const { fork } = require('child_process');
const { logger } = require('../config/log4js');
const { datosProcess } = require('./controller.process')

const random = (req, res) => {
    let numero = 10000000;
    let arrayNumeros = [];
    if (req.query.cant) {
        numero = req.query.cant
    }
    const informacion = fork('./utils/api.random.js');
    informacion.send(numero);
    informacion.on('message', (dato) => {
        arrayNumeros = dato;
        res.render('table', {
            titulo: `Generacion números random`,
            listaDeNumeros: dato,
        })
    })
}

const infoComprimida = (req, res) => {
    logger.info(`Peticion a ${req.url}, metodo ${req.method}`)
    const informacion = datosProcess();
    res.render('info', {
        titulo: `Informacion de sistema`,
        argumentos: informacion.argumentos,
        plataforma: informacion.plataforma,
        version: informacion.version,
        memoria: informacion.memoria,
        pathEjecucion: informacion.pathEjecucion,
        id: informacion.id,
        carpeta: informacion.carpeta,
    })
}

module.exports = {
    random,
    infoComprimida

}