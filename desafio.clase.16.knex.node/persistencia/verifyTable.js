const {optionsSql, optionsSqlite} = require('../databases/config')
const knexSql = require('knex')(optionsSql);
const knexSqlite = require('knex')(optionsSql);

async function verifyTable (nameTableSql, nameTableSqlite) {
    const hasTableSql = await knexSql.schema.hasTable(nameTableSql);
    if (hasTableSql == false) {
        await knexSql.schema.createTable(nameTableSql, table => {
            table.increments('id').primary();
            table.string('user'),
            table.string('timestamp'),
            table.string('message')
        })
    }
    const hasTableSqlite = await knexSqlite.schema.hasTable(nameTableSqlite);
    if (hasTableSqlite == false) {
        await knexSqlite.schema.createTable(nameTableSqlite, table => {
            table.increments('id').primary();
            table.integer('codigo'),
            table.string('nombre'),
            table.string('descripcion'),
            table.float('precio'),
            table.string('foto'),
            table.integer('stock'),
            table.integer('timestamp')
        })
    }
}

module.exports = verifyTable;