const {CrudMongo} = require('../../contenedores/crudMongo');
const carritoModel = require('../../../models/carritoMongo');

class DaoMongoCarrito extends CrudMongo {
    constructor () {
        super(carritoModel)
    }
    async actualizarProdEnCarrito(ubicacion, objeto) {
        await this.model.updateOne({user: ubicacion}, {$push: {productos: objeto}});
        const listadoActualizado = await this.model.find({user: ubicacion}, { __v: 0 });
        return listadoActualizado[0];
    }

    async eliminarProdEnCarrito(idCarrito, productos) {
        await this.model.updateOne({user: idCarrito}, {$set: {productos: productos}});
        const listadoActualizado = await this.model.find({user: idCarrito}, { __v: 0 });
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

    async eliminarInfo(id) {
        const result = await this.model.deleteOne({user: id});
        if (result.deletedCount === 0) return { error: -1, message: `producto no encontrado` }
        return this.leerInfo();
    }
}

module.exports = {
    DaoMongoCarrito
}