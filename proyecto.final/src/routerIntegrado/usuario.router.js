const express = require('express');
const router = express.Router();
const passport = require('../middlewares/passport');
const upload = require('../config/config.multer');
const { usuarioLogueado } = require('../middlewares/usuarios.mid');
const { UserController } = require('../controllerIntegrado/controller.usuario');
const user = new UserController();

// middlewares del router
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// endpoint para loguearse
router.post('/login',
    passport.authenticate('login', { failureRedirect: '/api/usuario/login-error' }),
    async (req, res) => user.login(req, res));

// endpoint para desloguearse
router.get('/logout', (req, res) => user.logout(req, res))

// endpoint para registrarse
router.post('/registro',
    passport.authenticate('registro', { failureRedirect: '/api/usuario/registro-error' }),
    (req, res) => user.registro(req, res))

// endpoint para renderizar pantalla de error de registro
router.get('/registro-error', (req, res) => user.registroError(req, res));

// endpoint para renderizar pantalla de error de login
router.get('/login-error', (req, res) => user.loginError(req, res));

// endpoint para ver mi perfil
router.get('/mi-perfil', (req, res) => user.perfil(req, res))

router.post('/perfil',
    [usuarioLogueado, upload.single('archivo')],
    (req, res) => user.avatar(req, res))

// endpoint para renderizar pantalla de login
router.get('/login', (req, res) => res.render('../views/login'));

// endpoint para renderizar pantalla de registro (ESTE ENDPOINT DEVUELVE UN TEMPLATE)
router.get('/registro', (req, res) => res.render('../views/registro'))

// lleva a la vista tabla de entregas anteriores, no debería estar
// router.get('/', async (req, res) => renderizarVista(req, res))

module.exports = router;