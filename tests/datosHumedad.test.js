/* Importado de Bibliotecas */
const request = require('supertest');
const app = require('../app');

/* Tests unitarios para usuarioas */
describe('datos humedad', () => {
    let humedadId;
    let sondaId;

    const humedadMock = {
        humedad: 30,
        puntoRocio: 15,
        sonda: sondaId,
        fechaMedicion: "2025-11-02",
        horaMedicion: "13:59"
    };

    beforeAll(async () => {
            const sondasRes = await request(app)
                .post('/api/v1/sondas')
                .set('Authorization', `Bearer ${global.testToken}`)
                .send({
                    nombreSonda: "Sonda A",
                    descripcionSonda: "Test",
                    localizacion: "Madrid"
                });
            sondaId = sondasRes.body.data._id;
        });

    //CREATE
    it('debe crear datos de humedad', async () => {
        const response = await request(app)
            .post('/api/v1/datosHumedad')
            .set("Authorization", `Bearer ${global.testToken}`)
            .send({ ...humedadMock, sonda: sondaId })
            .expect(201)
        humedadId = response.body.data._id;
        expect(response.body.data.humedad).toBe(30);
    });

    //GET (ALL)
    it('debe obtener todos los datos de humedad', async () => {
        const response = await request(app)
            .get('/api/v1/datosHumedad')
            .set('Authorization', `Bearer ${global.testToken}`)
            .expect(200)
        expect(Array.isArray(response.body.data)).toBe(true);
    });

    //STATS
    it('debe obtener estadísticas de datos de humedad', async () => {
        const response = await request(app)
            .get('/api/v1/datosHumedad/stats')
            .set('Authorization', `Bearer ${global.testToken}`)
            .expect(200)
        expect(response.body.error).toBe(false);
    });

    //GET BY ID
    it('debe obtener datos de humedad por ID', async () => {
        const response = await request(app)
            .get(`/api/v1/datosHumedad/${humedadId}`)
            .set('Authorization', `Bearer ${global.testToken}`)
            .expect(200)
        expect(response.body.data._id).toBe(humedadId);
    });

    // UPDATE
    it("debe actualizar datos humedad", async () => {
        const response = await request(app)
            .put(`/api/v1/datosHumedad/${humedadId}`)
            .set("Authorization", `Bearer ${global.testToken}`)
            .send({ 
                humedad: 50,
                puntoRocio: 15,
                sonda: sondaId,
                fechaMedicion: "2025-11-02",
                horaMedicion: "13:59"
             })
            .expect(200)
        expect(response.body.data.humedad).toBe(50);
    });    

    //DELETE
    it('debe eliminar datos de humedad', async () => {
        const response = await request(app)
            .delete(`/api/v1/datosHumedad/${humedadId}`)
            .set('Authorization', `Bearer ${global.testToken}`)
            .expect(200)
        expect(response.body.error).toBe(false)
    });
});