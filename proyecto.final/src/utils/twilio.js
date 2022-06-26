if (process.env.TWILIO_TURN_OFF === "on") {
    const client = require('../config/config.twilio');
    const { logger, errorLogger } = require('../config/config.log4js');

    async function whatsapp(destino, cuerpo) {
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

    async function mensajeTexto(destino, cuerpo) {
        try {
            const message = await client.messages.create({
                messagingServiceSid: 'MGecb6c20d9e4ccec7da8d741a6c37b2b9',
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
}