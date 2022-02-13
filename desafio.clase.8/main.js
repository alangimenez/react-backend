const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

const { router: mainRoutes } = require('./routes/routes.main.js')


const server = app.listen(PORT, () => {
    console.log(`Servidor activo y escuchando en puerto ${PORT}`)
})

app.use(express.static('./public'))
app.use('/api/productos', mainRoutes)
app.use('*', (req, res) => res.status(404).json({error: 4, mensaje: 'La ruta solicitada no ha sido implementada'}))