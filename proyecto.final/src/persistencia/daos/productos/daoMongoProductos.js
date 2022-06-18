const {CrudMongo} = require('../../contenedores/crudMongo');
const productoModel = require('../../../models/productoMongo');

class DaoMongoProducto extends CrudMongo {
    constructor () {
        super(productoModel)
    }

    async traerProductosPorCategoria (categoria) {
        return await this.model.find({ categoria: categoria }, { __v: 0 });
    }
}

module.exports = {
    DaoMongoProducto
}