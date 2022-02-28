const { CrudMemoria } = require('../../contenedores/crudMemoria');

let carrito = [];

class DaoMemoriaCarrito extends CrudMemoria {

    constructor () {
        super(carrito);
    }
    async actualizarCarrito(objeto) {
        const listadoCarritos = carrito
        const index = listadoCarritos.findIndex(e => e.id === objeto.id);
        listadoCarritos[index] = objeto;
    }
}

module.exports = {
    DaoMemoriaCarrito
}