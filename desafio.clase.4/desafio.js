const fs = require('fs');
const fsPromises = require('fs').promises;

class Contenedor {
    constructor(nombreDeArchivo) {
        this.name = nombreDeArchivo;
    }

    async getAll() {
        try {
            const datos = JSON.parse(await fs.promises.readFile(`${this.name}.txt`, `utf-8`));
            console.log(datos);
        }
        catch (e) {
            console.log(e.message);
        }
    }

    async getById(number) {
        try {
            const info = JSON.parse(await fs.promises.readFile(`${this.name}.txt`, `utf-8`));
            const filtro = (dato) => +dato.id === number;
            const resultado = info.findIndex(filtro);
            if (resultado < 0) return console.log(`La pelicula ${number} no existe`);
            console.log(info[resultado]);
        }
        catch (e) {
            console.log(e.message);
        }
    }

    async save(title, price, thumbnail) {
        try {
            let idNuevo;
            let info = await fs.promises.readFile(`${this.name}.txt`, `utf-8`);
            info === "" ? info = [] : info = JSON.parse(info); // por si el txt esta completamente vacio
            info.length === 0 ? idNuevo = 1 : idNuevo = info[info.length - 1].id + 1
            info.push({
                title: title,
                price: price,
                thumbnail: thumbnail,
                id: idNuevo,
            })
            await fs.promises.writeFile(`${this.name}.txt`, JSON.stringify(info))
            console.log(info);
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
            const info = JSON.parse(await fs.promises.readFile(`${this.name}.txt`, `utf-8`));
            const filtro = (dato) => +dato.id === number;
            const resultado = info.findIndex(filtro);
            if (resultado < 0) return console.log(`La pelicula ${number} no existe`);
            info.splice(resultado, 1);
            await fs.promises.writeFile(`${this.name}.txt`, JSON.stringify(info))
            console.log(`El objeto ${number} fue eliminado con éxito`);    
        }
        catch (e) {
            console.log(e.message);
        }
    }
}

const prueba = new Contenedor("nada");
async function ejecutarPruebas() {
    // await prueba.getAll();
    // await prueba.getById(3);
    await prueba.save("batman", 1500, "enlaces de la foto");
    // await prueba.deleteAll();
    // await prueba.deleteById(2);
}

ejecutarPruebas();
