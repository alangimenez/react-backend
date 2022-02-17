class CrudBasico {
  constructor() { }
  read(array, objeto) {
    const result = array.filter((e) => e.id === +objeto);
    return result[0];
  }
  create(array, objeto) {
    const nuevoProducto = {
      id: array[array.length - 1].id + 1,
      timestamp: Date.now(),
      ...objeto,
    };
    array.push(nuevoProducto);
    return {array, nuevoProducto};
  }
  delete(array, objeto) {
    const filtro = (dato) => dato.id == objeto;
    const result = array.findIndex(filtro);
    if (result == -1) return console.log(`${objeto} no encontrado`);
    array.splice(result, 1);
    return array
  }
  put(array, objeto) {
    const filtro = (dato) => dato.id === +objeto.id;
    const result = array.findIndex(filtro);
    array[result] = {
      ...array[result],
      ...objeto,
    };
    return {array, result};
  }
}

module.exports = { CrudBasico };