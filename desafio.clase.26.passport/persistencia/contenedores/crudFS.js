class ContenedorFS {
    constructor (type) {
        this.path = `./assets/${type}.txt`;
        this.fs = require('fs')
    }

    readTable() {
        try {
            return JSON.parse(this.fs.readFileSync(this.path, 'utf-8'));
        }
        catch (e) {
            console.log(e);
        }
    }

    writeTable(message) {
        try {
            const datos = this.readTable();
            datos.push(message);
            this.fs.writeFileSync(this.path, JSON.stringify(datos), 'utf-8')
        }
        catch (e) {
            console.log(e.message);
        }
    }

    getByEmail (email) {
        const datos = this.readTable();
        const usuario = datos.find(e => e.email === email);
        return usuario;
    }

    verificarTable() {
        return true;
    }
}

module.exports = {
    ContenedorFS
}