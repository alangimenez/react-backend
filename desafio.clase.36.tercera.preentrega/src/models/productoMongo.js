const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const coleccion = 'productos';

const productoSchema = new Schema ({
    id: {type: Number},
    timestamp: {type: String},
    nombre: {type: String},
    descripcion: {type: String},
    codigo: {type: Number},
    foto: {type: String},
    precio: {type: Number},
    stock: {type: Number},
})

const Producto = mongoose.model(coleccion, productoSchema);

module.exports = Producto;