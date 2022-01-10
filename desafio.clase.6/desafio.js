const fs = require('fs');
const express = require('express');
const app = express();

let name, objeto, objetoParseado;

class Contenedor {
    constructor(nombreDeArchivo) {
        name = nombreDeArchivo;
        objeto = fs.readFileSync(`${nombreDeArchivo}.txt`, `utf-8`);
        objetoParseado = JSON.parse(objeto);
    }
}

const prueba = new Contenedor("productos");

const server = app.listen(8080, () => {
    console.log(`Servidor activo y escuchando en puerto ${server.address().port}`)
})

app.get(`/productos`, (pet, res) => {
    res.send(objetoParseado);
})

app.get(`/productoRandom`, (pet, res) => {
    const random = parseInt(Math.random()*5)+1;
    const pelicula = objetoParseado.find(pelis => pelis.id == random);
    console.log(pelicula);
    res.send(pelicula);
})