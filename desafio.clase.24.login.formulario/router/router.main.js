// express y router
const express = require('express');
const router = express.Router();

const { renderizarVista, productosRandom, login, logout } = require('../controller/main.controller');

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
    rolling: true, // esta propiedad hace que se reinicie el tiempo de expiracion
    store: MongoStore.create({
        mongoUrl: `mongodb+srv://leonel654321:<password>@coderhouse.7epn5.mongodb.net/myThirdDatabase?retryWrites=true&w=majority`,
        ttl: 60,
    }),
    cookie: {
        maxAge: 60000,
    }
}));

router.get('/', async (req, res) => {
    if (req.session.user) {
        renderizarVista(req, res)
    } else {
        res.redirect('/login')
    }
})

router.get('/api/productos-test', async (req, res) => productosRandom(req, res))

router.post('/login', async (req, res) => {
    const { user } = req.body;
    req.session.user = user;
    res.redirect('/');
});

router.get('/profile', async (req, res) => {
    const user = await req.session.user;
    res.json(user);
})



module.exports = { router };