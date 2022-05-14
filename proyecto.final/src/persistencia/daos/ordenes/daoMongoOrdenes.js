const { CrudMongo } = require('../../contenedores/crudMongo');
const ordenesModel = require('../../../models/ordenMongo');

class DaoMongoOrdenes extends CrudMongo {
    constructor() {
        super(ordenesModel)
    }
}

module.exports = {
    DaoMongoOrdenes
}