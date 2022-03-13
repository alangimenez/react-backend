// express y router
const express = require('express');
const router = express.Router();
const passport = require('../middlewares/passport');

const { renderizarVista, productosRandom, login, logout, registro } = require('../controller/main.controller');

router.use(express.json());
router.use('/', express.static('public'));
router.use(express.urlencoded({ extended: true }));

// session
const session = require('express-session');
const MongoStore = require('connect-mongo');
const { cookie } = require('express/lib/response');

router.use(session({
    name: 'my-session',
    secret: 'top-secret-51',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
        ttl: 60,
    }),
    cookie: {
        maxAge: 60000,
    }
}));
router.use(passport.initialize());
router.use(passport.session());

router.get('/', async (req, res) => {
    if (req.user) {
        renderizarVista(req, res)
    } else {
        res.redirect('/login')
    }
})

router.get('/api/productos-test', async (req, res) => productosRandom(req, res))

router.post('/login',
    passport.authenticate('login', { failureRedirect: '/login-error' }),
    async (req, res) => {
        res.redirect('/');
    });

router.get('/profile', async (req, res) => {
    const user = await req.session.user;
    res.json(user);
})

router.get('/login', (req, res) => res.render('../views/login'));

router.get('/logout', (req, res) => logout(req, res))

router.get('/registro', (req, res) => registro(req, res))

router.post('/registro',
    passport.authenticate('registro', { failureRedirect: '/registro-error' }),
    (req, res) => {
        res.redirect('/');
    })

router.get('/registro-error', (req, res) => res.render('registroError', {error: req.session.error}));

router.get('/login-error', (req, res) => res.render('loginError', { error: req.session.error }));

module.exports = { router };