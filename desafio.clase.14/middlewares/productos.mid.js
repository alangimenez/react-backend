const fs = require('fs');

//se podria usar este mismo mid para validar id de carrito? pensar que el path podria venir por parametro (ver como enviar el path sin pisar los otros parametros)
function controlId(req, res, next) {
    const { id } = req.params;
    fs.readFile('./assets/productos.txt', 'utf-8', (err, data) => {
        if (err) throw err;
        const productos = JSON.parse(data);

        // validacion 1 (esta validacion podria eliminarse)
        if (id > +productos[productos.length - 1].id) return res.status(404).send(`<h1>El producto solicitado no se encuentra</h1>`)

        // validacion 2
        const filtro = (dato) => dato.id == id;
        const result = productos.findIndex(filtro);
        if (result == -1) return res.status(404).send(`<h1>El producto solicitado no se encuentra</h1>`)

        next();
    })
}

module.exports = { 
    controlId
}