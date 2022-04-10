const numerosAleatorios = (data) => {
    const numeros = [];
    for (let i = 0; i < data; i++) {
        const numeroAleatorio = parseInt((Math.random() * 1000) + 1);
        const existeNumero = numeros.findIndex(e => e.id === numeroAleatorio);
        if (existeNumero === -1) {
            numeros.push({ id: numeroAleatorio, value: 1 });
        } else {
            numeros[existeNumero].value = numeros[existeNumero].value + 1;
        }
    }
    numeros.sort(((a, b) => a.id - b.id));
    return numeros;
}

process.on('message', (data) => {
    const numeros = numerosAleatorios(data);
    process.send(numeros);
})