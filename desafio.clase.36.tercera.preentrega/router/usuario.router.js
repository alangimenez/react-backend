// express y router
const express = require('express');
const router = express.Router();
const passport = require('../middlewares/passport');

const email = require('../utils/nodemailer');

const { renderizarVista, productosRandom, logout, registro } = require('../controller/controller.usuario');

router.use(express.json());
router.use('/', express.static('public'));
router.use(express.urlencoded({ extended: true }));

// session
const session = require('express-session');
const MongoStore = require('connect-mongo');

router.use(session({
    name: 'my-session',
    secret: 'gatos',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
        ttl: 60,
    }),
    cookie: {
        maxAge: 600000,
    }
}));
router.use(passport.initialize());
router.use(passport.session());

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
        res.redirect('/api/usuario');
    });

router.get('/login', (req, res) => res.render('../views/login'));

router.get('/registro', (req, res) => registro(req, res))

router.get('/logout', (req, res) => logout(req, res))

router.post('/registro',
    passport.authenticate('registro', { failureRedirect: '/api/usuario/registro-error' }),
    (req, res) => {
        email();
        res.redirect('/api/usuario');
    })

router.get('/registro-error', (req, res) => res.render('registroError', { error: req.session.error }));

router.get('/login-error', (req, res) => res.render('loginError', { error: req.session.error }));

module.exports = router;