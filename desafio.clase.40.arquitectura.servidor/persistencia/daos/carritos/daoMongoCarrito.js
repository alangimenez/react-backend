const {CrudMongo} = require('../../contenedores/crudMongo');
const carritoModel = require('../../../models/carritoMongo');
const { errorLogger } = require('../../../config/log4js');

class DaoMongoCarrito extends CrudMongo {
    constructor () {
        super(carritoModel)
    }
    async actualizarProdEnCarrito(idCarrito, producto) {
        try {
            await this.model.updateOne({id: idCarrito}, {$push: {productos: producto}});
            const listadoActualizado = await this.model.find({id: idCarrito}, { __v: 0 });
            return listadoActualizado[0];
        } catch (e) {
            errorLogger.error(`Ocurrio un error en actualizarProdEnCarrito CRUD -> ` + e.message);
            throw new Error(`Ocurrio un error en actualizarProdEnCarrito CRUD -> ` + e.message)
        }
    }

    async eliminarProdEnCarrito(idCarrito, producto) {
        try {
            await this.model.updateOne({id: idCarrito}, {$set: {productos: producto}});
            const listadoActualizado = await this.model.find({id: idCarrito}, { __v: 0 });
            return listadoActualizado[0];
        } catch (e) {
            errorLogger.error(`Ocurrio un error en eliminarProdEnCarrito CRUD -> ` + e.message);
            throw new Error(`Ocurrio un error en eliminarProdEnCarrito CRUD -> ` + e.message)
        }
        
    }
}

module.exports = {
    DaoMongoCarrito
}