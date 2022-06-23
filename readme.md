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

Estructura del proyecto
El proyecto está trabajado en capas, partiendo de un archivo server.js principal que es quien levanta la aplicación, y de ahi se pasa al resto de capas (router, controller, repository y DAO/CRUD). Cada capa posee su propia responsabilidad:
-Router: se encarga de setear las diferentes rutas de la aplicación, validar la petición vía middlewares y llamar a la capa controller.
-Controller: se encarga de llamar a la función especifica de la capa repository, pasandole unicamente los datos necesarios para su funcionamiento, y una vez obtenida la información, la devuelve, ya sea en formato json o renderizado.
-Repository: se encarga de ejecutar lógica de la aplicación, convertir los datos de Model a DTO y viceversa, y persistir la información en la base de datos vía conexión a la capa DAO/CRUD.
-DAO/CRUD: se encarga de conectar directamente a la base para persistir la información recibida de la capa repository. 

A su vez, existen otros utilitarios/auxiliares que son de gran utilidad en la aplicación para su correcto funcionamiento, o para facilitar el código:
-Middlewares: estan usados para validar la información recibida en las request, de manera de evitar que al controlador llegue una petición que pueda generar un error. Cada validación otorga un mensaje descriptivo del error si la misma no es superada.
-Converter: esta clase contiene metodos que sirven para convertir la información de Model a DTO y viceversa. Es usada en la capa Repository.
-Error: esta clase es pequeña pero sirve basicamente para manejar los diferentes errores que la aplicación puede arrojar (sea por errores 5xx o 4xx), teniendo en cuenta el modo en que se ejecuta la aplicación ("api" o "integrado").

Por último, existen diferentes carpetas adicionales que no pertenecen a los 2 puntos anteriores, pero que, sin embargo, sirven al funcionamiento de la aplicación, como:
-Config: contiene la configuración de aquellas librerias que lo necesitan (como multer, o log4js, entre otros)
-Models: contiene los Schemas de Mongo para persistir en base de datos.
-Views: contiene las plantillas para que funcione el modo "integrado" de la aplicación (que renderizará un frontend muy básico).

Para levantar la aplicación localmente, se debe setear el archivo .env para un correcto funcionamiento. En la carpeta proyecto.final, existe un archivo llamado "example.env.js" que indica cuales son los parametros necesarios para que funcione correctamente, existiendo un comentario de cada variable a setear para mayor ayuda.

Hago mencion especial de la variable de entorno "MODE", para profundizar acerca de la misma. Esta variable indica el modo de funcionamiento de la aplicación. Permite 2 valores posibles: api o integrado. 
En caso de setearlo en "api", la aplicación funcionará como una API full backend, donde todas sus respuestas serán en formato JSON, no tendrá ningun frontend integrado, y se deberá probar a través de Postman su funcionamiento. A su vez, no renderizará ninguna vista frontend y el chat estará deshabilitado. En otras palabras, será una aplicación lista para consumir por una aplicación frontend.
En caso de setearlo en "integrado", la aplicación funcionará como una aplicación integrada, incorporando un frontend muy básico. Esto quiere decir que renderizará vistas, el chat estará habilitado (solo si el usuario está logueado), y se podrá navegar como una pagina web con cualquier navegador para poder probarlo.
Esta variable de entorno (y todas las complejidades que trae dentro la app gracias a esto), se introdujo dado que en el curso se mencionó en reiteradas oportunidades que como es un proyecto de un curso backend, debiamos centrarnos en eso. Sin embargo, la consigna en varios lados habla sobre poseer un frontend minimo (en partes lo menciona como opcional, en partes deja a entender que es obligatorio), por lo que se dicidió implementar ambas partes de esta manera.
A pesar de esto, se trato de implementar esto dentro de la app de la manera mas sencilla posible. Para esto, cada modo tiene su propio Router, Controller y Middlewares (diferenciados por los nombres de carpeta). La responsabilidad que recursos utilizar, la tiene el Server a la hora de definir que Router levantar. La capa Repository y DAOs/CRUD es la misma para ambos modos, dado que solo contienen lógica/conexión a base de datos.

Otras consideraciones a tener en cuenta
El proyecto posee un manejo de stock muy basico. Si se quiere cargar stock de un producto, usar el endpoint de "Actualizar producto", indicando el nuevo numero de stock. El mismo ira disminuyendo a medida que se confirman las compras (en otras palabras, cada compra resta stock).
Todos los usuarios que se registran, inicialmente poseen en rol de buyer. Para crear un usuario con rol de admin si se levanta el proyecto en una base de datos local/propia, la única manera de hacerlo es modificando el rol directamente en la base de datos.
