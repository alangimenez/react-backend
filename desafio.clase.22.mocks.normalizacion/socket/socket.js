const { verifyTable } = require('../persistencia/scripts');
const { baseDeDatos } = require('../persistencia/index');
const { conexionMensajes, conexionProductos } = require('../persistencia/index')
const { normalizarMensaje } = require('../utils/normalizr')
const util = require('util');

module.exports = function (server) {
    const io = require("socket.io")(server);
    io.on('connection', async (socket) => {

        // conexión inicial
        await verifyTable();
        const chatNormalizar = await baseDeDatos(conexionMensajes.type, conexionMensajes.nameTable, conexionMensajes.info).readTable();
        const chatNormalizado = normalizarMensaje(chatNormalizar);
        io.sockets.emit('mensajeParaCliente', chatNormalizado);
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
            // ACA DEBO NORMALIZAR LA INFORMACION
            await baseDeDatos(conexionMensajes.type, conexionMensajes.nameTable, conexionMensajes.info).writeTable(dato);
            const chat = await baseDeDatos(conexionMensajes.type, conexionMensajes.nameTable, conexionMensajes.info).readTable();
            const chatNormalizado = normalizarMensaje(chat);
            io.sockets.emit('mensajeParaCliente', chatNormalizado);
        })
    })
}