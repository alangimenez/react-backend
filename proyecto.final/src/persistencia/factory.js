config = process.env.PERSISTENCIA;

function fnProductos() {
    let opProductos = "";
    switch (config) {
        case 'filesystem':
            const { DaoMemoriaProductoFS } = require('./daos/productos/daoFileSystemProductos');
            opProductos = new DaoMemoriaProductoFS();
            break;
        case 'memoria':
            const { DaoMemoriaProducto } = require('./daos/productos/daoMemoriaProductos');
            opProductos = new DaoMemoriaProducto();
            break;
        case 'mongodb':
            const { DaoMongoProducto } = require('./daos/productos/daoMongoProductos');
            opProductos = new DaoMongoProducto();
            break;
        case 'firebase':
            const { DaoFirebaseProductos } = require('./daos/productos/daoFirebaseProductos');
            opProductos = new DaoFirebaseProductos();
            break;
        default:
            break;
    }
    return opProductos;
}

function fnCarritos() {
    let opCarritos = "";
    switch (config) {
        case 'filesystem':
            const { DaoMemoriaCarritoFS } = require('./daos/carritos/daoFileSystemCarrito');
            opCarritos = new DaoMemoriaCarritoFS();
            break;
        case 'memoria':
            const { DaoMemoriaCarrito } = require('./daos/carritos/daoMemoriaCarrito');
            opCarritos = new DaoMemoriaCarrito();
            break;
        case 'mongodb':
            const { DaoMongoCarrito } = require('./daos/carritos/daoMongoCarrito');
            opCarritos = new DaoMongoCarrito();
            break;
        case 'firebase':
            const { DaoFirebaseCarrito } = require('./daos/carritos/daoFirebaseCarrito');
            opCarritos = new DaoFirebaseCarrito();
            break;
        default:
            break;
    }
    return opCarritos;
}

function fnOrdenes() {
    let opOrdenes = "";
    switch (config) {
        /* case 'filesystem':
            const { DaoMemoriaCarritoFS } = require('./daos/carritos/daoFileSystemCarrito');
            opOrdenes = new DaoMemoriaCarritoFS();
            break;
        case 'memoria':
            const { DaoMemoriaCarrito } = require('./daos/carritos/daoMemoriaCarrito');
            opOrdenes = new DaoMemoriaCarrito();
            break; */
        case 'mongodb':
            const { DaoMongoOrdenes } = require('./daos/ordenes/daoMongoOrdenes');
            opOrdenes = new DaoMongoOrdenes();
            break;
        /* case 'firebase':
            const { DaoFirebaseCarrito } = require('./daos/carritos/daoFirebaseCarrito');
            opOrdenes = new DaoFirebaseCarrito();
            break; */
        default:
            break;
    }
    return opOrdenes;
}

module.exports = {
    fnProductos,
    fnCarritos, 
    fnOrdenes
}