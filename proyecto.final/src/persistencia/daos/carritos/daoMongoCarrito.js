const { CrudMongo } = require('../../contenedores/crudMongo');
const carritoModel = require('../../../models/carritoMongo');
const { ErrorHandler } = require('../../../error/error');
const error = new ErrorHandler();

class DaoMongoCarrito extends CrudMongo {
    constructor() {
        super(carritoModel)
    }

    async actualizarProdEnCarrito(ubicacion, objeto) {
        try {
            await this.model.updateOne({ id: ubicacion }, { $push: { productos: objeto } });
            const listadoActualizado = await this.model.find({ id: ubicacion }, { __v: 0 });
            return listadoActualizado[0];
        } catch (e) {
            return error.errorProcess("CRUD Error", `El CRUD actualizarProdEnCarrito ha tenido un error -> ` + e.message);
        }
        
    }

    async eliminarProdEnCarrito(idCarrito, productos) {
        try {
            await this.model.updateOne({ id: idCarrito }, { $set: { productos: productos } });
            const listadoActualizado = await this.model.find({ id: idCarrito }, { __v: 0 });
            return listadoActualizado[0];
        } catch (e) {
            return error.errorProcess("CRUD Error", `El CRUD eliminarProdEnCarrito ha tenido un error -> ` + e.message);
        }
        
    }

    async vaciarCarrito(id) {
        try {
            const resultado = await this.model.updateOne({ id: id }, { $set: { productos: [], total: 0 } });
            return resultado;    
        } catch (e) {
            return error.errorProcess("CRUD Error", `El CRUD vaciarCarrito ha tenido un error -> ` + e.message, res);
        }
    }

    async actualizarCantidadDeProductos(lista, productos) {
        try {
            await this.model.updateOne({id: lista[0].id}, {$set: {productos: productos}});
            const listadoActualizado = await this.model.find({ id: lista[0].id }, { __v: 0 });
            return listadoActualizado[0];
        } catch (e) {
            return error.errorProcess("CRUD Error", `El CRUD actualizarCantidadDeProductos ha tenido un error -> ` + e.message);
        }
    }

    async actualizarTotalCarrito(carrito, total) {
        try {
            await this.model.updateOne({ user: carrito }, { $set: { total: total } })
            const listadoActualizado = await this.model.find({ user: carrito }, { __v: 0 });
            return listadoActualizado[0];
        } catch (e) {
            return error.errorProcess("CRUD Error", `El CRUD actualizarTotalCarrito ha tenido un error -> ` + e.message);
        }
    }

    async eliminarInfo(id) {
        try {
            const result = await this.model.deleteOne({ user: id });
            if (result.deletedCount === 0) return { error: -1, message: `producto no encontrado` }
            return this.leerInfo();
        } catch (e) {
            return error.errorProcess("CRUD Error", `El CRUD eliminarInfo ha tenido un error -> ` + e.message, res);
        }
    }
}

module.exports = {
    DaoMongoCarrito
}