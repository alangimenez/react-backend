const Contenedor = require('../persistencia/contenedor')

const contenedor = new Contenedor("nuevoarchivo");

function obtenerPeliculas(req, res) {
    res.json(contenedor.getAll())
}

function obtenerPeliculaRandom(req, res) {
    const random = parseInt(Math.random() * 5) + 1;
    if (!contenedor.getAll().length) return res.status(404).json({
        error: 2,
        mensaje: `El archivo no contiene información a mostrar`
    })
    const pelicula = contenedor.getAll().find(pelis => pelis.id === random);
    res.json(pelicula);
}

async function guardarPelicula(req, res) {
    const idPeliculaNueva = await contenedor.save(req.body);
    res.json({ mensaje: `La nueva pelicula tiene el id ${idPeliculaNueva}` })
}

async function eliminarPelicula(req, res) {
    const idPeliculaEliminada = await contenedor.deleteById(req.params.id);
    if (idPeliculaEliminada === req.params.id) {
        res.json({ mensaje: `La pelicula ${idPeliculaEliminada} fue eliminada con éxito` })
    } else {
        res.json(idPeliculaEliminada);
    }
}

module.exports = { obtenerPeliculas, obtenerPeliculaRandom, guardarPelicula, eliminarPelicula }