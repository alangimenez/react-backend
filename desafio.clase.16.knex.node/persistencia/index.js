const { ContenedorDB } = require('./contenedores/crudDB'); 
const { ContenedorFS } = require('./contenedores/crudFS');
const { ContenedorM } = require('./contenedores/crudM');

const conexionMensajes = { type: 'memory', nameTable: 'chatsabado', info: 'mensajes' }
const conexionProductos = { type: 'memory', nameTable: 'websocketproductos', info: 'productos' }

function baseDeDatos (config, nameTable, type) {
    let guardado = "";
    switch (config) {
        case 'mariadb':
            guardado = new ContenedorDB(config, nameTable);
            break;
        case 'mysqlite':
            guardado = new ContenedorDB(config, nameTable);
            break;
        case 'filesystem':
            guardado = new ContenedorFS(type);
            break;
        case 'memory':
            guardado = new ContenedorM(type);
            break;
        default:
            break;
    }
    return guardado;
}

module.exports = {
    baseDeDatos,
    conexionMensajes,
    conexionProductos
}