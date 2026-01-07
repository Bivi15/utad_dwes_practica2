/* Importado de Bibliotecas */
const request = require('supertest');
const app = require('../app');

/* Tests unitarios para usuarioas */
describe('datos precipitación', () => {
    let preciId;
    let sondaId;
    
    const preciMock = {
        tipoPrecipitacion: "Agua",
        probabilidadPrecipitacion: 55,
        precipitacionAcumulada: 24,
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
    it('debe crear datos de precipitación', async () => {
        const response = await request(app)
            .post('/api/v1/datosPrecipitacion')
            .set("Authorization", `Bearer ${global.testToken}`)
            .send({ ...preciMock, sonda: sondaId })
            .expect(201)
        preciId = response.body.data._id;
        expect(response.body.data.probabilidadPrecipitacion).toBe(55);
    });

    //GET (ALL)
    it('debe obtener todos los datos de precipitación', async () => {
        const response = await request(app)
            .get('/api/v1/datosPrecipitacion')
            .set('Authorization', `Bearer ${global.testToken}`)
            .expect(200)
        expect(Array.isArray(response.body.data)).toBe(true);
    });

    //STATS
    it('debe obtener estadísticas de datos de precipitación', async () => {
        const response = await request(app)
            .get('/api/v1/datosPrecipitacion/stats')
            .set('Authorization', `Bearer ${global.testToken}`)
            .expect(200)
        expect(response.body.error).toBe(false);
    });

    //GET BY ID
    it('debe obtener datos de precipitación por ID', async () => {
        const response = await request(app)
            .get(`/api/v1/datosPrecipitacion/${preciId}`)
            .set('Authorization', `Bearer ${global.testToken}`)
            .expect(200)
        expect(response.body.data._id).toBe(preciId);
    });

    // UPDATE
    it("debe actualizar datos de precipitación", async () => {
        const response = await request(app)
            .put(`/api/v1/datosPrecipitacion/${preciId}`)
            .set("Authorization", `Bearer ${global.testToken}`)
            .send({ 
                tipoPrecipitacion: "Agua",
                probabilidadPrecipitacion: 12,
                precipitacionAcumulada: 20,
                sonda: sondaId,
                fechaMedicion: "2025-11-02",
                horaMedicion: "13:59"
             })
            .expect(200)
        expect(response.body.data.precipitacionAcumulada).toBe(20);
    });    

    //DELETE
    it('debe eliminar datos de precipitación', async () => {
        const response = await request(app)
            .delete(`/api/v1/datosPrecipitacion/${preciId}`)
            .set('Authorization', `Bearer ${global.testToken}`)
            .expect(200)
        expect(response.body.error).toBe(false)
    });
});