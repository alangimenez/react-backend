const express = require('express');
const router = express.Router();
const fs = require('fs');
const {validarCarrito, validarDelete} = require('../middlewares/middlewares');

// crear un carrito (lee archivo, genera id y timestamp y lo postea)
router.post('/', (req, res) => {
    fs.readFile('./assets/carrito.txt', 'utf-8', (err, data) => {
        if (err) throw err;
        let carrito = JSON.parse(data);
        let idNuevo;
        carrito.length == 0 ? idNuevo = 1 : idNuevo = carrito.length + 1;
        const timestamp = Date.now();
        carrito.push({
            id: idNuevo,
            timestamp
        })
        fs.writeFile('./assets/carrito.txt', JSON.stringify(carrito), 'utf-8', (err) => {
            if (err) throw err;
            console.log(`El carrito ha sido incorporado con éxito`);
            res.json(`El carrito ${idNuevo} ha sido creado con éxito`)
        })
    })

})

// lee el archivo de carrito, revisa si el carrito existe, y lo elimina.
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    fs.readFile('./assets/carrito.txt', 'utf-8', (err, data) => {
        if (err) throw err;
        let carrito = JSON.parse(data);
        let cambios = false;
        if (id > carrito[carrito.length - 1].id) return res.status(404).json(`<h1>El carrito solicitado no existe</h1>`)
        let carritoPrevio = carrito;
        for (let i = 0; i < carrito.length; i++) {
            if (+carrito[i].id === +id) {
                const carritoEliminado = carrito.splice(i, 1);
                cambios = true;
                console.log(carrito);
            }
        }
        if (cambios == false) {
            return res.status(404).json(`<h1>El carrito solicitado no existe</h1>`)
        } else {
            fs.writeFile('./assets/carrito.txt', JSON.stringify(carrito), 'utf-8', (err) => {
                if (err) throw err;
                console.log(`El carrito id ${id} fue eliminado con éxito`);
                res.json(`El carrito id ${id} fue eliminado con éxito`)
            })
        }
    })
})

// se hacen validacion para saber si existe el carrito y el producto en middleware
// luego, una vez confirmados los datos, se implementa logica para agregar los productos
// en el carrito seleccionado, dependiendo si ya hay productos agregados o no
router.post('/:idCarr/productos/:idProd', validarCarrito, (req, res) => {
    const { idCarr, idProd } = req.params;
    const carritoPrevio = fs.readFileSync('./assets/carrito.txt', 'utf-8');
    let carrito = JSON.parse(carritoPrevio);
    const productosPrevio = fs.readFileSync('./assets/productos.txt', 'utf-8');
    const productos = JSON.parse(productosPrevio);

    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].id === +idCarr) {
            for (let j = 0; j < productos.length; j++) {
                if (+productos[j].id === +idProd) {
                    if (carrito[i].producto === undefined) {
                        carrito[i] = {
                            ...carrito[i],
                            producto: [productos[j]]
                        }
                        fs.writeFile('./assets/carrito.txt', JSON.stringify(carrito), 'utf-8', (err) => {
                            if (err) throw err;
                            console.log(`El producto ${idProd} fue incorporado con éxito al carrito ${idCarr}`);
                            return res.json(carrito);
                        })
                    } else {
                        carrito[i].producto.push(productos[j]);
                        fs.writeFile('./assets/carrito.txt', JSON.stringify(carrito), 'utf-8', (err) => {
                            if (err) throw err;
                            console.log(`El producto ${idProd} fue incorporado con éxito al carrito ${idCarr}`);
                            return res.json(carrito);
                        })
                    }
                }
            }
        }
    }
})

// lista los productos de un carrito, y devolvera error si el carrito no existe.
router.get('/:idCarr/productos', (req, res) => {
    const { idCarr } = req.params;
    fs.readFile('./assets/carrito.txt', 'utf-8', (err, data) => {
        if (err) throw err;
        let carrito = JSON.parse(data);
        if (idCarr > carrito[carrito.length - 1].id) return res.status(404).json(`<h1>El carrito solicitado no existe</h1>`)
        for (let i = 0; i < carrito.length; i++) {
            if (+carrito[i].id === +idCarr) {
                return res.json(carrito[i].producto)
            }
        }
        return res.status(404).json(`<h1>El carrito solicitado no existe</h1>`)
    })
})

// en middleware valida si existe el carrito y los productos a eliminar en el carrito,
// y una vez validado datos, logica para eliminar los productos del carrito
router.delete('/:idCarr/productos/:idProd', validarDelete, (req, res) => {

    const { idCarr, idProd } = req.params;
    const carritoPrevio = fs.readFileSync('./assets/carrito.txt', 'utf-8');
    const carrito = JSON.parse(carritoPrevio);

    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].id === +idCarr) {
            let productoDelCarrito = carrito[i].producto;
            for (let j = 0; j < productoDelCarrito.length; j++) {
                if (+productoDelCarrito[j].id === +idProd) {
                    const nuevosProductos = productoDelCarrito.splice(j, 1);
                    carrito[i].producto = productoDelCarrito;
                    fs.writeFile('./assets/carrito.txt', JSON.stringify(carrito), 'utf-8', (err) => {
                        if (err) throw err;
                        return res.json(`<h1>El producto ${idProd} fue eliminado con éxito del carrito ${idCarr}</h1><br>
                        ${carrito[i]}`)
                    })
                }
            }
        }
    }
})

module.exports = router;