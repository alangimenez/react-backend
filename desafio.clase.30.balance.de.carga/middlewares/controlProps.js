function controlProps (objeto) {
    if (!objeto.nombre || !objeto.descripcion || !objeto.codigo || !objeto.foto || !objeto.precio || !objeto.stock) return (
        { error: -2, message: `debe completar todas las propiedades del producto` }
    )
}

module.exports = {
    controlProps
}