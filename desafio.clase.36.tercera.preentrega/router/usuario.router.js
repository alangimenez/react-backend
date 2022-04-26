// express y router
const express = require('express');
const router = express.Router();
const passport = require('../middlewares/passport');
const {crearCarrito} = require('../controller/controller.carrito')

const {enviarMailRegistro} = require('../utils/nodemailer');

const { renderizarVista, productosRandom, logout, registro } = require('../controller/controller.usuario');

router.use(express.json());
router.use('/', express.static('public'));
router.use(express.urlencoded({ extended: true }));

router.get('/', async (req, res) => {
    if (req.user) {
        renderizarVista(req, res)
    } else {
        res.redirect('/api/usuario/login')
    }
})

router.post('/login',
    passport.authenticate('login', { failureRedirect: '/api/usuario/login-error' }),
    async (req, res) => {
        res.redirect('/api/productos');
    });

router.get('/login', (req, res) => res.render('../views/login'));

router.get('/registro', (req, res) => registro(req, res))

router.get('/logout', (req, res) => logout(req, res))

router.post('/registro',
    passport.authenticate('registro', { failureRedirect: '/api/usuario/registro-error' }),
    (req, res) => {
        enviarMailRegistro(req.body.username, req.body.firstname, req.body.direction, req.body.age, req.body.telephone);
        crearCarrito(req, res);
        res.redirect('/api/productos');
    })

router.get('/registro-error', (req, res) => res.render('registroError', { error: req.session.error }));

router.get('/login-error', (req, res) => res.render('loginError', { error: req.session.error }));

module.exports = router;