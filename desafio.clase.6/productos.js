const fs = require('fs');

const productos = [{
    id: 1,
    title: "matrix",
    price: 150,
    thumbnail: 'https://i.blogs.es/4b103d/the-matrix-online/840_560.jpeg'
},{
    id: 2,
    title: "las locuras de dick y jane",
    price: 250,
    thumbnail: 'https://static.wikia.nocookie.net/doblaje/images/9/97/Dick_y_Jane.jpg/revision/latest/top-crop/width/360/height/450?cb=20090915031557&path-prefix=es'
},{
    id: 3,
    title: "el cisne negro",
    price: 500,
    thumbnail: 'https://static.wikia.nocookie.net/cine/images/e/e4/Black_swan.jpg/revision/latest/top-crop/width/360/height/450?cb=20121107220839'
},{
    id: 4,
    title: "terminator 3",
    price: 300,
    thumbnail: 'https://i.blogs.es/80fa85/terminator-3-poster/1366_2000.jpg'
},{
    id: 5,
    title: "high school musical",
    price: 175,
    thumbnail: 'https://pics.filmaffinity.com/high_school_musical_hsm_tv-216429412-mmed.jpg'
}]

fs.writeFileSync(`productos.txt`, JSON.stringify(productos))