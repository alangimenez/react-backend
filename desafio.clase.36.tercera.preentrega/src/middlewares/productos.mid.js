const fs = require('fs');
const { logger, errorLogger } = require('../config/config.log4js');

function controlProducto(req, res, next) {
    const { idProd } = req.params;
    fs.readFile('./assets/productos.txt', 'utf-8', (err, data) => {
        if (err) throw err;
        const productos = JSON.parse(data);

        const result = productos.findIndex(e => e.id === +idProd);
        if (result === -1) {
            errorLogger.error(`El producto solicitado no existe`);
            return res.status(404).json({ error: -5, message: `El producto solicitado no existe` });
        }

        next();
    })
}

// para endpoint POST producto
function validarProduct(req, res, next) {
    const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
    if (!nombre || !descripcion || !codigo || !foto || !precio || !stock) {
        errorLogger.error(`No ha completado todos los campos necesarios del producto`)
        return res.status(400).json({ error: -6, message: `No ha completado todos los campos necesarios del producto` })
    }
    next();
}

function controlPropProducto(req, res, next) {
    const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
    if (!nombre && !descripcion && !codigo && !foto && !precio && !stock) {
        errorLogger.error(`Las caracteristicas que se intentan actualizar del producto no existen`)
        return res.status(400).json({ error: -7, message: `Las caracteristicas que se intentan actualizar del producto no existen` })
    }
    next();
}

module.exports = {
    controlProducto,
    validarProduct,
    controlPropProducto,
}