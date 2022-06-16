const client = require('../config/config.twilio');
const { logger, errorLogger } = require('../config/config.log4js');

/* async function whatsapp (destino, nombre, email) {
    try {
        const message = await client.messages.create({
            from: 'whatsapp:+14155238886', // quitar el whatsapp: para mensajes de texto
            to: `whatsapp:${destino}`, // quitar el whatsapp: para mensajes de texto
            body: `Ha recibido un nuevo pedido de ${nombre} - ${email}`
        });
        logger.info(message);
    } catch (error) {
        errorLogger.error(error)
    }
} */

async function whatsapp (destino, cuerpo) {
    try {
        const message = await client.messages.create({
            from: 'whatsapp:+14155238886', // quitar el whatsapp: para mensajes de texto
            to: `whatsapp:${destino}`, // quitar el whatsapp: para mensajes de texto
            body: cuerpo
        });
        logger.info(message);
    } catch (error) {
        errorLogger.error(error)
    }
}

/* async function mensajeTexto (destino, nombre) {
    try {
        const message = await client.messages.create({
            from: process.env.NUMBER_SMS_TWILIO,
            to: `${destino}`,
            body: `Su pedido ha sido recibido, y se encuentra en proceso. Muchas gracias ${nombre}`
        });
        logger.info(message);
    } catch (error) {
        errorLogger.error(error)
    }
} */

async function mensajeTexto (destino, cuerpo) {
    try {
        const message = await client.messages.create({
            from: process.env.NUMBER_SMS_TWILIO,
            to: `${destino}`,
            body: cuerpo
        });
        logger.info(message);
    } catch (error) {
        errorLogger.error(error)
    }
}

module.exports = {
    whatsapp,
    mensajeTexto
}