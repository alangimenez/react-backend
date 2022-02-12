const express = require('express');
const router = express.Router();
const { obtenerPeliculas,
    obtenerPeliculaPorId,
    guardarPelicula,
    modificarPelicula,
    eliminarPelicula } = require('../controller/controller.main')

router.use(express.json());

router.get('/', (req, res) => obtenerPeliculas(req, res)) 

router.get('/:id', (req, res) => obtenerPeliculaPorId(req, res))

router.post('/', (req, res) => guardarPelicula(req, res))

router.put('/:id', (req, res) => modificarPelicula(req, res) )

router.delete('/:id', (req, res) => eliminarPelicula(req, res))

module.exports = { router };