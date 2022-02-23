const express = require('express');
const router = express.Router();
const { validarAdmin, validarArchivo } = require('../middlewares/middlewares');
const { controlProducto, validarProduct, controlPropProducto } = require('../middlewares/productos.mid')
const { obtenerProductos,
    obtenerProductoPorId,
    eliminarProducto,
    subirProducto,
    modificarProducto } = require('../controller/controller.productos');

// obtiene array de productos
router.get('/', validarArchivo, obtenerProductos)

// obtiene un producto en especifico
router.get('/:idProd', [validarArchivo, controlProducto], obtenerProductoPorId) 

// elimina un producto
router.delete('/:idProd', [validarAdmin, validarArchivo, controlProducto], eliminarProducto)

// sube un nuevo producto
router.post('/', [validarAdmin, validarArchivo, validarProduct], subirProducto)

// actualiza datos de producto (actualiza el timestamp si o si)
router.put('/:idProd', [validarAdmin, validarArchivo, controlProducto, controlPropProducto], modificarProducto)

module.exports = router;