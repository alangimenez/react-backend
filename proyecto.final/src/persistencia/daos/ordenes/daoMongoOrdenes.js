const { CrudMongo } = require('../../contenedores/crudMongo');
const ordenesModel = require('../../../models/ordenMongo');

class DaoMongoOrdenes extends CrudMongo {
    constructor() {
        super(ordenesModel)
    }

    async leerInfoPorUser(user) {
        try {
            return await this.model.find({ user: user }, { __v: 0 });
        } catch (e) {
            return error.errorProcess("CRUD Error", `El Crud ha tenido un error -> ` + e.message);
        }
    }
}

module.exports = {
    DaoMongoOrdenes
}