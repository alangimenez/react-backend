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
            await this.model.updateOne({ user: ubicacion }, { $push: { productos: objeto } });
            const listadoActualizado = await this.model.find({ user: ubicacion }, { __v: 0 });
            return listadoActualizado[0];
        } catch (e) {
            return error.errorProcess("CRUD Error", `El Crud ha tenido un error -> ` + e.message, res);
        }
        
    }

    async eliminarProdEnCarrito(idCarrito, productos) {
        try {
            await this.model.updateOne({ user: idCarrito }, { $set: { productos: productos } });
            const listadoActualizado = await this.model.find({ user: idCarrito }, { __v: 0 });
            return listadoActualizado[0];
        } catch (e) {
            return error.errorProcess("CRUD Error", `El Crud ha tenido un error -> ` + e.message, res);
        }
        
    }

    async vaciarCarrito(id) {
        try {
            const resultado = await this.model.updateOne({ user: id }, { $set: { productos: [] } });
            return resultado;    
        } catch (e) {
            return error.errorProcess("CRUD Error", `El Crud ha tenido un error -> ` + e.message, res);
        }
    }

    async leerInfoPorId(id) {
        try {
            let prodFiltrado = await this.model.find({ user: id }, { __v: 0 }).lean();
            if (prodFiltrado.length === 0) prodFiltrado = "";
            return prodFiltrado[0];
        } catch (e) {
            return error.errorProcess("CRUD Error", `El Crud ha tenido un error -> ` + e.message, res);
        }
    }

    async actualizarCantidadDeProductos(carrito, lista, producto) {
        try {
            await this.eliminarProdEnCarrito("a", lista, producto);
            await this.actualizarProdEnCarrito(lista, producto);
            const listadoActualizado = await this.model.find({ id: lista.id }, { __v: 0 });
            return listadoActualizado[0];
        } catch (e) {
            return error.errorProcess("CRUD Error", `El Crud ha tenido un error -> ` + e.message, res);
        }
        
    }

    async actualizarTotalCarrito(carrito, total) {
        try {
            await this.model.updateOne({ user: carrito }, { $set: { total: total } })
            const listadoActualizado = await this.model.find({ user: carrito }, { __v: 0 });
            return listadoActualizado[0];
        } catch (e) {
            return error.errorProcess("CRUD Error", `El Crud ha tenido un error -> ` + e.message, res);
        }
    }

    async eliminarInfo(id) {
        try {
            const result = await this.model.deleteOne({ user: id });
            if (result.deletedCount === 0) return { error: -1, message: `producto no encontrado` }
            return this.leerInfo();
        } catch (e) {
            return error.errorProcess("CRUD Error", `El Crud ha tenido un error -> ` + e.message, res);
        }
    }
}

module.exports = {
    DaoMongoCarrito
}