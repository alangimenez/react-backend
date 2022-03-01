const faker = require('faker');

const { commerce, datatype, image } = faker;

const generarDatosRandom = () => {
    let datosRandom = [];
    for (let i = 0; i < 5; i++) {
        const nuevoProducto = {
            nombre: commerce.productName(),
            descripcion: commerce.productDescription(),
            stock: datatype.number({ min: 10, max: 100 }),
            precio: datatype.number({ min: 10, max: 100, precision: 0.01 }),
            foto: image.business(100, 100, true)
        }
        datosRandom.push(nuevoProducto);
    }
    return datosRandom;
}

module.exports = {
    generarDatosRandom,
}