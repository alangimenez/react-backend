const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const coleccion = 'carritos';

const carritosSchema = new Schema ({
    id: {type: Number},
    user: {type: String},
    timestamp: {type: String},
    productos: {type: Array}
})

const Carrito = mongoose.model(coleccion, carritosSchema);

module.exports = Carrito;