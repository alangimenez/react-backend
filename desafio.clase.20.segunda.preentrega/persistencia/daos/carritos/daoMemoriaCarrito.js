const { CrudMemoria } = require('../../contenedores/crudMemoria');

let carrito = [];

class DaoMemoriaCarrito extends CrudMemoria {

    constructor () {
        super(carrito);
    }

}

module.exports = {
    DaoMemoriaCarrito
}