const express = require('express');
const app = express();
const productos = require('./assets/productos.js');
const PORT = process.env.PORT || 8080;
const bodyParser = require('body-parser');
const rutas = require('./router/router.main');
const {engine} = require('express-handlebars');

// conexión server y error
const server = app.listen(PORT, () => {
    console.log(`Servidor funcionando en puerto ${PORT}`);
}).on('error', (error => {
    console.log(error.message);
}))

// middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use('/',express.static('public'));

// motor de plantillas
app.engine('handlebars', engine());
app.set('views', './views');
app.set('view engine', 'handlebars')

// rutas y acciones (router )

app.use('/api/productos', rutas);