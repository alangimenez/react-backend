const { optionsSql, optionsSqlite } = require('../databases/config')
const { baseDeDatos } = require('../persistencia/index');
const { conexionMensajes, conexionProductos } = require('../persistencia/index')

async function verifyTable() {
    try {

        // comprobar tabla en sqlite
        const hasTableSqlite = await baseDeDatos(conexionMensajes.type, conexionMensajes.nameTable).verificarTable();
        if (hasTableSqlite === false) {
            await baseDeDatos(conexionMensajes.type, conexionMensajes.nameTable).crearTable(conexionMensajes.info);
        }

        // comprobar tabla en mariadb
        const hasTableSql = await baseDeDatos(conexionProductos.type, conexionProductos.nameTable).verificarTable();
        if (hasTableSql === false) {
            await baseDeDatos(conexionProductos.type, conexionProductos.nameTable).crearTable(conexionProductos.info);
        }
    }
    catch (e) {
        console.log(e);
    }

}

module.exports = { verifyTable };