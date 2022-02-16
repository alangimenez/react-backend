const Contenedor = require('../persistencia/contenedor')

const contenedor = new Contenedor("productos");

function obtenerProductos (req, res) {
    res.json(contenedor.getAll())
}

function obtenerProductoPorId (req, res) {
    const producto = contenedor.getById(+req.params.id)
    res.json(producto);
}

async function guardarProducto (req, res) {
    const idProductoNuevo = await contenedor.save(req.body);
    res.json(idProductoNuevo)
}

async function modificarProducto (req, res) {
    const dato = await contenedor.put(+req.params.id, req.body);
    res.json(dato);
}

async function eliminarProducto (req, res) {
    const idProductoEliminado = await contenedor.deleteById(req.params.id);
    if (idProductoEliminado === req.params.id) {
        res.json({mensaje: `La pelicula ${idProductoEliminado} fue eliminada con éxito`})
    } else {
        res.json(idProductoEliminado);
    }
}

module.exports={obtenerProductos, obtenerProductoPorId, guardarProducto, modificarProducto, eliminarProducto}