const express = require('express');
const app = express();

const { router: mainRoutes } = require('./routes/routes.main.js')


const server = app.listen(8080, () => {
    console.log(`Servidor activo y escuchando en puerto ${server.address().port}`)
})

app.use('/api/productos', mainRoutes)
app.use('*', (req, res) => res.status(404).json({error: 4, mensaje: 'La ruta solicitada no ha sido implementada'}))