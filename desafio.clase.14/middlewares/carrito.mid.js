const fs = require('fs');
const { leerArchivo, escribirArchivo } = require('../controller/fileSystem');

//se podria usar este mismo mid para validar id de carrito? pensar que el path podria venir por parametro (ver como enviar el path sin pisar los otros parametros)
function controlId(req, res, next) {
    const { idCarr } = req.params;

    const carrito = leerArchivo('./assets/carrito.txt');

    // validacion 1 (esta validacion podria eliminarse)
    if (idCarr > +carrito[carrito.length - 1].id) return res.status(404).send(`<h1>El carrito solicitado no se encuentra</h1>`)

    // validacion 2
    const filtro = (dato) => dato.id == idCarr;
    const result = carrito.findIndex(filtro);
    if (result == -1) return res.status(404).send(`<h1>El carrito solicitado no se encuentra</h1>`)

    next();

}

module.exports = {
    controlId
}