const fs = require('fs');

//se podria usar este mismo mid para validar id de carrito? pensar que el path podria venir por parametro (ver como enviar el path sin pisar los otros parametros)
function controlId(req, res, next) {
    const { id } = req.params;
    fs.readFile('./assets/productos.txt', 'utf-8', (err, data) => {
        if (err) throw err;
        const productos = JSON.parse(data);

        // validacion 1 (esta validacion podria eliminarse)
        if (id > +productos[productos.length - 1].id) return res.status(404).send({ error: -5, message: `El producto solicitado no existe` })

        // validacion 2
        const filtro = (dato) => dato.id === +id;
        const result = productos.findIndex(filtro);
        if (result == -1) return res.status(404).send({ error: -5, message: `El producto solicitado no existe` })

        next();
    })
}

function validarProduct(req, res, next) {
    const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
    if (!nombre || !descripcion || !codigo || !foto || !precio || !stock) return (
        res.status(400).json({ error: -6, message: `No ha completado todos los campos necesarios del producto` })
    )
    next();
}

function controlProducto (req, res, next) {
    const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
    if (!nombre && !descripcion && !codigo && !foto && !precio && !stock) return (
        res.status(400).json({ error: -7, message: `Las caracteristicas que se intentan actualizar del producto no existen` })
    )
    next();
}

module.exports = { controlId, validarProduct, controlProducto }