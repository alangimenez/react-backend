const { CrudFS } = require('../../contenedores/crudFS');
const { ErrorHandler } = require('../../../error/error');
const error = new ErrorHandler();

class DaoMemoriaCarritoFS extends CrudFS {

    constructor() {
        super(`./assets/carrito.txt`);
        this.path = `./assets/carrito.txt`
        this.fs = require('fs');
    }

    async actualizarProdEnCarrito(ubicacion, objeto) {
        try {
            const listadoCarritos = await JSON.parse(this.fs.readFileSync(this.path, 'utf-8'));
            const index = listadoCarritos.findIndex(e => e.id === ubicacion.id);
            listadoCarritos[index].productos.push(objeto);
            this.fs.writeFileSync(this.path, JSON.stringify(listadoCarritos), 'utf-8');
            return listadoCarritos[index];
        } catch (e) {
            return error.errorProcess("CRUD Error", `El Crud ha tenido un error -> ` + e.message, res);
        }
        
    }

    async eliminarProdEnCarrito(listado, objeto, producto) {
        try {
            const carritoEnListado = listado.findIndex(e => e.id === objeto.id);
            const productoEnCarrito = objeto.productos.findIndex(e => e.id === producto.id);
            listado[carritoEnListado].productos.splice(productoEnCarrito, 1);
            this.fs.writeFileSync(this.path, JSON.stringify(listado), 'utf-8');
            return listado[carritoEnListado].productos;
        } catch (e) {
            return error.errorProcess("CRUD Error", `El Crud ha tenido un error -> ` + e.message, res);
        }
        
    }
}

module.exports = {
    DaoMemoriaCarritoFS
}