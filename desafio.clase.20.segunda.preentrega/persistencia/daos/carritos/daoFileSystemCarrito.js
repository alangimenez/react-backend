const { CrudFS } = require('../../contenedores/crudFS');

class DaoMemoriaCarritoFS extends CrudFS {

    constructor() {
        super(`./assets/carrito.txt`);
        this.path = `./assets/carrito.txt`
        this.fs = require('fs');
    }
    async actualizarCarrito(objeto) {
        const listadoCarritos = await JSON.parse(this.fs.readFileSync(this.path, 'utf-8'));
        const index = listadoCarritos.findIndex(e => e.id === objeto.id);
        listadoCarritos[index] = objeto;
        this.fs.writeFileSync(this.path, JSON.stringify(listadoCarritos), 'utf-8');
    }
}

module.exports = {
    DaoMemoriaCarritoFS
}