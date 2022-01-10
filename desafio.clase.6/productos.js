const fs = require('fs');

const productos = [{
    id: 1,
    name: "matrix",
    genre: "ciencia ficcion"
},{
    id: 2,
    name: "las locuras de dick y jane",
    genre: "comedia"
},{
    id: 3,
    name: "el cisne negro",
    genre: "drama"
},{
    id: 4,
    name: "terminator 3",
    genre: "accion"
},{
    id: 5,
    name: "high school musical",
    genre: "musical"
}]

fs.writeFileSync(`productos.txt`, JSON.stringify(productos))