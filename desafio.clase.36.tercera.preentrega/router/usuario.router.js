const express = require('express');
const router = express.Router();
const passport = require('../middlewares/passport');
const { renderizarVista, perfil, logout, registro } = require('../controller/controller.usuario');

router.use(express.json());
router.use('/', express.static('public'));
router.use(express.urlencoded({ extended: true }));

// lleva a la vista tabla de entregas anteriores, no debería estar
router.get('/', async (req, res) => renderizarVista(req, res))

// endpoint para loguearse
router.post('/login',
    passport.authenticate('login', { failureRedirect: '/api/usuario/login-error' }),
    async (req, res) => {
        res.redirect('/api/productos');
    });

// endpoint para renderizar pantalla de login
router.get('/login', (req, res) => res.render('../views/login'));

// endpoint para renderizar pantalla de registro
router.get('/registro', (req, res) => registro(req, res))

// endpoint para renderizar pantalla de logout
router.get('/logout', (req, res) => logout(req, res))

// endpoint para registrarse
router.post('/registro',
    passport.authenticate('registro', { failureRedirect: '/api/usuario/registro-error' }),
    (req, res) => registro (req, res))

// endpoint para renderizar pantalla de error de registro
router.get('/registro-error', (req, res) => res.render('registroError', { error: req.session.error }));

// endpoint para renderizar pantalla de error de login
router.get('/login-error', (req, res) => res.render('loginError', { error: req.session.error }));

// endpoint para ver mi perfil
router.get('/:idUser/mi-perfil', (req, res) => perfil(req, res))

module.exports = router;