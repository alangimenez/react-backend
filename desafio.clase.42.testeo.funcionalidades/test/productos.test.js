const request = require('supertest')('http://localhost:8080');
const expect = require('chai').expect;

describe('grupo de test a modulo productos', () => {
    {
        it('get de todos los productos', async () => {
            let response = await request.get('/api/productos');
            expect(response.status).to.eql(200);
            expect(response.type).to.eql("application/json");
            expect(response.body.length).to.be.above(0);
        })
    }
    {
        it('get de un producto correcto', async () => {
            const idProducto = 19;
            let response = await request.get(`/api/productos/${idProducto}`);
            expect(response.status).to.eql(200);
            expect(response.type).to.eql("application/json");
            expect(response.body.id).to.eql(idProducto);
        })
    }
    {
        it('get de un producto inexistente', async () => {
            const idProducto = 45;
            let response = await request.get(`/api/productos/${idProducto}`);
            expect(response.status).to.eql(400);
            expect(response.body.errorType).to.eql("middlewareError");
        })
    }
    {
        it('get de un producto incorrecto', async () => {
            const idProducto = "incorrecto";
            let response = await request.get(`/api/productos/${idProducto}`);
            expect(response.status).to.eql(400);
            expect(response.body.errorType).to.eql("middlewareError");
        })
    }
    /* {
        it('delete de un producto correcto', async () => {
            const idProducto = 30;
            let response = await request.delete(`/api/productos/${idProducto}`);
            expect(response.status).to.eql(201);
        })
    } */
    {
        it('delete de un producto inexistente', async () => {
            const idProducto = 50;
            let response = await request.delete(`/api/productos/${idProducto}`);
            expect(response.status).to.eql(400);
            expect(response.body.errorType).to.eql("middlewareError");
        })
    }
    {
        it('delete de un producto incorrecto', async () => {
            const idProducto = "incorrecto";
            let response = await request.delete(`/api/productos/${idProducto}`);
            expect(response.status).to.eql(400);
            expect(response.body.errorType).to.eql("middlewareError");
        })
    }
    {
        it('post de un producto', async () => {
            const producto = {
                "nombre": "prueba para el POST",
                "descripcion": "descripcio nde nuevo libro",
                "codigo": 5000,
                "foto": "foto del nuevo libro",
                "precio": 5100,
                "stock": 15
            };
            let response = await request.post(`/api/productos`).send(producto);
            expect(response.status).to.eql(201);
            expect(response.body.nombre).to.eql(producto.nombre);
            expect(response.body.foto).to.eql(producto.foto);
        })
    }
    {
        it('post de un producto incompleto', async () => {
            const producto = {
                "nombre": "prueba para el POST",
                "descripcion": "descripcio nde nuevo libro",
                "codigo": 5000,
                "foto": "foto del nuevo libro",
                "precio": 5100
            };
            let response = await request.post(`/api/productos`).send(producto);
            expect(response.status).to.eql(400);
            expect(response.body.errorType).to.eql("middlewareError");
        })
    }
    {
        it('post de un producto completo con parametros incorrectos', async () => {
            const producto = {
                "nombre": "prueba para el POST",
                "descripcion": "descripcio nde nuevo libro",
                "codigo": 5000,
                "foto": "foto del nuevo libro",
                "precio": 5100, 
                "stock": "incorrecto"
            };
            let response = await request.post(`/api/productos`).send(producto);
            expect(response.status).to.eql(400);
            expect(response.body.errorType).to.eql("middlewareError");
        })
    }
    {
        it('update de una caracteristica de un producto', async () => {
            const idProducto = 30;
            const producto = {
                "stock": 2020
            };
            let response = await request.put(`/api/productos/${idProducto}`).send(producto);
            expect(response.status).to.eql(201);
            expect(response.body.stock).to.eql(producto.stock);
        })
    }
    {
        it('update de una caracteristica que no existe de un producto', async () => {
            const idProducto = 30;
            const producto = {
                "inexistente": 2020
            };
            let response = await request.put(`/api/productos/${idProducto}`).send(producto);
            expect(response.status).to.eql(400);
            expect(response.body.errorType).to.eql("middlewareError");
        })
    }
    {
        it('update de una caracteristica con dato incorrecto, de un producto', async () => {
            const idProducto = 30;
            const producto = {
                "stock": "incorrecto"
            };
            let response = await request.put(`/api/productos/${idProducto}`).send(producto);
            expect(response.status).to.eql(400);
            expect(response.body.errorType).to.eql("middlewareError");
        })
    }
    {
        it('update de un producto que no existe', async () => {
            const idProducto = 55;
            const producto = {
                "stock": 2020
            };
            let response = await request.put(`/api/productos/${idProducto}`).send(producto);
            expect(response.status).to.eql(400);
            expect(response.body.errorType).to.eql("middlewareError");
        })
    }
})