const { CrudFS } = require('../../contenedores/crudFS');

class DaoMemoriaProductoFS extends CrudFS {

    constructor () {
        super(`./assets/productos.txt`);
    }

}

module.exports = {
    DaoMemoriaProductoFS
}