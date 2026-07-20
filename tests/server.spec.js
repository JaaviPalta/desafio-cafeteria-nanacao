const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {

    it("Testea que la ruta GET /cafes devuelve un status code 200 y el tipo de dato recibido es un arreglo con por lo menos 1 objeto", async () => {
        const response = await request(server).get("/cafes").send();
        const status = response.statusCode;
        expect(status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThanOrEqual(1);
    });

    it("Comprueba que se obtiene un código 404 al intentar eliminar un café con un id que no existe", async () => {
        const jwt = "token";
        const response = await request(server)
            .delete("/cafes/999")
            .set("Authorization", jwt)
            .send();
        expect(response.statusCode).toBe(404);
    });

    it("Prueba que la ruta POST /cafes agrega un nuevo café y devuelve un código 201", async () => {
        const id = Math.floor(Math.random() * 999);
        const cafe = { id, nombre: "Espresso" };
        const response = await request(server)
            .post("/cafes")
            .send(cafe);
        expect(response.statusCode).toBe(201);
    });

    it("Prueba que la ruta PUT /cafes devuelve un status code 400 si intentas actualizar un café enviando un id en los parámetros que sea diferente al id dentro del payload", async () => {
        const cafe = { id: 2, nombre: "Latte" };
        const response = await request(server)
            .put("/cafes/1")
            .send(cafe);
        expect(response.statusCode).toBe(400);
    });

});
