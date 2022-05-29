const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const coleccion = 'usuarios';

const usuarioSchema = new Schema ({
    id: {type: String},
    password: {type: String},
    nombre: {type: String},
    direccion: {type: String},
    edad: {type: Number},
    telefono: {type: String},
    foto: {type: String},
    // rol: {type: String} // admin/user
})

const Usuario = mongoose.model(coleccion, usuarioSchema);

module.exports = Usuario;