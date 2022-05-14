const { fnProductos, fnCarritos } = require('../persistencia/index');
const { enviarMailPedido } = require('../utils/nodemailer');
const { whatsapp, mensajeTexto } = require('../utils/twilio');
const { logger, errorLogger } = require('../config/config.log4js');

// retorna todos los carritos. Terminado el proyecto, ELIMINARLO porque no es parte de la consigna
async function verCarritos(req, res) {
    try {
        res.json(await fnCarritos().leerInfo());
    } catch (e) {
        return error(500, "controllerError", `El controlador ha tenido un error -> ` + e.message, res);
    }
}

// ver un carrito de un usuario en particular
async function verCarritoUsuario(req, res) {
    const carritoFiltrado = await fnCarritos().leerInfoPorId(req.params.idCarr);

    // response con JSON
    if (!carritoFiltrado) return res.status(404).json({error: -12, message: `carrito no encontrado`}) 
    res.status(200).json(carritoFiltrado);

    // response con template
    /* if (req.user) {
        res.render('../views/carrito', { productosEnCarrito: carritoFiltrado.productos, user: req.user.id, isActive: req.user.id, boton: "Cerrar sesión" });
    } else {
        // chequear esto, tecnicamente no deberia acceder al carrito si no esta logueado
        res.render('../views/loginError', { error: "Primero debe loguearse" });
    } */
}

// crea carrito, no devuelve nada
async function crearCarrito(req, res) {
    try {
        const lista = await fnCarritos().leerInfo();
        lista.length === 0 ? idNuevo = 1 : idNuevo = lista[lista.length - 1].id + 1;
        const carritoSubir = {
            id: idNuevo,
            user: req.body.username,
            fechaDeCreacion: Date.now(),
            total: 0
        }
        const nuevoCarrito = await fnCarritos().subirInfo(carritoSubir);
    } catch (e) {
        return error(500, "controllerError", `El controlador ha tenido un error -> ` + e.message, res);
    }
    
    // La respuesta no es necesaria, dado que el carrito solo se crea a traves de un registro de usuario
    // y lo importante es que devuelva los datos del usuario nuevo, y no los del carrito nuevo.
    // res.status(201).json(nuevoCarrito);
}

// elimina carrito, muestra array completo
async function eliminarCarrito(req, res) {
    try {
        const { idCarr } = req.params;
        const listadoActualizado = await fnCarritos().eliminarInfo(+idCarr)
        res.json(listadoActualizado);
    } catch (e) {
        return error(500, "controllerError", `El controlador ha tenido un error -> ` + e.message, res);
    }
}

// inserta productos en carrito, muestra el carrito seleccionado completo
async function prodAlCarrito(req, res) {
    try {
        const { idCarr, idProd } = req.params;
        const productoSeleccionado = await fnProductos().leerInfoPorId(idProd);
        const carritoSeleccionado = await fnCarritos().leerInfoPorId(idCarr);
        let carritoActualizado = await fnCarritos().actualizarProdEnCarrito(carritoSeleccionado, productoSeleccionado);
        carritoActualizado = await calculoTotalCarrito(carritoActualizado);
        res.json(carritoActualizado);
    } catch (e) {
        return error(500, "controllerError", `El controlador ha tenido un error -> ` + e.message, res);
    }
}

// lista todos los productos de un carrito
async function prodDelCarrito(req, res) {
    try {
        const { idCarr } = req.params;
        const carritoSeleccionado = await fnCarritos().leerInfoPorId(idCarr);
        res.status(200).json(carritoSeleccionado.productos);
    } catch (e) {
        return error(500, "controllerError", `El controlador ha tenido un error -> ` + e.message, res);
    }
}

// elimina productos del carrito, muestra listado de productos del carrito
async function elimProdDelCarrito(req, res) {
    try {
        const { idCarr, idProd } = req.params;
        const listadoCarritos = await fnCarritos().leerInfo();
        const carritoSeleccionado = listadoCarritos.find(e => e.user === idCarr);
        const prodEnCarrito = carritoSeleccionado.productos.find(e => e.id === +idProd);
        let carritoActualizado = await fnCarritos().eliminarProdEnCarrito(listadoCarritos, carritoSeleccionado, prodEnCarrito)
        carritoActualizado = await calculoTotalCarrito(carritoActualizado);
        res.status(201).json(carritoActualizado);
    } catch (e) {
        return error(500, "controllerError", `El controlador ha tenido un error -> ` + e.message, res);
    }
    
}

async function confirmarCompra(req, res) {
    try {
        const carrito = await fnCarritos().leerInfoPorId(req.params.idCarr);
        const productosConfirmados = carrito.productos;
        await enviarMailPedido(req.user.nombre, req.user.id, productosConfirmados);
        await whatsapp(req.user.telefono, req.user.nombre, req.user.id);
        await mensajeTexto(req.user.telefono, req.user.nombre);
        let resultado = await fnCarritos().vaciarCarrito(req.params.idCarr);
        resultado = await calculoTotalCarrito(resultado);
        const compra = {
            productos: productosConfirmados,
            total: carrito.total,
        }
        calculoTotalCarrito({user: carrito.user});
        return compra;
    } catch (e) {
        return error(500, "controllerError", `El controlador ha tenido un error -> ` + e.message, res);
    }
}

async function vaciarCarrito(req, res) {
    try {
        const cambio = await fnCarritos().vaciarCarrito(req.body.id);
        if (cambio.matchedCount === 0) return res.status(404).json({error: -13, message: `usuario no encontrado`});
        let carrito = await fnCarritos().leerInfoPorId(req.body.id);
        carrito = await calculoTotalCarrito(carrito);
        res.json(carrito).status(201);
    } catch (e) {
        return error(500, "controllerError", `El controlador ha tenido un error -> ` + e.message, res);
    }
}

async function modificarCantidadDeProdEnCarrito (req, res) {
    try {
        const { idCarr, idProd } = req.params;
        const { cantidad } = req.body;
        const listadoCarritos = await fnCarritos().leerInfo();
        const carritoSeleccionado = listadoCarritos.find(e => e.user === idCarr);
        const prodEnCarrito = carritoSeleccionado.productos.find(e => e.id === +idProd);
        prodEnCarrito.cantidad = cantidad;
        let listadoActualizado = await fnCarritos().actualizarCantidadDeProductos(idCarr, carritoSeleccionado, prodEnCarrito);
        listadoActualizado = await calculoTotalCarrito(listadoActualizado);
        res.status(201).json(listadoActualizado);
    } catch (e) {
        return error(500, "controllerError", `El controlador ha tenido un error -> ` + e.message, res);
    }
}

async function calculoTotalCarrito (carrito) {
    let total = 0;
    if (!carrito.productos) {
        total = 0;
    } else {
        for (let i = 0; i < carrito.productos.length; i++) {
            
            total = total + (carrito.productos[i].precio * carrito.productos[i].cantidad);
        }
    }
    return await fnCarritos().actualizarTotalCarrito(carrito.user, total);  
}

module.exports = {
    crearCarrito,
    eliminarCarrito,
    prodAlCarrito,
    prodDelCarrito,
    elimProdDelCarrito,
    confirmarCompra,
    verCarritos,
    verCarritoUsuario,
    vaciarCarrito,
    modificarCantidadDeProdEnCarrito
}