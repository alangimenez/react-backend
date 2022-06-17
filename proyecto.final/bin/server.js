const config = require('../src/config/config.process.env');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routerProductos = require('../src/router/productos.router');
const routerCarrito = require('../src/router/carrito.router');
const routerUsuario = require('../src/router/usuario.router');
const routerOrdenes = require('../src/router/ordenes.router');
const { validarRuta } = require('../src/middlewares/middlewares');
const { engine } = require('express-handlebars');
const { logger, errorLogger} = require('../src/config/config.log4js');
const cluster = require('cluster');
const os = require('os');

// SERVER ORIGINAL SIN FORK NI CLUSTER
/* const server = app.listen(config.PORT, () => {
    logger.info(`Servidor escuchando en puerto ${config.PORT}`);
}).on('error', (error => {
    errorLogger.error(error);
})); */

// SERVER CON CLUSTER Y FORK
if (config.MODE === "CLUSTER") {
    if (cluster.isMaster) {
        logger.info(`El proceso primario es ${process.pid}`);

        const workers = os.cpus().length;
        logger.info(`Numero de workers = ${workers}`);

        for (let i = 0; i < workers; i++) cluster.fork();

        cluster.on('exit', (worker) => {
            logger.info(`Worker ${worker.process.pid} se cerró`)
        })
    } else {
        const server = app.listen(config.PORT, () => {
            logger.info(`Servidor corriendo en ${config.PORT}`)
        })
    }
} else {
    const server = app.listen(config.PORT, () => {
        logger.info(`Servidor escuchando en el puerto ${config.PORT} en modo ${config.MODE}`);
    }).on('error', (error => {
        errorLogger.error(error);
    }));
}

// motor de plantillas
app.engine('handlebars', engine());
app.set('views', './src/views');
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// session
const session = require('express-session');
const MongoStore = require('connect-mongo');

const passport = require('../src/middlewares/passport');
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
        maxAge: +process.env.MAX_AGE_SESSION * 60000,
    }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('./public'));

app.use('/api/productos', routerProductos);
app.use('/api/carrito', routerCarrito);
app.use('/api/usuario', routerUsuario);
app.use('/api/ordenes', routerOrdenes);
app.get('/', (req, res) => {res.redirect('/api/productos')})
app.use('*', validarRuta);

