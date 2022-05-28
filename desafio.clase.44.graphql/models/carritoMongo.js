const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const coleccion = 'carritos';

const carritosSchema = new Schema ({
    id: {type: Number},
    timestamp: {type: String},
    user: {type: String},
    productos: {type: Array}
})

const Carrito = mongoose.model(coleccion, carritosSchema);

module.exports = Carrito;