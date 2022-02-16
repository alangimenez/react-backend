const res = require('express/lib/response');
const fs = require('fs');
const fsPromises = require('fs').promises;

class Contenedor {
    constructor(nombreDeArchivo) {
        this.name = nombreDeArchivo;
        this.route = `./assets/${this.name}.txt`
        try {
            this.datos = JSON.parse(fs.readFileSync(this.route, `utf-8`));
            if (this.datos === '') this.datos = [];
        }
        catch (e) {
            this.datos = [];
            fs.writeFileSync(this.route, JSON.stringify(''))
            console.log({ error: 1, mensaje: `El archivo no existe. Se ha creado uno nuevo con el nombre ${this.name}.txt` })
        }
    }

    getAll() {
        if (this.datos.length === 0) return ({
            error: 2,
            mensaje: `El archivo no contiene información a mostrar`
        })
        return this.datos;
    }

    getById(number) {
        try {
            const prodId = this.datos.find((e) => +e.id === number)
            if (!prodId) return ({
                error: 3,
                mensaje: `producto no encontrado`
            });
            return prodId
        }
        catch (e) {
            console.log(e.message);
        }
    }

    async save(producto) {
        try {
            let idNuevo;
            this.datos.length === 0 ? idNuevo = 1 : idNuevo = this.datos[this.datos.length - 1].id + 1;
            const nuevaproducto = {
                ...producto,
                id: idNuevo,
            }
            this.datos.push(nuevaproducto)
            await fs.promises.writeFile(this.route, JSON.stringify(this.datos))
            return nuevaproducto;
        }
        catch (e) {
            console.log(e.message);
        }
    }

    async deleteAll() {
        try {
            await fs.promises.writeFile(this.route, "[]")
        }
        catch (e) {
            console.log(e.message);
        }
    }

    async put (id, producto) {
        try {
            const productoSeleccionado = this.getById(id);
            if (productoSeleccionado.error === 3) return productoSeleccionado;
            const productoModificado = {
                ...productoSeleccionado,
                ...producto
            }
            const ubicacionProducto = this.datos.findIndex(e => e === productoSeleccionado);
            this.datos[ubicacionProducto] = productoModificado;
            await fs.promises.writeFile(this.route, JSON.stringify(this.datos))
            return productoModificado;
        }
        catch (e) {
            console.log(e.message);
        }
    }

    async deleteById(number) {
        try {
            const filtro = (dato) => +dato.id === +number;
            const resultado = this.datos.findIndex(filtro);
            if (resultado < 0) return ({
                error: 3,
                mensaje: `producto no encontrado`
            });
            this.datos.splice(resultado, 1);
            await fs.promises.writeFile(this.route, JSON.stringify(this.datos))
            return number;
        }
        catch (e) {
            console.log(e.message);
        }
    }
}

module.exports = Contenedor;