class CrudBasico {
  constructor() { }
  read(array, objeto) {
    const result = array.filter((e) => e.id == objeto);
    return result;
  }
  create(array, objeto) {
    const ultimoId = array[array.length - 1].id + 1;
    const timestamp = Date.now();
    const nuevoProducto = {
      id: ultimoId,
      timestamp,
      ...objeto,
    };
    array.push(nuevoProducto);
    return array;
  }
  delete(array, objeto) {
    const filtro = (dato) => dato.id == objeto;
    const result = array.findIndex(filtro);
    if (result == -1) return console.log(`${objeto} no encontrado`);
    array.splice(result, 1);
    return array
  }
  put(array, objeto) {
    const filtro = (dato) => dato.id == objeto.id;
    const result = array.findIndex(filtro);
    array[result] = {
      ...array[result],
      ...objeto,
    };
    return array;
  }
}

module.exports = { CrudBasico };