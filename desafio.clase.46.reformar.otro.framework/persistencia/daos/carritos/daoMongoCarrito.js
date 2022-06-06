const {CrudMongo} = require('../../contenedores/crudMongo');
const carritoModel = require('../../../models/carritoMongo');
const { errorLogger } = require('../../../config/log4js');

class DaoMongoCarrito extends CrudMongo {
    constructor () {
        super(carritoModel)
    }
    async actualizarProdEnCarrito(idCarrito, producto) {
        try {
            await this.model.updateOne({user: idCarrito}, {$push: {productos: producto}});
            const listadoActualizado = await this.model.find({user: idCarrito}, { __v: 0 });
            return listadoActualizado[0];
        } catch (e) {
            errorLogger.error(`Ocurrio un error en actualizarProdEnCarrito CRUD -> ` + e.message);
            throw new Error(`Ocurrio un error en actualizarProdEnCarrito CRUD -> ` + e.message)
        }
    }

    async eliminarProdEnCarrito(idCarrito, producto) {
        try {
            await this.model.updateOne({user: idCarrito}, {$set: {productos: producto}});
            const listadoActualizado = await this.model.find({user: idCarrito}, { __v: 0 });
            return listadoActualizado[0];
        } catch (e) {
            errorLogger.error(`Ocurrio un error en eliminarProdEnCarrito CRUD -> ` + e.message);
            throw new Error(`Ocurrio un error en eliminarProdEnCarrito CRUD -> ` + e.message)
        }
    }

    async leerInfoPorId(id) {
        try {
            return await this.model.find({ user: id }, { __v: 0 });
        } catch (e) {
            errorLogger.error(`Ocurrio un error en leerinfo CRUD -> ` + e.message);
            throw new Error(`Ocurrio un error en leerInfo CRUD -> ` + e.message)
        }
    }

    async eliminarInfo(id) {
        try {
            const result = await this.model.deleteOne({ user: id });
            return this.leerInfo();
        } catch (e) {
            errorLogger.error(`Ocurrio un error en eliminarInfo CRUD -> ` + e.message);
            throw new Error(`Ocurrio un error en eliminarInfo CRUD -> ` + e.message)
        }
    }
}

module.exports = {
    DaoMongoCarrito
}