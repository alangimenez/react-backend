const express = require('express');
const router = express.Router();
const { validarAdmin, validarArchivo } = require('../middlewares/middlewares');
const { controlId, validarProduct, controlProducto } = require('../middlewares/productos.mid')
const { obtenerProductos,
    obtenerProductoPorId,
    eliminarProducto,
    subirProducto,
    modificarProducto } = require('../controller/controller.productos');


router.get('/', validarArchivo, obtenerProductos) //ok

// si el producto no existe, devuelve 404
router.get('/:id', [validarArchivo, controlId], obtenerProductoPorId) //ok

// controla si el producto existe. Si existe, lo elimina. Si ya fue eliminado, devolvera 404.
// dependera del valor de admin si se puede acceder o no
router.delete('/:id', [validarAdmin, validarArchivo, controlId], eliminarProducto) //ok

// sube nuevo producto y lo muestra. Dependera del valor de admin si se puede acceder o no.
router.post('/', [validarAdmin, validarArchivo, validarProduct], subirProducto) //ok, ver punto 1) en anotaciones en cuaderno

// esto modifica el valor de un producto dependiendo de lo que se haya modificado. 
// Dependera del valor de admin si se puede agregar o no.
router.put('/:id', [validarAdmin, validarArchivo, controlId, controlProducto], modificarProducto) //ok, ver si filtro se agrega a class crud

module.exports = router;