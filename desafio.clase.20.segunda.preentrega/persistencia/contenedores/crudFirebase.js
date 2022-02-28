const admin = require("firebase-admin");
const { controlProps } = require('../../middlewares/controlProps');

const serviceAccount = require('../../databases/backend-ecommerce-c1032-firebase-adminsdk-jmi0l-5bbf875df7.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

class CrudFirebase {
    constructor(type) {
        this.db = admin.firestore();
        this.query = this.db.collection(type)
    }

    async leerInfo() {
        const query = await this.query.get();
        const doc = query.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
        return doc;
    }

    async leerInfoPorId(id) {
        const productoBuscado = await this.query.doc(`${id}`).get();
        const prodFiltrado = productoBuscado.data();
        return prodFiltrado;
    }

    async subirInfo(objeto) {
        let idNuevo;

        const query = await this.query.get();
        query.docs.length === 0 ? idNuevo = 1 : idNuevo = +query.docs[query.docs.length - 1].data().id + 1;
        if (objeto) {
            const validacion = controlProps(objeto);
            if (validacion) return validacion;
            let doc = this.query.doc(`${idNuevo}`);
            await doc.create({
                nombre: objeto.nombre,
                descripcion: objeto.descripcion,
                codigo: objeto.codigo,
                stock: objeto.stock,
                foto: objeto.foto,
                id: idNuevo,
                timestamp: Date.now(),
                precio: objeto.precio
            });
        } else {
            let doc = this.query.doc(`${idNuevo}`);
            await doc.create({
                id: idNuevo,
                timestamp: Date.now(),
            });
        }
        return this.leerInfoPorId(idNuevo)
    }

    async eliminarInfo(id) {
        const productoEliminar = await this.leerInfoPorId(id);
        if (!productoEliminar) return { error: -1, message: `producto no encontrado` };
        const doc = await this.query.doc(`${id}`).delete();
        return this.leerInfo();
    }

    async actualizarInfo(objeto) {
        const productoModificar = await this.leerInfoPorId(objeto.id);
        if (!productoModificar) return { error: -1, message: `producto no encontrado` };
        if (!objeto.nombre && !objeto.descripcion && !objeto.codigo && !objeto.foto && !objeto.precio && !objeto.stock) return (
            { error: -3, message: `Las caracteristicas que se intentan actualizar del producto no existen` }
        )
        const doc = this.query.doc(`${objeto.id}`);
        if (objeto.nombre) await doc.update({ nombre: objeto.nombre });
        if (objeto.codigo) await doc.update({ codigo: objeto.codigo });
        if (objeto.descripcion) await doc.update({ descripcion: objeto.descripcion });
        if (objeto.stock) await doc.update({ stock: objeto.stock });
        if (objeto.foto) await doc.update({ foto: objeto.foto });
        if (objeto.precio) await doc.update({ precio: objeto.precio });
        if (objeto.timestamp) await doc.update({ timestamp: Date.now() });
        return this.leerInfoPorId(objeto.id);
    }
}

module.exports = {
    CrudFirebase
}