Desafio 44
Buenos días, espero que andes muy bien! Hago entrega del desafio 44.

Para este desafio, se agrego todo un router/controller/schema adicional, solo para poder manejar la parte de GraphQL.

En el server, se agrego un endpoint para el router de GraphQL.
En la capa de router, se creó un nuevo router para manejar solamente GraphQL, donde se definen las configuraciones que deberá manejar GraphQL.
En la capa de controller, se creó un nuevo controller que maneja las diferentes funciones que necesita GraphQL para las query/mutations. Esta capa directamente llama a la capa repository, la cual no tuvo modificación alguna.
En los models, se definió el schema que utiliza GraphQL para funcionar, con los type/inputs/query/mutations.

Se adjunta también el archivo codigo-de-prueba.txt que tiene diferentes consultas posibles que se pueden realizar en la consola de GraphiQL.

Como siempre, se adjunta el archivo sample.env.js, para poder dar las configuraciones necesarias para levantar el proyecto.

De anteamno, agradezco el feedback! Saludos! Alan.