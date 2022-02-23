const { CrudMemoria } = require('../../contenedores/crudMemoria');

let informacion = [{
    id: 1,
    fruta: 'pera'
},{
    id: 2,
    fruta: 'manzana'
},
{
    id: 3,
    fruta: 'banana'
}]

class DaoMemoriaProducto extends CrudMemoria {

    constructor () {
        super(informacion);
    }

}

module.exports = {
    DaoMemoriaProducto
}