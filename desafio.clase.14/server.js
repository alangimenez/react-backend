const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const bodyParser = require('body-parser');
const fs = require('fs');
const routerProductos = require('./router/productos.router');
const routerCarrito = require('./router/carrito.router');
/* const { productos } = require('./assets/productos'); */

let productos;
const productoPrevio = fs.readFile('./assets/productos.txt', 'utf-8', (err, data) => {
    if (err) throw err;
    productos = JSON.parse(data);
})

const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use('/productos', routerProductos);
app.use('/carrito', routerCarrito);