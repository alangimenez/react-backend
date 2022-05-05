const config = require('./config/config.process.env');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routerProductos = require('./router/productos.router');
const routerCarrito = require('./router/carrito.router');
const routerProcess = require('./router/process.router');
const routerGzip = require('./router/gzip.router');
const { validarRuta } = require('./middlewares/middlewares');
const { engine } = require('express-handlebars');
const { logger, errorLogger } = require('./config/log4js');

// motor de plantillas
app.set('views', './views');
app.set('view engine', 'handlebars');
app.engine('handlebars', engine());

// inicio servidor
const server = app.listen(config.PORT, () => {
    logger.info(`Servidor escuchando en puerto ${config.PORT}`);
}).on('error', (error => {
    errorLogger.error(error);
}));

// middlewares generales
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// rutas
app.use('/api/productos', routerProductos);
app.use('/api/carrito', routerCarrito);
app.use('/', routerProcess);
app.use('/', routerGzip);
app.get('/', (req, res) => res.redirect('/info'));
app.use('*', validarRuta);