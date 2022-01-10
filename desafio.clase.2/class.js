class Usuario {
    constructor (nombre, apellido, libros, mascotas) {
        this.nombre = nombre;
        this.apellido = apellido; 
        this.libros = libros;
        this.mascotas = mascotas;
    }
    getFullName () {
        console.log(`Mi nombre es ${this.nombre} y mi apellido es ${this.apellido}`)
    }

    addMascota (nuevaMascota) {
        this.mascotas.push(nuevaMascota);
        console.log(this.mascotas);
    }

    countMascotas() {
        console.log(`La cantidad de mascotas que tiene es ${this.mascotas.length}`)
    }

    addBook(nombreLibro, autorLibro) {
        this.libros.push({
            nombre: nombreLibro,
            autor: autorLibro,
        })
        console.log(this.libros)
    }
    
    getBookNames() {
        const arrayNombreLibro = [];
        this.libros.map(dato => {
            arrayNombreLibro.push(dato.nombre);
        })
        console.log(arrayNombreLibro);
    }
}

const prueba = new Usuario ("Alan", "Gimenez", [{nombre: "libro1", autor: "autorLibro1"}, {nombre: "libro2", autor: "autorLibro2"}], ["Tony", "Black"]);

console.log(prueba.getFullName());
console.log(prueba.addMascota("Puma"));
console.log(prueba.countMascotas());
console.log(prueba.addBook("libro3", "autorLibro3"));
console.log(prueba.getBookNames());