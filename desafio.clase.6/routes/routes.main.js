const express = require('express');
const router = express.Router();
const { obtenerPeliculas,
    obtenerPeliculaRandom,
    guardarPelicula,
    eliminarPelicula } = require('../controller/controller.main')

router.use(express.json());

router.get('/productos', (req, res) => obtenerPeliculas(req, res))

router.get(`/productoRandom`, (req, res) => obtenerPeliculaRandom(req, res))

router.post('/productos', (req, res) => guardarPelicula(req, res))

router.delete('/productos/:id', (req, res) => eliminarPelicula(req, res))

module.exports = { router };