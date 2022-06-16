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
            return error.errorProcess("CRUD Error", `El Crud ha tenido un error -> ` + e.message);
        }
        
    }

    async eliminarProdEnCarrito(idCarrito, productos) {
        try {
            await this.model.updateOne({ id: idCarrito }, { $set: { productos: productos } });
            const listadoActualizado = await this.model.find({ id: idCarrito }, { __v: 0 });
            return listadoActualizado[0];
        } catch (e) {
            return error.errorProcess("CRUD Error", `El Crud ha tenido un error -> ` + e.message);
        }
        
    }

    async vaciarCarrito(id) {
        try {
            const resultado = await this.model.updateOne({ id: id }, { $set: { productos: [] } });
            return resultado;    
        } catch (e) {
            return error.errorProcess("CRUD Error", `El Crud ha tenido un error -> ` + e.message, res);
        }
    }

   /*  async leerInfoPorId(id) {
        try {
            let prodFiltrado = await this.model.find({ user: id }, { __v: 0 }).lean();
            if (prodFiltrado.length === 0) prodFiltrado = "";
            return prodFiltrado[0];
        } catch (e) {
            return error.errorProcess("CRUD Error", `El Crud ha tenido un error -> ` + e.message, res);
        }
    } */

    async actualizarCantidadDeProductos(lista, parametros) {
        try {
            /*
            await this.eliminarProdEnCarrito(lista.id, producto);
            await this.actualizarProdEnCarrito(lista.id, producto);
            */
            const result = await this.model.updateOne({id: lista[0].id}, parametros)
            // console.log(result);
            const listadoActualizado = await this.model.find({ id: lista[0].id }, { __v: 0 });
            return listadoActualizado[0];
        } catch (e) {
            return error.errorProcess("CRUD Error", `El Crud ha tenido un error -> ` + e.message);
        }
        
    }

    async actualizarTotalCarrito(carrito, total) {
        try {
            await this.model.updateOne({ user: carrito }, { $set: { total: total } })
            const listadoActualizado = await this.model.find({ user: carrito }, { __v: 0 });
            return listadoActualizado[0];
        } catch (e) {
            return error.errorProcess("CRUD Error", `El Crud ha tenido un error -> ` + e.message);
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