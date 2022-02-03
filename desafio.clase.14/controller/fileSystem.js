const fs = require('fs');

function leerArchivo (path) {
    const informacion = JSON.parse(fs.readFileSync(path, 'utf-8'));
    return informacion; 
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