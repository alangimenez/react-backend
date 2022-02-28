const { CrudFirebase } = require('../../contenedores/crudFirebase');

class DaoFirebaseCarrito extends CrudFirebase {

    constructor () {
        super('carritos');
    }
    async actualizarCarrito(ubicacion, objeto) {
        const doc = await this.db.collection('productos').doc(`${+objeto.id}`).get();
        const datos = doc.data();   
        console.log(datos);
        if (!datos.productos) datos.productos = [];
        datos.productos.push(objeto);
        await this.query.doc(`${ubicacion.id}`).update({ productos: datos.productos })
        console.log(datos.productos);
    }
}

module.exports = {
    DaoFirebaseCarrito
}