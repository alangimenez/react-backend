const { normalize, schema } = require('normalizr')

const normalizarMensaje = (historial) => {
    chatNormalizar = {
        id: 'mensajes',
        chat: historial
    }
    const autorSchema = new schema.Entity('autor');
    const mensajeSchema = new schema.Entity('mensaje', {
        author: autorSchema
    })
    const chatSchema = new schema.Entity('chat', {
        chat: [mensajeSchema]
    })
    const historialNormalizado = normalize(chatNormalizar, chatSchema);
    return historialNormalizado;
}

module.exports = {
    normalizarMensaje
}