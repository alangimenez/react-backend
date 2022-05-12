const { CrudFirebase } = require('../../contenedores/crudFirebase');
const { FieldValue } = require('firebase-admin/firestore');

class DaoFirebaseCarrito extends CrudFirebase {

    constructor () {
        super('carritos');
    }
    async actualizarProdEnCarrito(ubicacion, objeto) {
        const doc = await this.db.collection('productos').doc(`${+objeto.id}`).get();
        const datos = doc.data();   
        ubicacion.productos.push(datos);
        await this.query.doc(`${ubicacion.id}`).update({ productos: ubicacion.productos})
        let carritoActualizado = await this.query.doc(`${ubicacion.id}`).get();
        carritoActualizado = carritoActualizado.data();
        return carritoActualizado;
    }

    async eliminarProdEnCarrito(listado, objeto, producto) {
        const ubicacionProdEnCarrito = objeto.productos.findIndex(e => e.id === producto.id);
        objeto.productos.splice(ubicacionProdEnCarrito, 1);
        await this.query.doc(`${objeto.id}`).update({ productos: objeto.productos})
        let carritoActualizado = await this.query.doc(`${objeto.id}`).get();
        carritoActualizado = carritoActualizado.data();
        return carritoActualizado;
    }
}

module.exports = {
    DaoFirebaseCarrito
}