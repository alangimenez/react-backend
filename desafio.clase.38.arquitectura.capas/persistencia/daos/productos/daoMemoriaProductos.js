const { CrudMemoria } = require('../../contenedores/crudMemoria');

let informacion = []

class DaoMemoriaProducto extends CrudMemoria {

    constructor () {
        super(informacion);
    }

}

module.exports = {
    DaoMemoriaProducto
}