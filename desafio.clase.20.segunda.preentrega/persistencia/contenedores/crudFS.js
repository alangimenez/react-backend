class CrudFS {
    constructor (type) {
        this.path = type;
        this.fs = require('fs')
    }

    leerInfo() {
        try {
            return JSON.parse(this.fs.readFileSync(this.path, 'utf-8'));
        }
        catch (e) {
            console.log(e);
        }
    }

    subirInfo(nuevoObjeto) {
        try {
            const datos = this.leerInfo();
            let idNuevo;
            datos.length === 0 ? idNuevo = 1 : idNuevo = datos[datos.length - 1].id + 1;
            if (nuevoObjeto) {
                datos.push(nuevoObjeto);
            } else {
                nuevoObjeto = {
                    id: idNuevo,
                    timestamp: Date.now(),
                };
                datos.push(nuevoObjeto);
            }
            this.fs.writeFileSync(this.path, JSON.stringify(datos), 'utf-8');
            return { nuevoObjeto };
        }
        catch (e) {
            console.log(e.message);
        }
    }

    verificarTable() {
        return true;
    }
}

module.exports = {
    CrudFS
}