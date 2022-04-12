const express = require('express');
const router = express.Router();
const { datosProcess, random } = require('../controller/controller.process');

// logger
const { logger, infoLogger, warningLogger, errorLogger } = require('../config/log4js');

router.get('/info', (req, res) => {
    logger.info(`Peticion a ${req.url}, metodo ${req.method}`)
    const informacion = datosProcess(req, res);
    console.log({
        titulo: `Informacion de sistema`,
        argumentos: informacion.argumentos,
        plataforma: informacion.plataforma,
        version: informacion.version,
        memoria: informacion.memoria,
        pathEjecucion: informacion.pathEjecucion,
        id: informacion.id,
        carpeta: informacion.carpeta,
    });
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
});

// router.get('/api/randoms', (req, res) => random (req, res))

module.exports = router;