const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const coleccion = 'ordenes';

const ordenSchema = new Schema ({
    id: {type: Number},
    user: {type: String},
    fechaDePedido: {type: String},
    productos: {type: Array},
    total: {type: Number},
    status: {type: String},
    fechaDeEntregado: {type: String},
    direccion: {type: String}
})

const Ordenes = mongoose.model(coleccion, ordenSchema);

module.exports = Ordenes;