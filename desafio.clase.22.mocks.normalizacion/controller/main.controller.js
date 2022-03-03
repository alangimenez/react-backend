const { generarDatosRandom } = require('../utils/faker');

const productosRandom = (req, res) => {
    try {
        const datosFaker = generarDatosRandom();
        res.json(datosFaker);
    } catch (e) {
        console.log(e.message)
    }
}

const renderizarVista = (req, res) => {
    {
        try {
            res.render('../public/table');
        }
        catch (e) {
            console.log(e.message);
        }
    }
}

module.exports = {
    productosRandom, 
    renderizarVista
}