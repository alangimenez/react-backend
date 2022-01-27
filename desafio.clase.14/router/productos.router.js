const express = require('express');
const router = express.Router();
const fs = require('fs');
let productos = [];
const { validarAdmin } = require('../middlewares/middlewares')

router.get('/', (req, res) => {
    fs.readFile('./assets/productos.txt', 'utf-8', (err, data) => {
        if (err) throw err;
        res.json(JSON.parse(data))
    })
})

// si el producto no existe, devuelve 404
router.get('/:id', (req, res) => {
    const { id } = req.params;
    fs.readFile('./assets/productos.txt', 'utf-8', (err, data) => {
        if (err) throw err;
        productos = JSON.parse(data);
        if (id > +productos[productos.length - 1].id) return res.status(404).send(`<h1>El producto solicitado da error</h1>`)
        for (let i = 0; i < +productos.length; i++) {
            if (productos[i].id.toString() === id) {
                return res.json(productos[i])
            }
        }
        return res.status(404).send(`<h1>El producto solicitado no se encuentra</h1>`)

    })
})

// controla si el producto existe. Si existe, lo elimina. Si ya fue eliminado, devolvera 404.
// dependera del valor de admin si se puede acceder o no
router.delete('/:id', validarAdmin, (req, res) => {
    const { id } = req.params;
    const productos = JSON.parse(fs.readFileSync('./assets/productos.txt', 'utf-8'));
    if (id > productos.length) return res.status(404).send(`<h1>El producto solicitado no se encuentra</h1>`);
    for (let i = 0; i < productos.length; i++) {
        if (+productos[i].id === +id) {
            const nuevaListaProductos = productos.splice(i, 1)
            fs.writeFile('./assets/productos.txt', JSON.stringify(productos), 'utf-8', (err) => {
                if (err) throw err;
                console.log(`El producto ${id} fue eliminado con éxito`);
            })
            return res.json(productos)
        }

    }
    res.status(404).send(`<h1>El producto solicitado no se encuentra</h1>`);
})

// sube nuevo producto y lo muestra. Dependera del valor de admin si se puede acceder o no.
router.post('/', validarAdmin, (req, res) => {
    const timestamp = Date.now();
    const ultimoId = productos[productos.length - 1].id;
    const { nombre, descripcion, codigo, href, precio, stock } = req.body;
    const nuevoProducto = {
        id: +ultimoId + 1,
        timestamp,
        nombre,
        descripcion,
        codigo,
        href,
        precio,
        stock
    }
    productos.push(nuevoProducto);
    fs.writeFile('./assets/productos.txt', JSON.stringify(productos), 'utf-8', (err) => {
        if (err) throw err;
        console.log(`El producto fue agregado con éxito. Posee el id ${productos[productos.length - 1].id}.`)
    })
    res.json(nuevoProducto);
})

// esto modifica el valor de un producto dependiendo de lo que se haya modificado. 
// Dependera del valor de admin si se puede agregar o no.
router.put('/:id', validarAdmin,  (req, res) => {
    const { id } = req.params;
    const { nombre, autor, descripcion, codigo, href, precio, stock } = req.body;
    productos = JSON.parse(fs.readFileSync('./assets/productos.txt', 'utf-8'))
    if (id > +productos[productos.length - 1].id) return res.status(404).send(`<h1>El producto solicitado da error</h1>`)
    for (let i = 0; i < productos.length; i++) {
        if (+productos[i].id === +id) {
            if (nombre) productos[i].nombre = nombre;
            if (autor) productos[i].autor = autor;
            if (descripcion) productos[i].descripcion = descripcion;
            if (codigo) productos[i].codigo = codigo;
            if (precio) productos[i].precio = precio;
            if (href) productos[i].href = href;
            if (stock) productos[i].href = stock;
            res.json(productos[i]);
        }
    }
    fs.writeFile('./assets/productos.txt', JSON.stringify(productos), 'utf-8', (err) => {
        if (err) throw err;
        console.log(`Los cambios fueros introducidos con éxito en el producto ${id}`)
    })
})

module.exports = router;