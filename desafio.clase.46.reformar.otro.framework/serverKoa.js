const Koa = require('koa');
const koaBody = require('koa-body');

const app = new Koa();

app.use(koaBody());

let productos = require('./routerKoa/router.productos');
let carrito = require('./routerKoa/router.carrito')

app.use(productos.routes());
app.use(carrito.routes());

const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Server running in PORT ${PORT}`);
})
server.on('error', error => console.log(`Error en servidor KOA`, error))
