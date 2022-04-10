const express = require('express');
const router = express.Router();
const { datosProcess, random } = require('../controller/controller.process');
const os = require('os');

router.get('/info', (req, res) => {
    const informacion = datosProcess(req, res);
    res.render('info', {
        process: process.pid,
        titulo: `Informacion de sistema`,
        argumentos: informacion.argumentos,
        plataforma: informacion.plataforma,
        version: informacion.version,
        memoria: informacion.memoria,
        pathEjecucion: informacion.pathEjecucion,
        id: informacion.id,
        carpeta: informacion.carpeta,
        procesadores: os.cpus().length,
    })
});

router.get('/api/randoms', (req, res) => random (req, res))

module.exports = router;