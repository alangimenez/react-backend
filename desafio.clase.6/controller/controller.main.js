const Contenedor = require('../persistencia/contenedor')

const contenedor = new Contenedor("nuevoarchivo");

function obtenerProductos(req, res) {
    res.json(contenedor.getAll())
}

function obtenerProductosRandom(req, res) {
    const random = parseInt(Math.random() * 5) + 1;
    if (!contenedor.getAll().length) return res.status(404).json({
        error: 2,
        mensaje: `El archivo no contiene información a mostrar`
    })
    const producto = contenedor.getAll().find(producto => producto.id === random);
    res.json(producto);
}

async function guardarProducto(req, res) {
    const idProductoNuevo = await contenedor.save(req.body);
    res.json({ mensaje: `El nuevo producto tiene el id ${idProductoNuevo}` })
}

async function eliminarProducto(req, res) {
    const idProductoEliminado = await contenedor.deleteById(req.params.id);
    if (idProductoEliminado === req.params.id) {
        res.json({ mensaje: `La pelicula ${idProductoEliminado} fue eliminada con éxito` })
    } else {
        res.json(idProductoEliminado);
    }
}

module.exports = { obtenerProductos, obtenerProductosRandom, guardarProducto, eliminarProducto }