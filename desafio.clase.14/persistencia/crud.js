class CrudBasico {
  constructor() { }
  read(array, objeto) {
    const result = array.filter((e) => e.id === +objeto);
    return result[0];
  }
  create(array, objeto) {
    let idNuevo;
    array.length === 0 ? idNuevo = 1 : idNuevo = array[array.length - 1].id + 1;
    const nuevoProducto = {
      ...objeto,
      id: idNuevo,
      timestamp: Date.now(),
    };
    array.push(nuevoProducto);
    return {array, nuevoProducto};
  }
  delete(array, objeto) {
    const result = array.findIndex(e => e.id === +objeto);
    array.splice(result, 1);
    return array
  }
  put(array, objeto) {
    const result = array.findIndex(e => e.id === +objeto.id);
    if (objeto.nombre) array[result].nombre = objeto.nombre;
    if (objeto.codigo) array[result].codigo = objeto.codigo;
    if (objeto.descripcion) array[result].descripcion = objeto.descripcion;
    if (objeto.stock) array[result].stock = objeto.stock;
    if (objeto.foto) array[result].foto = objeto.foto;
    if (objeto.precio) array[result].precio = objeto.precio;
    if (objeto.timestamp) array[result].timestamp = objeto.timestamp;
    return {array, result};
  }
}

module.exports = { CrudBasico };