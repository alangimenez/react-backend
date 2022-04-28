const express = require('express');
const app = express();
const PORT = process.env.PORT;
const bodyParser = require('body-parser');
const routerProductos = require('./router/productos.router');
const routerCarrito = require('./router/carrito.router');
const routerUsuario = require('./router/usuario.router');
const { validarRuta } = require('./middlewares/middlewares');
const { engine } = require('express-handlebars');
const { logger, errorLogger} = require('./config/config.log4js');

const server = app.listen(PORT, () => {
    logger.info(`Servidor escuchando en puerto ${PORT}`);
}).on('error', (error => {
    errorLogger.error(error);
}));

// motor de plantillas
app.engine('handlebars', engine());
app.set('views', './views');
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// session
const session = require('express-session');
const MongoStore = require('connect-mongo');

const passport = require('./middlewares/passport');
app.use(session({
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
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/productos', routerProductos);
app.use('/api/carrito', routerCarrito);
app.use('/api/usuario', routerUsuario);
app.get('/', (req, res) => {res.redirect('/api/productos')})
app.use('*', validarRuta);

