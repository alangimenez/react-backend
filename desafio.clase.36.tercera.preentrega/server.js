const express = require('express');
const app = express();
const PORT = process.env.PORT;
const bodyParser = require('body-parser');
const routerProductos = require('./router/productos.router');
const routerCarrito = require('./router/carrito.router');
const routerUsuario = require('./router/usuario.router');
const { validarRuta } = require('./middlewares/middlewares');
const { engine } = require('express-handlebars');

const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
}).on('error', (error => {
    console.log(error);
}));

// motor de plantillas
app.engine('handlebars', engine());
app.set('views', './views');
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api/productos', routerProductos);
app.use('/api/carrito', routerCarrito);
app.use('/api/usuario', routerUsuario);
app.use('*', validarRuta);