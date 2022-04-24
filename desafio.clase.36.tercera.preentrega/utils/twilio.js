const client = require('../config/config.twilio');

async function whatsapp (destino, nombre, email) {
    try {
        const message = await client.messages.create({
            from: 'whatsapp:+14155238886', // quitar el whatsapp: para mensajes de texto
            to: `whatsapp:${destino}`, // quitar el whatsapp: para mensajes de texto
            body: `Ha recibido un nuevo pedido de ${nombre} - ${email}`
        });
        console.log(message);
    } catch (error) {
        console.log(error)
    }
}

module.exports = whatsapp;