const minimist = require('minimist');
const { logger } = require('../config/log4js');

const argumentos = minimist(process.argv.slice(2));

const infoSistema = (req, res) => {
    logger.info(`Peticion a ${req.url}, metodo ${req.method}`)
    const informacion = datosProcess();
    /* console.log({
        titulo: `Informacion de sistema`,
        argumentos: informacion.argumentos,
        plataforma: informacion.plataforma,
        version: informacion.version,
        memoria: informacion.memoria,
        pathEjecucion: informacion.pathEjecucion,
        id: informacion.id,
        carpeta: informacion.carpeta,
    }); */
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

const datosProcess = () => {
    let informacion = {
        argumentos: argumentos._.join(" "),
        plataforma: process.platform,
        version: process.version,
        memoria: process.memoryUsage().rss,
        pathEjecucion: process.execPath,
        id: process.pid,
        carpeta: process.mainModule.path,
    }
    return informacion;
}



module.exports = {
    datosProcess, 
    infoSistema
};