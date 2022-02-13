const fs = require('fs');
const fsPromises = require('fs').promises;

class Contenedor {
    constructor(nombreDeArchivo) {
        this.name = nombreDeArchivo;
        try {
            this.datos = JSON.parse(fs.readFileSync(`${this.name}.txt`, `utf-8`));
            if (this.datos === '') this.datos = [];
        }
        catch (e) {
            this.datos = [];
            fs.writeFileSync(`${this.name}.txt`, JSON.stringify(''))
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

    async getById(number) {
        try {
            const prodId = this.datos.find((e) => +e.id === number)
            if (!prodId) return console.log({
                error: 3,
                mensaje: `El producto solicitado no existe`
            });
            console.log(prodId);
        }
        catch (e) {
            console.log(e.message);
        }
    }

    async save(pelicula) {
        try {
            let idNuevo;
            this.datos.length === 0 ? idNuevo = 1 : idNuevo = this.datos[this.datos.length - 1].id + 1
            this.datos.push({
                ...pelicula,
                id: idNuevo,
            })
            await fs.promises.writeFile(`${this.name}.txt`, JSON.stringify(this.datos))
            return idNuevo;
        }
        catch (e) {
            console.log(e.message);
        }
    }

    async deleteAll() {
        try {
            await fs.promises.writeFile(`${this.name}.txt`, "[]")
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
                mensaje: `El producto solicitado no existe`
            });
            this.datos.splice(resultado, 1);
            await fs.promises.writeFile(`${this.name}.txt`, JSON.stringify(this.datos))
            return number;
        }
        catch (e) {
            console.log(e.message);
        }
    }
}

module.exports = Contenedor; 

/*  const prueba = new Contenedor('productos');
function ejecutar () {
    prueba.deleteById(8)
}

ejecutar(); */