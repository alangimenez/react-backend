const {CrudMongo} = require('../../contenedores/crudMongo');
const carritoModel = require('../../../models/carritoMongo');

class DaoMongoCarrito extends CrudMongo {
    constructor () {
        super(carritoModel)
    }
    async actualizarProdEnCarrito(ubicacion, objeto) {
        await this.model.updateOne({id: ubicacion.id}, {$push: {productos: objeto}});
        const listadoActualizado = await this.model.find({id: ubicacion.id}, { __v: 0 });
        return listadoActualizado[0];
    }

    async eliminarProdEnCarrito(listado, objeto, producto) {
        const ubicacionProdEnCarrito = objeto.productos.findIndex(e => e.id === producto.id);
        objeto.productos.splice(ubicacionProdEnCarrito, 1);
        await this.model.updateOne({id: objeto.id}, {$set: {productos: objeto.productos}});
        const listadoActualizado = await this.model.find({id: objeto.id}, { __v: 0 });
        return listadoActualizado[0];
    }

    async vaciarCarrito(id) {
        const resultado = await this.model.updateOne({user: id}, {$set: {productos: []}});
        return resultado;
    }

    async leerInfoPorId(id) {
        let prodFiltrado = await this.model.find({user: id}, { __v: 0 }).lean();
        if (prodFiltrado.length === 0) prodFiltrado = "";
        return prodFiltrado[0];
    }

    async actualizarCantidadDeProductos (carrito, lista, producto) {
        await this.eliminarProdEnCarrito("a", lista, producto);
        await this.actualizarProdEnCarrito(lista, producto);
        const listadoActualizado = await this.model.find({id: lista.id}, { __v: 0 });
        return listadoActualizado[0];
    }

    async actualizarTotalCarrito (carrito, total) {
        await this.model.updateOne({user: carrito}, {$set: {total: total}})
        const listadoActualizado = await this.model.find({user: carrito}, { __v: 0 });
        return listadoActualizado[0];
    }
}

module.exports = {
    DaoMongoCarrito
}