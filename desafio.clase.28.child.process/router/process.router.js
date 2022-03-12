const express = require('express');
const router = express.Router();
const { datosProcess, random } = require('../controller/controller.process');

router.get('/info', (req, res) => {
    const informacion = datosProcess(req, res);
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

router.get('/api/randoms', (req, res) => random (req, res))

module.exports = router;