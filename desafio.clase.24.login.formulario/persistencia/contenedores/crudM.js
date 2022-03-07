const mensajes = [];
const productos = [];

class ContenedorM {
    constructor (type) {
        if (type === 'mensajes') {
            this.data = mensajes;
        } else {
            this.data = productos
        }
    }

    readTable() {
        try {
            return this.data;
        }
        catch (e) {
            console.log(e);
        }
    }

    writeTable(message) {
        try {
            const datos = this.readTable();
            datos.push(message);
        }
        catch (e) {
            console.log(e.message);
        }
    }

    async verificarTable() {
        return true;
    }
}

module.exports = {
    ContenedorM
}