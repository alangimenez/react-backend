const { CrudMongo } = require('../../contenedores/crudMongo');
const usuarioModel = require('../../../models/usuarioSchema');

class DaoMongoUsuario extends CrudMongo {
    constructor() {
        super(usuarioModel)
    }
    async actualizarProdEnCarrito(ubicacion, objeto) {
        await this.model.updateOne({ id: ubicacion.id }, { $push: { productos: objeto } });
        const listadoActualizado = await this.model.find({ id: ubicacion.id }, { __v: 0 });
        return listadoActualizado[0];
    }

    async eliminarProdEnCarrito(listado, objeto, producto) {
        const ubicacionProdEnCarrito = objeto.productos.findIndex(e => e.id === producto.id);
        objeto.productos.splice(ubicacionProdEnCarrito, 1);
        await this.model.updateOne({ id: objeto.id }, { $set: { productos: objeto.productos } });
        const listadoActualizado = await this.model.find({ id: objeto.id }, { __v: 0 });
        return listadoActualizado[0];
    }
}

module.exports = {
    DaoMongoUsuario
}