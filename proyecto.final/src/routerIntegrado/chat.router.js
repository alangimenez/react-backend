const express = require('express');
const router = express.Router();
const { CartMid } = require('../middlewares/carrito.mid');
const cartMid = new CartMid();

// poder cargar el chat
router.get('/',
    cartMid.validarSesion,
    async (req, res) => res.render('../views/chat', {
        usuario: req.session.user.id,
        title: "Chat de soporte",
        isActive: req.session.user.id
    }));

module.exports = router;