const productos = [
    { id: '1', name: '50 principios de la ciencia de datos', autor: 'Liberty Vittert', categoria: 'Computación y sistemas', precio: '1795', href: 'https://www.tematika.com/media/catalog/Ilhsa/Imagenes/687746.jpg' },
    { id: '2', name: 'Computación basica para adultos', autor: 'Claudio Veloso', categoria: 'Computación y sistemas', precio: '1759', href: 'https://www.tematika.com/media/catalog/Ilhsa/Imagenes/632387.jpg' },
    { id: '3', name: 'La Guia del Hardware', autor: 'Javier Richarte', categoria: 'Computación y sistemas', precio: '1690', href: 'https://www.tematika.com/media/catalog/Ilhsa/Imagenes/668568.jpg' },
    { id: '4', name: 'Redes informaticas', autor: 'Miguel Lederkremer', categoria: 'Computación y sistemas', precio: '1690', href: 'https://www.tematika.com/media/catalog/Ilhsa/Imagenes/671001.jpg' },
    { id: '5', name: 'Creacion de publicaciones digitales', autor: 'Gustavo Carballeiro', categoria: 'Computación y sistemas', precio: '1190', href: 'https://www.tematika.com/media/catalog/Ilhsa/Imagenes/595680.jpg' },
    { id: '6', name: 'Improvisar', autor: 'Nachmanovitch', categoria: 'Arte, arquitectura y diseño', precio: '2190', href: 'https://www.tematika.com/media/catalog/Ilhsa/Imagenes/689708.jpg' },
    { id: '7', name: 'Free play', autor: 'Nachmanovitch', categoria: 'Arte, arquitectura y diseño', precio: '1660', href: 'https://www.tematika.com/media/catalog/Ilhsa/Imagenes/676928.jpg' },
    { id: '8', name: 'Dibujo de cabeza y manos', autor: 'Andrew Loomis', categoria: 'Arte, arquitectura y diseño', precio: '1990', href: 'https://www.tematika.com/media/catalog/Ilhsa/Imagenes/14903.jpg' },
    { id: '9', name: 'El libro del arte', autor: 'Anonimo', categoria: 'Arte, arquitectura y diseño', precio: '3500', href: 'https://www.tematika.com/media/catalog/Ilhsa/Imagenes/633713.jpg' },
    { id: '10', name: 'Un muchacho como aquel', autor: 'Abel Gilbert', categoria: 'Arte, arquitectura y diseño', precio: '1800', href: 'https://www.tematika.com/media/catalog/Ilhsa/Imagenes/689319.jpg' },
    { id: '11', name: 'Primer tiempo', autor: 'Mauricio Macri', categoria: 'Derecho y ciencias sociales', precio: '2350', href: 'https://www.tematika.com/media/catalog/Ilhsa/Imagenes/682330.jpg' },
    { id: '12', name: 'La Contraofensiva', autor: 'Hernan Confino', categoria: 'Derecho y ciencias sociales', precio: '1900', href: 'https://www.tematika.com/media/catalog/Ilhsa/Imagenes/687379.jpg' },
    { id: '13', name: 'Mar del plata', autor: 'Elisa Pastoriza', categoria: 'Derecho y ciencias sociales', precio: '1695', href: 'https://www.tematika.com/media/catalog/Ilhsa/Imagenes/671543.jpg' },
    { id: '14', name: 'Historia del feminismo', autor: 'Severine Auffret', categoria: 'Derecho y ciencias sociales', precio: '3200', href: 'https://www.tematika.com/media/catalog/Ilhsa/Imagenes/348212.jpg' },
    { id: '15', name: 'La segunda guerra mundial', autor: 'Winston Churchill', categoria: 'Derecho y ciencias sociales', precio: '4565', href: 'https://www.tematika.com/media/catalog/Ilhsa/Imagenes/557270.jpg' },
    { id: '16', name: 'Desconocida Buenos Aires', autor: 'Leandro Vesco', categoria: 'Hoteleria y turismo', precio: '1600', href: 'https://www.tematika.com/media/catalog/Ilhsa/Imagenes/679307.jpg' },
    { id: '17', name: 'Ciudad de Angeles', autor: 'Omar Lopez Mato', categoria: 'Hoteleria y turismo', precio: '2550', href: 'https://www.tematika.com/media/catalog/Ilhsa/Imagenes/689371.jpg' },
    { id: '18', name: 'Mapa Guia de la Patagonia', autor: 'Julian de Dios', categoria: 'Hoteleria y turismo', precio: '1000', href: 'https://www.tematika.com/media/catalog/Ilhsa/Imagenes/391885.jpg' },
    { id: '19', name: 'Argentina, el gran libro', autor: 'La Nacion', categoria: 'Hoteleria y turismo', precio: '5690', href: 'https://www.tematika.com/media/catalog/Ilhsa/Imagenes/663260.jpg' },
    { id: '20', name: 'Europa, 20 ciudades imperdibles', autor: 'Julian de Dios', categoria: 'Hoteleria y turismo', precio: '2990', href: 'https://www.tematika.com/media/catalog/Ilhsa/Imagenes/575110.jpg' },
    { id: '21', name: 'El fin del amor', autor: 'Tamara Tenenbaum', categoria: 'Humanidades', precio: '2070', href: 'https://www.tematika.com/media/catalog/Ilhsa/Imagenes/661777.jpg' },
    { id: '22', name: 'Teoria de la gravedad', autor: 'Leila Guerriero', categoria: 'Humanidades', precio: '1485', href: 'https://www.tematika.com/media/catalog/Ilhsa/Imagenes/678015.jpg' },
    { id: '23', name: 'Irracionalidad', autor: 'Justine Smith', categoria: 'Humanidades', precio: '2400', href: 'https://www.tematika.com/media/catalog/Ilhsa/Imagenes/688187.jpg' },
    { id: '24', name: 'Gardel', autor: 'Felipe Pigna', categoria: 'Humanidades', precio: '2510', href: 'https://www.tematika.com/media/catalog/Ilhsa/Imagenes/678919.jpg' },
    { id: '25', name: 'La Hermana Menor', autor: 'Mariana Enriquez', categoria: 'Humanidades', precio: '1650', href: 'https://www.tematika.com/media/catalog/Ilhsa/Imagenes/653214.jpg' },
    { id: '26', name: 'Al final mueren los dos', autor: 'Adam Silvera', categoria: 'Infantil y juvenil', precio: '1930', href: 'https://www.tematika.com/media/catalog/Ilhsa/Imagenes/646539.jpg' },
    { id: '27', name: 'A traves de ti', autor: 'Ariana Godoy', categoria: 'Infantil y juvenil', precio: '2099', href: 'https://www.tematika.com/media/catalog/Ilhsa/Imagenes/687504.jpg' },
    { id: '28', name: 'La vaca sus miedos ataca', autor: 'Agustina Lynch', categoria: 'Infantil y juvenil', precio: '1650', href: 'https://www.tematika.com/media/catalog/Ilhsa/Imagenes/689236.jpg' },
    { id: '29', name: 'Encanto aventuras de pelicula', autor: 'Disney', categoria: 'Infantil y juvenil', precio: '1499', href: 'https://www.tematika.com/media/catalog/Ilhsa/Imagenes/689250.jpg' },
    { id: '30', name: 'El principito', autor: 'De Saint-Exupery', categoria: 'Infantil y juvenil', precio: '1670', href: 'https://www.tematika.com/media/catalog/Ilhsa/Imagenes/617598.jpg' },
    { id: '31', name: 'Los siete maridos de Evelyn Hugo', autor: 'Taylor Jenkins Reid', categoria: 'Ficcion y literatura', precio: '2190', href: 'https://www.tematika.com/media/catalog/Ilhsa/Imagenes/679908.jpg' },
    { id: '32', name: 'Nosotros en la luna', autor: 'Alice Kellen', categoria: 'Ficcion y literatura', precio: '2420', href: 'https://www.tematika.com/media/catalog/Ilhsa/Imagenes/686658.jpg' },
    { id: '33', name: 'Notas al pie', autor: 'Alejandro Dolina', categoria: 'Ficcion y literatura', precio: '2630', href: 'https://www.tematika.com/media/catalog/Ilhsa/Imagenes/688575.jpg' },
    { id: '34', name: 'Sira', autor: 'Maria Dueñas', categoria: 'Ficcion y literatura', precio: '2630', href: 'https://www.tematika.com/media/catalog/Ilhsa/Imagenes/682917.jpg' },
    { id: '35', name: 'Todo lo que somos juntos', autor: 'Alice Kellen', categoria: 'Ficcion y literatura', precio: '2420', href: 'https://www.tematika.com/media/catalog/Ilhsa/Imagenes/684921.jpg' },
    { id: '36', name: 'Mente millonaria', autor: 'Garcia Manjarrez', categoria: 'Negocios y economia', precio: '999', href: 'https://www.tematika.com/media/catalog/Ilhsa/Imagenes/661056.jpg' },
    { id: '37', name: 'La Riqueza de las naciones', autor: 'Adam Smitg', categoria: 'Negocios y economia', precio: '2700', href: 'https://www.tematika.com/media/catalog/Ilhsa/Imagenes/689073.jpg' },
    { id: '38', name: 'Del querer al hacer', autor: 'Jeremy Kraayenbrink', categoria: 'Negocios y economia', precio: '1400', href: 'https://www.tematika.com/media/catalog/Ilhsa/Imagenes/682328.jpg' },
    { id: '39', name: 'Dolarizar', autor: 'Alfredo Romano', categoria: 'Negocios y economia', precio: '1500', href: 'https://www.tematika.com/media/catalog/Ilhsa/Imagenes/688429.jpg' },
    { id: '40', name: 'Pensar rapido, pensar despacio', autor: 'Daniel Kahneman', categoria: 'Negocios y economia', precio: '3599', href: 'https://www.tematika.com/media/catalog/Ilhsa/Imagenes/552128.jpg' },
    { id: '41', name: 'Nuestro universo', autor: 'Jo Dunkley', categoria: 'Ingenieria, tecnica y exactas', precio: '1500', href: 'https://www.tematika.com/media/catalog/Ilhsa/Imagenes/682871.jpg' },
    { id: '42', name: 'El libro de la fisica', autor: 'Autores varios', categoria: 'Ingenieria, tecnica y exactas', precio: '4763', href: 'https://www.tematika.com/media/catalog/Ilhsa/Imagenes/682392.jpg' },
    { id: '43', name: 'Super espacio', autor: 'Anonimo', categoria: 'Ingenieria, tecnica y exactas', precio: '3937', href: 'https://www.tematika.com/media/catalog/Ilhsa/Imagenes/683759.jpg' },
    { id: '44', name: 'Supernovas', autor: 'Gloria Dubner', categoria: 'Ingenieria, tecnica y exactas', precio: '1500', href: 'https://www.tematika.com/media/catalog/Ilhsa/Imagenes/673679.jpg' },
    { id: '45', name: 'El ultimo teorema de fermat', autor: 'Simon Singh', categoria: 'Ingenieria, tecnica y exactas', precio: '1700', href: 'https://www.tematika.com/media/catalog/Ilhsa/Imagenes/657097.jpg' },
    { id: '46', name: 'Quiero hacer origami', autor: 'Anonimo', categoria: 'Hogar', precio: '2750', href: 'https://www.tematika.com/media/catalog/Ilhsa/Imagenes/652455.jpg' },
    { id: '47', name: 'El tigre en la casa', autor: 'Carl Van Vechten', categoria: 'Hogar', precio: '1700', href: 'https://www.tematika.com/media/catalog/Ilhsa/Imagenes/643968.jpg' },
    { id: '48', name: 'El Mejor Entrenador', autor: 'Pampita Montenegro', categoria: 'Hogar', precio: '2400', href: 'https://www.tematika.com/media/catalog/Ilhsa/Imagenes/689783.jpg' },
    { id: '49', name: 'Cactus y suculentas', autor: 'Lucia Cane', categoria: 'Hogar', precio: '1450', href: 'https://www.tematika.com/media/catalog/Ilhsa/Imagenes/616108.jpg' },
    { id: '50', name: 'Tu espacio organizado', autor: 'Brenda Haines', categoria: 'Hogar', precio: '2480', href: 'https://www.tematika.com/media/catalog/Ilhsa/Imagenes/644231.jpg' },
]

module.exports = productos;