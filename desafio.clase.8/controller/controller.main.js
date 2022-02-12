const Contenedor = require('../persistencia/contenedor')

const contenedor = new Contenedor("productos");

function obtenerPeliculas (req, res) {
    res.json(contenedor.getAll())
}

function obtenerPeliculaPorId (req, res) {
    const pelicula = contenedor.getById(+req.params.id)
    res.json(pelicula);
}

async function guardarPelicula (req, res) {
    const idPeliculaNueva = await contenedor.save(req.body);
    res.json(idPeliculaNueva)
}

async function modificarPelicula (req, res) {
    const dato = await contenedor.put(+req.params.id, req.body);
    res.json(dato);
}

async function eliminarPelicula (req, res) {
    const idPeliculaEliminada = await contenedor.deleteById(req.params.id);
    if (idPeliculaEliminada === req.params.id) {
        res.json({mensaje: `La pelicula ${idPeliculaEliminada} fue eliminada con éxito`})
    } else {
        res.json(idPeliculaEliminada);
    }
}

module.exports={obtenerPeliculas, obtenerPeliculaPorId, guardarPelicula, eliminarPelicula, modificarPelicula}