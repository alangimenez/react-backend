Desafio 46

Buenas noches, hago entrega del desafio 46.

Para este desafio, se utilizó el framework de Koa, haciendo que se deban enfatizar cambios en la capa de router, capa de controller, el errorHandler y los controles de cada endpoint. A su vez, se creo otro server (para correr Koa).

En base a estos lineamientos, no se eliminó nada de lo que ya estaba hecho, si no que se armó en paralelo. El comando para correr el proyecto es npm run start-koa.

Basicamente, se armó desde cero una capa de router exclusiva para Koa, tanto para el modulo de productos como para carrito. A su vez, también se armó la capa de controller desde cero. La capa controller se conecta a la capa repository, la cual no sufrio cambios dado que esta capa (y la de DAO/CRUD) quedaron "abstraidas", debido a que no necesitaba realizar cambios en estas partes del proyecto. 

Por último, se hicieron cambios en el modulo de error, para manejar con ctx en vez de con req, res. A su vez, se reconvirtió la capa de Middlewares a controles que se ejecutan en la capa controller. 

Todas estas nuevas capas creadas para Koa, se ven en las carpetas controllerKoa, controlKoa, routerKoa y errorKoa. A su vez, el archivo server de Koa es serverKoa.

Como siempre, esta el archivo sample.env.js, para poder levantar el proyecto con las variables de entorno necesarias. 

De anteamno, agradezco el feedback habitual!! Y cualquier cosa si algo no quedo muy bien avisarme! Saludos! Alan.