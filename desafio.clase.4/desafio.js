const fs = require('fs');

let name, objeto, objetoParseado;

class Contenedor {
    constructor(nombreDeArchivo) {
        name = nombreDeArchivo;
        objeto = fs.readFileSync(`${nombreDeArchivo}.txt`, `utf-8`);
        objetoParseado = JSON.parse(objeto);
    }

    getAll() {
        console.log(objetoParseado);
    }

    getById(number) {
        if (number >= objetoParseado.length) {
            return console.log("El objeto pedido no existe")
        }
        console.log(objetoParseado[number]);
    }

    save(title, price) {
        objetoParseado.push({
            title: title,
            price: price,
            id: objetoParseado.length,
        })
        fs.writeFileSync(`${name}.txt`, JSON.stringify(objetoParseado, null, 1))
        console.log(objetoParseado)
    }

    deleteAll() {
        fs.writeFileSync(`${name}.txt`, "")
    }

    deleteById (number) {
        objetoParseado.splice(number, 1);
        fs.writeFileSync(`${name}.txt`, JSON.stringify(objetoParseado, null, 1))
    }
}

const prueba = new Contenedor("objeto");
console.log(prueba.getAll());
console.log(prueba.getById(2));
console.log(prueba.save("suits", 350));
prueba.deleteAll();
prueba.deleteById(0);