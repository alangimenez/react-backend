const { controlProps } = require('../../middlewares/controlProps')

class CrudFS {
    constructor(type) {
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

    leerInfoPorId(id) {
        const prodFiltrado = this.leerInfo().find(e => e.id === +id);
        return prodFiltrado;
    }

    subirInfo(nuevoObjeto) {
        try {
            const datos = this.leerInfo();
            let idNuevo;
            datos.length === 0 ? idNuevo = 1 : idNuevo = datos[datos.length - 1].id + 1;
            if (nuevoObjeto) {
                const validacion = controlProps(nuevoObjeto);
                if (validacion) return validacion;
                nuevoObjeto = {
                    ...nuevoObjeto,
                    id: idNuevo,
                    timestamp: Date.now(),
                };
                datos.push(nuevoObjeto);
            } else {
                nuevoObjeto = {
                    id: idNuevo,
                    timestamp: Date.now(),
                    productos: [],
                };
                datos.push(nuevoObjeto);
            }
            this.fs.writeFileSync(this.path, JSON.stringify(datos), 'utf-8');
            return nuevoObjeto;
        }
        catch (e) {
            console.log(e.message);
        }
    }

    eliminarInfo(id) {
        const listadoProductos = this.leerInfo();
        const result = listadoProductos.findIndex(e => e.id === +id);
        if (result === -1) return { error: -1, message: `producto no encontrado` }
        listadoProductos.splice(result, 1);
        this.fs.writeFileSync(this.path, JSON.stringify(listadoProductos), 'utf-8');
        return listadoProductos
    }

    actualizarInfo(objeto) {
        const listadoProductos = this.leerInfo();
        const result = listadoProductos.findIndex(e => e.id === +objeto.id);
        if (result === -1) return { error: -1, message: `producto no encontrado` }
        if (!objeto.nombre && !objeto.descripcion && !objeto.codigo && !objeto.foto && !objeto.precio && !objeto.stock) return (
            { error: -3, message: `Las caracteristicas que se intentan actualizar del producto no existen` }
        )
        if (objeto.nombre) listadoProductos[result].nombre = objeto.nombre;
        if (objeto.codigo) listadoProductos[result].codigo = objeto.codigo;
        if (objeto.descripcion) listadoProductos[result].descripcion = objeto.descripcion;
        if (objeto.stock) listadoProductos[result].stock = objeto.stock;
        if (objeto.foto) listadoProductos[result].foto = objeto.foto;
        if (objeto.precio) listadoProductos[result].precio = objeto.precio;
        if (objeto.timestamp) listadoProductos[result].timestamp = objeto.timestamp;
        return listadoProductos[result];
    }

    verificarTable() {
        return true;
    }
}

module.exports = {
    CrudFS
}