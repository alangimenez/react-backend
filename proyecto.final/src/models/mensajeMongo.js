const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const coleccion = 'mensajes';

const mensajeSchema = new Schema ({
    id: {type: Number},
    user: {type: String},
    timestamp: {type: String},
    mensaje: {type: String}
})

const Mensaje = mongoose.model(coleccion, mensajeSchema);

module.exports = Mensaje;