const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const coleccion = 'carritos';

const carritosSchema = new Schema ({
    id: {type: Number},
    user: {type: String},
    fechaDeCreacion: {type: String},
    productos: {type: Array},
    total: {type: Number}
})

const Carrito = mongoose.model(coleccion, carritosSchema);

module.exports = Carrito;