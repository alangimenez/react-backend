const options = require("../databases/config");
const nameTableSqlite = 'tablachat';
const nameTableSql = 'tablaproductos';


class Contenedor {
    constructor(options, nameTable, knex) {
        this.options = options;
        this.nameTable = nameTable
        this.knex = knex(options);
        if (nameTable === nameTableSqlite) {
            this.columns = ['user', 'timestamp', 'message'];
        } else {
            this.columns = ['codigo', 'nombre', 'descripcion', 'precio', 'foto', 'stock', 'timestamp'];
        }
    }

    async readTable() {
        try {
            const datos = await this.knex.from(this.nameTable).select(this.columns)
            return datos;
        }
        catch (e) {
            console.log(e);
        }
        
    }

    async writeTable(message) {
        try {
            await this.knex(this.nameTable).insert(message);
        }
        catch (e) {
            console.log(e.message);
        }
    }

    destroyConnection() {
        this.knex.destroy();
    }
}

module.exports = {Contenedor, nameTableSql, nameTableSqlite };