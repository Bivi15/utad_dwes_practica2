/* Importado de Bibliotecas */
const request = require('supertest');
const mongoose = require("mongoose");
require("dotenv").config();

const app = require('../app');
const connectToMongoDB = require("../api/config/mongodb.config");
const usuariosModel = require("../api/models/usuarios.model");
const sondasModel = require("../api/models/sondas.models");

global.testToken = null; 
global.testUserId = null;


beforeAll(async () => {
    await connectToMongoDB();
    await usuariosModel.deleteMany();
    await sondasModel.deleteMany();

    const userRes = await request(app)
        .post('/api/v1/usuarios')
        .send({
            nombreUsuario: "jest2",
            nombreCompleto: "Usuario Jest",
            descripcion: "Usuario test",
            email: "jest2@test.com",
            contrasena: "1234567890"
        });
    global.testUserId = userRes.body.data._id;

    const loginRes = await request(app)
        .post("/api/v1/usuarios/login")
        .send({
            email: "jest2@test.com",
            contrasena: "1234567890"
        });
    global.testToken = loginRes.body.data.token;
});

afterAll(async () => {
    await mongoose.connection.close();
});