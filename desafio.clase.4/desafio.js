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
        if (this.datos.length === 0) return console.log({
            error: 2,
            mensaje: `El archivo no contiene información a mostrar`
        })
        return console.log(this.datos);
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

    async save(title, price, thumbnail) {
        try {
            let idNuevo;
            this.datos.length === 0 ? idNuevo = 1 : idNuevo = this.datos[this.datos.length - 1].id + 1
            this.datos.push({
                title: title,
                price: price,
                thumbnail: thumbnail,
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
            const filtro = (dato) => +dato.id === number;
            const resultado = this.datos.findIndex(filtro);
            if (resultado < 0) return console.log({
                error: 3,
                mensaje: `El producto solicitado no existe`
            });
            this.datos.splice(resultado, 1);
            await fs.promises.writeFile(`${this.name}.txt`, JSON.stringify(this.datos))
            console.log({ mensaje: `El objeto ${number} fue eliminado con éxito` });
        }
        catch (e) {
            console.log(e.message);
        }
    }
}

const prueba = new Contenedor("casa");
async function ejecutarPruebas() {
    // await prueba.getAll();
    // await prueba.getById(2);
    // console.log(`La pelicula tiene el id ${await prueba.save("batman", 1500, "enlaces de la foto")}`);
    // await prueba.deleteAll();
    // await prueba.deleteById(1);
}

ejecutarPruebas();
