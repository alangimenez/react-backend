const options = require("../databases/config");

class Contenedor {
    constructor(options, nameTable, knex) {
        this.options = options;
        this.nameTable = nameTable
        this.knex = knex(options);
        if (nameTable === "websocketchat") {
            this.columns = ['user', 'timestamp', 'message'];
        } else {
            this.columns = ['codigo', 'nombre', 'descripcion', 'precio', 'foto', 'stock', 'timestamp'];
        }
    }

    async readTable() {
        const datos = await this.knex.from(this.nameTable).select(this.columns)
        return datos;
    }

    async writeTable (message) {
        await this.knex(this.nameTable).insert(message);
    }

    async verifyTable () {
        const hasTable = await this.knex.schema.hasTable(this.nameTable);
        if (hasTable == false) {
            await this.knex.schema.createTable(this.nameTable, table => {
                table.increments('id').primary();
                table.string('user'),
                table.string('timestamp'),
                table.string('message')
            })
        }

    }

    destroyConnection () {
        this.knex.destroy();
    }
}

module.exports = Contenedor;