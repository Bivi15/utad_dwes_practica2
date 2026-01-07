/* Importado de Bibliotecas */
const request = require('supertest');
const app = require('../app');

/* Tests unitarios para usuarioas */
describe('datos viento', () => {
    let datoVientoId;
    let sondaId;
    
    const datoVientoMock = {
        velocidadViento: 120,
        velocidadRafagas: 200,
        direccionViento: "N",
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
    it('debe crear dato viento', async () => {
        const response = await request(app)
            .post('/api/v1/datosViento')
            .set("Authorization", `Bearer ${global.testToken}`)
            .send({ ...datoVientoMock, sonda: sondaId })
            .expect(201)
        datoVientoId = response.body.data._id;
        expect(response.body.data.velocidadViento).toBe(120);
    });

    //GET (ALL)
    it('debe obtener todos los datos de viento', async () => {
        const response = await request(app)
            .get('/api/v1/datosViento')
            .set('Authorization', `Bearer ${global.testToken}`)
            .expect(200)
        expect(Array.isArray(response.body.data)).toBe(true);
    });

    //STATS
    it('debe obtener estadísticas de datos de viento', async () => {
        const response = await request(app)
            .get('/api/v1/datosViento/stats')
            .set('Authorization', `Bearer ${global.testToken}`)
            .expect(200)
        expect(response.body.error).toBe(false);
    });

    //GET BY ID
    it('debe obtener datos de viento por ID', async () => {
        const response = await request(app)
            .get(`/api/v1/datosViento/${datoVientoId}`)
            .set('Authorization', `Bearer ${global.testToken}`)
            .expect(200)
        expect(response.body.data._id).toBe(datoVientoId);
    });

    // UPDATE
    it("debe actualizar datos de viento", async () => {
        const response = await request(app)
            .put(`/api/v1/datosViento/${datoVientoId}`)
            .set("Authorization", `Bearer ${global.testToken}`)
            .send({ 
                velocidadViento: 120,
                velocidadRafagas: 200,
                fechaMedicion: "2025-11-02",
                horaMedicion: "13:00",
                sonda: sondaId,
                direccionViento: "S" 
            })
            .expect(200)
        expect(response.body.data.direccionViento).toBe("S");
    });

    //DELETE
    it('debe eliminar datos de viento', async () => {
        const response = await request(app)
            .delete(`/api/v1/datosViento/${datoVientoId}`)
            .set('Authorization', `Bearer ${global.testToken}`)
            .expect(200)
        expect(response.body.error).toBe(false)
    });
});