const { CrudFirebase } = require('../../contenedores/crudFirebase');

class DaoFirebaseProductos extends CrudFirebase {

    constructor () {
        super('productos');
    }

}

module.exports = {
    DaoFirebaseProductos
}