// @deno-types="https://deno.land/x/servest/types/react/index.d.ts"
import React from "https://dev.jspm.io/react/index.js";
// @deno-types="https://deno.land/x/servest/types/react-dom/server/index.d.ts"
import ReactDOMServer from "https://dev.jspm.io/react-dom/server.js";
import { contentTypeFilter, createApp } from "https://deno.land/x/servest/mod.ts";

const app = createApp();

let colors = [];

app.handle("/", async (req) => {
    await req.respond({
        status: 200,
        headers: new Headers({
            "content-type": "text/html; charset=UTF-8",
        }),
        body: ReactDOMServer.renderToString(
            <html>
                <head>
                    <meta charSet="utf-8" />
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossOrigin="anonymous"></link>
                    <title>servest</title>
                </head>
                <body className="container">
                    <form method="POST" action="/post">
                        <input name="color" placeholder="Ingrese su color"></input>
                        <button type="submit" className="btn btn-dark">Enviar</button>
                    </form>
                    <div style={{backgroundColor: "black"}}>
                        <h2 style={{color: "white"}}>Listado de colores ingresados</h2>
                        <ul>
                            {
                                colors.map(color => {
                                    return (<li style={{ color: color, fontWeight: "bold" }} key={color}>{color}</li>)
                                })
                            }
                        </ul>
                    </div>
                </body>
            </html>,
        ),
    });
});

app.post("/post", contentTypeFilter("application/x-www-form-urlencoded"), async (req) => {
    const bodyForm = await req.formData();
    const color = bodyForm.value("color");
    colors.push(color.toLowerCase());
    req.redirect("/")
})

app.listen({ port: 8888 });