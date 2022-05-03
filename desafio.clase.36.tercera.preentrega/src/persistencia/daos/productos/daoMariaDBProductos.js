const { CrudSqLite } = require('../../contenedores/crudSqLite');
const { optionsSql } = require('../../../databases/config')


class DaoMemoriaProductoMariaDB extends CrudSqLite {

    constructor (nameTable) {
        super(nameTable, optionsSql );
    }
}

module.exports = {
    DaoMemoriaProductoMariaDB
}