const { ContenedorDB } = require('./contenedores/crudDB'); 
const { ContenedorFS } = require('./contenedores/crudFS');
const { ContenedorM } = require('./contenedores/crudM');

// para configurar donde persistira la información, en type tiene la opcion:
// mariadb (pasarle el nombre de tabla), mysqlite (pasarle el nombre de tabla),
// filesystem (no hace uso del nombre de tabla) o memory (no hace uso del nombre de tabla).
// si se coloca otro dato la aplicación dará error. 
const conexionMensajes = { type: 'mysqlite', nameTable: 'websocketchat', info: 'mensajes' }
const conexionProductos = { type: 'mariadb', nameTable: 'otratablaproductos', info: 'productos' }

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