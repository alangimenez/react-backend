const {CrudMongo} = require('../../contenedores/crudMongo');
const productoModel = require('../../../models/productoMongo');

class DaoMongoProducto extends CrudMongo {
    constructor () {
        super(productoModel)
    }
}

module.exports = {
    DaoMongoProducto
}