const { CrudMongo } = require('../../contenedores/crudMongo');
const mensajeModel = require('../../../models/mensajeMongo');

class DaoMongoMensaje extends CrudMongo {
    constructor() {
        super(mensajeModel)
    }
}

module.exports = {
    DaoMongoMensaje
}