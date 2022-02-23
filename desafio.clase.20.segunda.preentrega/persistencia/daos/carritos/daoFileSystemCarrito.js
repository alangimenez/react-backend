const { CrudFS } = require('../../contenedores/crudFS');

class DaoMemoriaCarritoFS extends CrudFS {

    constructor () {
        super(`./assets/carrito.txt`);
    }

}

module.exports = {
    DaoMemoriaCarritoFS
}