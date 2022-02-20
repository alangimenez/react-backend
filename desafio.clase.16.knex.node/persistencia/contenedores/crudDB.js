const { optionsSql, optionsSqlite } = require('../../databases/config')

class ContenedorDB {
    constructor(database, nameTable) {
        this.options = "";
        switch (database) {
            case 'mariadb':
                this.options = optionsSql;
                break;
            case 'mysqlite':
                this.options = optionsSqlite;
                break;
        }
        this.nameTable = nameTable;
        this.knex = require('knex')(this.options);
    }

    async readTable() {
        try {
            const datos = await this.knex.from(this.nameTable).select('*')
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

    async crearTable(type) {
        try {
            switch (type) {
                case 'mensajes':
                    await this.knex.schema.createTable(this.nameTable, (table) => {
                        table.increments('id').primary();
                        table.string('user');
                        table.string('timestamp');
                        table.string('message')
                    })
                    break;
                case 'productos':
                    await this.knex.schema.createTable(this.nameTable, (table) => {
                        table.increments('id').primary();
                        table.integer('codigo');
                        table.string('nombre');
                        table.string('descripcion');
                        table.float('precio');
                        table.string('foto');
                        table.integer('stock');
                        table.integer('timestamp')
                    })
                default:
                    break;
            }

        }
        catch (e) {
            console.log(e);
        }
    }

    async verificarTable() {
        return this.knex.schema.hasTable(this.nameTable);
    }

    destroyConnection() {
        this.knex.destroy();
    }
}

module.exports = { ContenedorDB };