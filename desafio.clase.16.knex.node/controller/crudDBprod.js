const options = require("../databases/config");

class ContenedorProd {
    constructor(options, nameTable, knex) {
        this.options = options;
        this.nameTable = nameTable
        this.knex = knex(options);
    }

    async readTable() {
        const datos = await this.knex.from(this.nameTable).select('codigo', 'nombre', 'descripcion', 'precio', 'foto', 'stock', 'timestamp')
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

module.exports = ContenedorProd;