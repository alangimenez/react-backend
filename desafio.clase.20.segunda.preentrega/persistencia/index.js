const { ContenedorDB } = require('./contenedores/crudSqLite');
const { ContenedorFS } = require('./contenedores/crudFS');

config = 'firebase';

// para configurar donde persistira la información, en type tiene la opcion:
// mariadb (pasarle el nombre de tabla), mysqlite (pasarle el nombre de tabla),
// filesystem (no hace uso del nombre de tabla) o memory (no hace uso del nombre de tabla).
// si se coloca otro dato la aplicación dará error. 
const conexionMensajes = { type: 'mysqlite', nameTable: 'websocketchat', info: 'mensajes' }
const conexionProductos = { type: 'mariadb', nameTable: 'otratablaproductos', info: 'productos' }

function fnProductos() {
    let opProductos = "";
    switch (config) {
        case 'mariadb':
            const { DaoMemoriaProductoMariaDB } = require('./daos/productos/daoMariaDBProductos');
            opProductos = new DaoMemoriaProductoMariaDB('websocketproductos');
            break;
        case 'mysqlite':
            const { DaoMemoriaProductoSQLite } = require('./daos/productos/daoSqLiteProductos');
            opProductos = new DaoMemoriaProductoSQLite('websocketproductos');
            break;
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
        case 'mariadb':
            productos = new ContenedorDB(config, nameTable);
            break;
        case 'mysqlite':
            productos = new ContenedorDB(config, nameTable);
            break;
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



module.exports = {
    fnProductos,
    fnCarritos
}