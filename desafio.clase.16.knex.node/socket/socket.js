const { verifyTable } = require('../persistencia/scripts');
const { baseDeDatos } = require('../persistencia/index');
const { conexionMensajes, conexionProductos } = require('../persistencia/index')

module.exports = function (server) {
    const io = require("socket.io")(server);
    io.on('connection', async (socket) => {

        // conexión inicial
        await verifyTable();
        const chat = await baseDeDatos(conexionMensajes.type, conexionMensajes.nameTable, conexionMensajes.info).readTable();
        io.sockets.emit('mensajeParaCliente', chat);
        const nuevoListado = await baseDeDatos(conexionProductos.type, conexionProductos.nameTable, conexionProductos.info).readTable();
        io.sockets.emit('productosActualizado', nuevoListado)
        
        //producto nuevo
        socket.on('productoNuevo', async (nuevoProducto) => {
            if (nuevoProducto != undefined) {
                await baseDeDatos(conexionProductos.type, conexionProductos.nameTable, conexionProductos.info).writeTable(nuevoProducto);
            }
            const nuevoListado = await baseDeDatos(conexionProductos.type, conexionProductos.nameTable, conexionProductos.info).readTable();
            io.sockets.emit('productosActualizado', nuevoListado)
        })

        //mensaje nuevo
        socket.on('nuevoMensaje', async (dato) => {
            await baseDeDatos(conexionMensajes.type, conexionMensajes.nameTable, conexionMensajes.info).writeTable(dato);
            const chat = await baseDeDatos(conexionMensajes.type, conexionMensajes.nameTable, conexionMensajes.info).readTable();
            io.sockets.emit('mensajeParaCliente', chat);
        })
    })
}