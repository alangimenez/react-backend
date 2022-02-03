const fs = require('fs');

const productos = [
    {id: 1, codigo: 1000, nombre: '50 principios de la ciencia de datos', descripcion: 'Computación y sistemas', precio: '1795', foto: 'https://www.tematika.com/media/catalog/Ilhsa/Imagenes/687746.jpg', stock: '50', timestamp: '1642792607973'},
    {id: 2, codigo: 1001, nombre: 'Computación basica para adultos', descripcion: 'Computación y sistemas', precio: '1759', foto: 'https://www.tematika.com/media/catalog/Ilhsa/Imagenes/632387.jpg', stock: '50', timestamp: '1642792607974'},
    {id: 3, codigo: 1002, nombre: 'La Guia del Hardware', descripcion: 'Computación y sistemas', precio: '1690', foto: 'https://www.tematika.com/media/catalog/Ilhsa/Imagenes/668568.jpg', stock: '50', timestamp: '1642792607975'},
    {id: 4, codigo: 1003, nombre: 'Redes informaticas', descripcion: 'Computación y sistemas', precio: '1690', foto: 'https://www.tematika.com/media/catalog/Ilhsa/Imagenes/671001.jpg', stock: '50', timestamp: '1642792607976'},
    {id: 5, codigo: 1004, nombre: 'Creacion de publicaciones digitales', descripcion: 'Computación y sistemas', precio: '1190', foto: 'https://www.tematika.com/media/catalog/Ilhsa/Imagenes/595680.jpg', stock: '50', timestamp: '1642792607977'},
]

fs.writeFileSync('./productos.txt', JSON.stringify(productos), 'utf-8');