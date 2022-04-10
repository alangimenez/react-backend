const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const coleccion = 'usuarios';

const usuarioSchema = new Schema ({
    id: {type: String},
    password: {type: String},
    nombre: {type: String},
    apellido: {type: String}
})

const Usuario = mongoose.model(coleccion, usuarioSchema);

module.exports = Usuario;