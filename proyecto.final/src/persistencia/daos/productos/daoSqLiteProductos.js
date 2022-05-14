const { CrudSqLite } = require('../../contenedores/crudSqLite');
const { optionsSqlite } = require('../../../databases/config')

class DaoMemoriaProductoSQLite extends CrudSqLite {

    constructor (nameTable) {
        super(nameTable, optionsSqlite);
    }
}

module.exports = {
    DaoMemoriaProductoSQLite
}