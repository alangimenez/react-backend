const {CrudMongo} = require('../../contenedores/crudMongo');
const carritoModel = require('../../../models/carritoMongo');

class DaoMongoCarrito extends CrudMongo {
    constructor () {
        super(carritoModel)
    }
    async actualizarCarrito(objeto) {
        await this.model.updateOne({id: objeto.id}, {$push: {productos: objeto}});
        const listadoActualizado = await this.model.find({id: objeto.id}, { __v: 0 });
        return listadoActualizado[0];
    }
}

module.exports = {
    DaoMongoCarrito
}