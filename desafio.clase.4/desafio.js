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
            console.log({ error: 1, mensaje: `El archivo no existe o esta vacio. Se creará uno para ser utilizado, o se utilizara el existente` })
        }
    }

    getAll() {
        if (this.datos.length === 0) return console.log({
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
            return prodId;
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
        }
        catch (e) {
            console.log(e.message);
        }
    }
}

const prueba = new Contenedor("vacio");
async function ejecutarPruebas() {
    const prod1 = await prueba.save('prod1', 222, "imagen1");
    const prod2 = await prueba.save('prod2', 222, "imagen2");
    const prod3 = await prueba.save('prod3', 222, "imagen3");
    const todos = await prueba.getAll();
    console.log(prod1);
    console.log(prod2);
    console.log(prod3);
    console.log(todos);
    const index = await prueba.getById(2);
    console.log(index);
    console.log(`La pelicula tiene el id ${await prueba.save("batman", 1250, "enlaces de la foto")}`);
    await prueba.deleteAll();
    await prueba.deleteById(1);
}

ejecutarPruebas();