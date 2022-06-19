const {CrudMongo} = require('../../contenedores/crudMongo');
const productoModel = require('../../../models/productoMongo');

class DaoMongoProducto extends CrudMongo {
    constructor () {
        super(productoModel)
    }

    async traerProductosPorCategoria (categoria) {
        return await this.model.find({ categoria: categoria }, { __v: 0 });
    }

    async actualizarStockProducto (idProd, stock) {
        try {
            await this.model.updateOne({id: idProd}, {$set: {stock: stock}});
            return await this.leerInfoPorId(idProd);
        } catch (e) {
            return error.errorProcess("CRUD Error", `El Crud ha tenido un error -> ` + e.message);
        }
    }
}

module.exports = {
    DaoMongoProducto
}