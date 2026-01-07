/* Importado de Bibliotecas */
const request = require('supertest');
const app = require('../app');

/* Tests unitarios para usuarioas */
describe('datos avanzados', () => {
    let datoAvanzadoId;
    let sondaId;
    
    const datoAvanzadoMock = {
        presion: 76,
        indiceUV: 9,
        indicePolen: 65,
        sonda: sondaId,
        fechaMedicion: "2025-11-02",
        horaMedicion: "13:00"
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
    it('debe crear dato avanzado', async () => {
        const response = await request(app)
            .post('/api/v1/datosAvanzados')
            .set("Authorization", `Bearer ${global.testToken}`)
            .send({ ...datoAvanzadoMock, sonda: sondaId })
            .expect(201)
        datoAvanzadoId = response.body.data._id;
        expect(response.body.data.presion).toBe(76);
    });

    //GET (ALL)
    it('debe obtener todos los datos avanzados', async () => {
        const response = await request(app)
            .get('/api/v1/datosAvanzados')
            .set('Authorization', `Bearer ${global.testToken}`)
            .expect(200)
        expect(Array.isArray(response.body.data)).toBe(true);
    });

    //STATS
    it('debe obtener estadísticas de datos avanzados', async () => {
        const response = await request(app)
            .get('/api/v1/datosAvanzados/stats')
            .set('Authorization', `Bearer ${global.testToken}`)
            .expect(200)
        expect(response.body.error).toBe(false);
    });

    //GET BY ID
    it('debe obtener datos avanzados por ID', async () => {
        const response = await request(app)
            .get(`/api/v1/datosAvanzados/${datoAvanzadoId}`)
            .set('Authorization', `Bearer ${global.testToken}`)
            .expect(200)
        expect(response.body.data._id).toBe(datoAvanzadoId);
    });

    // UPDATE
    it("debe actualizar datos avanzados", async () => {
        const response = await request(app)
            .put(`/api/v1/datosAvanzados/${datoAvanzadoId}`)
            .set("Authorization", `Bearer ${global.testToken}`)
            .send({ 
                presion: 76,
                indiceUV: 9,
                sonda: sondaId,
                fechaMedicion: "2025-11-02",
                horaMedicion: "13:00",
                indicePolen: 55 
            })
            .expect(200)
        expect(response.body.data.indicePolen).toBe(55);
    });    

    //DELETE
    it('debe eliminar datos avanzados', async () => {
        const response = await request(app)
            .delete(`/api/v1/datosAvanzados/${datoAvanzadoId}`)
            .set('Authorization', `Bearer ${global.testToken}`)
            .expect(200)
        expect(response.body.error).toBe(false)
    });
});