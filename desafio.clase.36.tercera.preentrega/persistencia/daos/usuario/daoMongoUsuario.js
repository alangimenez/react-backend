const {CrudMongo} = require('../../contenedores/crudMongo');
const usuarioModel = require('../../../models/usuarioMongo');

class DaoMongoUsuario extends CrudMongo {
    constructor () {
        super(usuarioModel)
    }
}

module.exports = {
    DaoMongoUsuario
}