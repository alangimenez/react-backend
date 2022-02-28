const { CrudMemoria } = require('../../contenedores/crudMemoria');

let carrito = [];

class DaoMemoriaCarrito extends CrudMemoria {

    constructor () {
        super(carrito);
    }
    async actualizarProdEnCarrito(ubicacion, objeto) {
        const listadoCarritos = carrito
        const index = listadoCarritos.findIndex(e => e.id === ubicacion.id);
        listadoCarritos[index].productos.push(objeto);
        return listadoCarritos[index];
    }

    async eliminarProdEnCarrito(listado, objeto, producto) {
        const carritoEnListado = listado.findIndex(e => e.id === objeto.id);
        const productoEnCarrito = objeto.productos.findIndex(e => e.id === producto.id);
        listado[carritoEnListado].productos.splice(productoEnCarrito, 1);
        return listado[carritoEnListado].productos;
    }
}

module.exports = {
    DaoMemoriaCarrito
}