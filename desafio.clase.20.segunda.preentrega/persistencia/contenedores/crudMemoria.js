const { controlProps } = require('../../middlewares/controlProps');

class CrudMemoria {
    constructor(informacion) {
        this.data = informacion;
    }

    leerInfo() {
        try {
            return this.data;
        }
        catch (e) {
            console.log(e);
        }
    }

    leerInfoPorId(id) {
        const prodFiltrado = this.data.find(e => e.id === +id);
        return prodFiltrado;
    }

    /* escribirInfo(message) {
        try {
            const datos = this.leerInfo();
            datos.push(message);
        }
        catch (e) {
            console.log(e.message);
        }
    } */

    /* eliminarTodo() {
        this.data = [];
    } */

    actualizarInfo(objeto) {
        const result = this.data.findIndex(e => e.id === +objeto.id);
        if (result === -1) return { error: -1, message: `producto no encontrado` }
        if (!objeto.nombre && !objeto.descripcion && !objeto.codigo && !objeto.foto && !objeto.precio && !objeto.stock) return (
            { error: -3, message: `Las caracteristicas que se intentan actualizar del producto no existen` }
        )
        if (objeto.nombre) this.data[result].nombre = objeto.nombre;
        if (objeto.codigo) this.data[result].codigo = objeto.codigo;
        if (objeto.descripcion) this.data[result].descripcion = objeto.descripcion;
        if (objeto.stock) this.data[result].stock = objeto.stock;
        if (objeto.foto) this.data[result].foto = objeto.foto;
        if (objeto.precio) this.data[result].precio = objeto.precio;
        if (objeto.timestamp) this.data[result].timestamp = objeto.timestamp;
        return this.data[result];
    }

    subirInfo(objeto) {
        let idNuevo;
        let nuevoObjeto = {};
        this.data.length === 0 ? idNuevo = 1 : idNuevo = this.data[this.data.length - 1].id + 1;
        if (objeto) {
            const validacion = controlProps(objeto);
            if (validacion) return validacion;
            nuevoObjeto = {
                ...objeto,
                id: idNuevo,
                timestamp: Date.now(),
            };
        } else {
            nuevoObjeto = {
                id: idNuevo,
                timestamp: Date.now(),
                productos: []
            };
        }
        this.data.push(nuevoObjeto);
        return nuevoObjeto;
    }

    eliminarInfo(id) {
        const result = this.data.findIndex(e => e.id === +id);
        if (result === -1) return { error: -1, message: `producto no encontrado` }
        this.data.splice(result, 1);
        return this.data
    }

    async verificarTable() {
        return true;
    }
}

module.exports = {
    CrudMemoria
}