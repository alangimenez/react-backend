const res = require('express/lib/response');
const fs = require('fs');

function leerArchivo (path) {
    try {
        const informacion = JSON.parse(fs.readFileSync(path, 'utf-8'));
        return informacion; 
    }
    catch (e) {
        return res.status(404).json({error: -4, message: `El archivo especificado no existe o esta vacio`})
    }
}

function escribirArchivo (path, data) {
    fs.writeFile(path, JSON.stringify(data), 'utf-8', () => {
        console.log(`El archivo fue escrito con éxito`)
    })
}

module.exports = {
    leerArchivo, 
    escribirArchivo
}