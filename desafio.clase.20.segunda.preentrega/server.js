const express = require('express');
const app = express();
const PORT = process.env.PORT;
const bodyParser = require('body-parser');
const routerProductos = require('./router/productos.router');
const routerCarrito = require('./router/carrito.router');
const { validarRuta } = require('./middlewares/middlewares');

const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
}).on('error', (error => {
    console.log(error);
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api/productos', routerProductos);
app.use('/api/carrito', routerCarrito);
app.use('*', validarRuta);