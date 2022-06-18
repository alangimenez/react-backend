Desafio final

Buenas noches. Hago desafio de la entrega final del curso.

El mismo, tal como lo pide la consigna, tratá de un proyecto e-commerce, en este caso, por la información que trae precargada los proyectos deployados en Heroku, de libros.

La aplicación en total posee 4 modulos diferentes: productos, carrito, usuarios, ordenes. Se explican los mismos, de menos a mas complejo.

Productos
En este modulo, se podrá listar todos los productos cargados, obtener un producto en particular por su id, subir un nuevo producto, actualizar los datos de un producto ya existente y eliminar un producto. 
Cualquier usuario podrá obtener todos los productos o uno de ellos. Para poder subir un producto, actualizarlo o eliminarlo, si o si deberá estar logueado como un usuario con rol de administrador (para mas detalle sobre roles, leer el modulo Usuarios).

Usuarios
En este modulo, se podrá registrar un nuevo usuario, loguear un usuario, desloguear, ver sus datos de perfil, actualizar los datos de perfil y subir una foto de perfil.
Es importante saber que existen 2 tipos de usuarios, diferenciados por el rol: buyer (comprador) y admin. El usuario admin tendrá acceso total a la aplicación, mientras que el usuario buyer solo tendrá acceso a las áreas pertinentes para poder navegar la aplicación y hacer la compra correspondiente. Como ejemplo de la diferencia entre ambos, un usuario admin podrá acceder a todas las ordenes cursadas por los usuarios buyer, mientras que estos ultimos solo podrán acceder a las que ellos mismos generaron. 

Ordenes
En este modulo, se podrá obtener las ordenes generadas y cambiar el status de las mismas. 
Dependerá del rol que tenga el usuario la real interacción que podrá tener en este modulo con la aplicación: un usuario buyer solo podrá listar sus propias ordenes generadas, no teniendo acceso a cambiar el status de las mismas; mientras que un usuario admin podrá listar todas las ordenes generadas por los usuarios, así como podrá cambiar el status de las mismas.

Carrito
En este modulo, se podrá obtener el carrito completo de un usuario, agregar productos al carrito, listar los productos del carrito, eliminar productos del carrito, modificar la cantidad de un producto en carrito, vaciar el carrito y confirmar la compra.
Para saber a que carrito se debe acceder, se utiliza la información almacenada en req.session.user, sea que el usuario se haya logueado o registrado previamente (no podrá acceder si no tiene sesión activa en la aplicación). 

Para levantar la aplicación localmente, se debe setear el archivo .env para un correcto funcionamiento. En la carpeta proyecto.final, existe un archivo llamado "example.env.js" que indica cuales son los parametros necesarios para que funcione correctamente, existiendo un comentario de cada variable a setear para mayor ayuda.

Hago mencion especial de la variable de entorno "MODE", para profundizar acerca de la misma. Esta variable indica el modo de funcionamiento de la aplicación. Permite 2 valores posibles: api o integrado. 
En caso de setearlo en "api", la aplicación funcionará como una API full backend, donde todas sus respuestas serán en formato JSON, no tendrá ningun frontend integrado, y se deberá probar a través de Postman su funcionamiento. A su vez, no renderizará ninguna vista frontend y el chat estará deshabilitado. En otras palabras, será una aplicación lista para consumir por una aplicación frontend.
En caso de setearlo en "integrado", la aplicación funcionará como una aplicación integrada, incorporando un frontend muy básico. Esto quiere decir que renderizará vistas, el chat estará habilitado (solo si el usuario está logueado), y se podrá navegar como una pagina web con cualquier navegador para poder probarlo.
Esta variable de entorno (y todas las complejidades que trae dentro la app gracias a esto), se introdujo dado que en el curso se mencionó en reiteradas oportunidades que como es un proyecto de un curso backend, debiamos centrarnos en eso. Sin embargo, la consigna en varios lados habla sobre poseer un frontend minimo (en partes lo menciona como opcional, en partes deja a entender que es obligatorio), por lo que se dicidió implementar ambas partes de esta manera.
A pesar de esto, se trato de implementar esto dentro de la app de la manera mas sencilla posible. Para esto, cada modo tiene su propio Router, Controller y Middlewares (diferenciados por los nombres de carpeta). La responsabilidad que recursos utilizar, la tiene el Server a la hora de definir que Router levantar. La capa Repository y DAOs/CRUD es la misma para ambos modos, dado que solo contienen lógica/conexión a base de datos.

Otras consideraciones a tener en cuenta
El proyecto posee un manejo de stock muy basico. Si se quiere cargar stock de un producto, usar el endpoint de "Actualizar producto", indicando el nuevo numero de stock. El mismo ira disminuyendo a medida que se confirman las compras (en otras palabras, cada compra resta stock).
Todos los usuarios que se registran, inicialmente poseen en rol de buyer. Para crear un usuario con rol de admin si se levanta el proyecto en una base de datos local/propia, la única manera de hacerlo es modificando el rol directamente en la base de datos.
