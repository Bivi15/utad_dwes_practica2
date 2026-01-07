/* Importado de Bibliotecas */
const request = require('supertest');
const app = require('../app');

/* Tests unitarios para usuarioas */
describe('datos avanzados', () => {
    let infoId;
    let sondaId;
    
    const infoMock = {
        temperaturaReal: 25,
        sensacionTermica: 26,
        cubiertaNubes: "Soleado nublado",
        sonda: sondaId,
        fechaMedicion: "2025-11-02T15:30:00.000Z"
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
    it('debe crear información meteorológica', async () => {
        const response = await request(app)
            .post('/api/v1/infoMeteorologica')
            .set("Authorization", `Bearer ${global.testToken}`)
            .send({ ...infoMock, sonda: sondaId})
            .expect(201)
        infoId = response.body.data._id;
        expect(response.body.data.temperaturaReal).toBe(25);
    });

    //GET (ALL)
    it('debe obtener todos la información meteorológica', async () => {
        const response = await request(app)
            .get('/api/v1/infoMeteorologica')
            .set('Authorization', `Bearer ${global.testToken}`)
            .expect(200)
        expect(Array.isArray(response.body.data)).toBe(true);
    });

    //GET BY ID
    it('debe obtener información meteorológica por ID', async () => {
        const response = await request(app)
            .get(`/api/v1/infoMeteorologica/${infoId}`)
            .set('Authorization', `Bearer ${global.testToken}`)
            .expect(200)
        expect(response.body.data._id).toBe(infoId);
    });

    // UPDATE
    it("debe actualizar información meteorológica", async () => {
        const response = await request(app)
            .put(`/api/v1/infoMeteorologica/${infoId}`)
            .set("Authorization", `Bearer ${global.testToken}`)
            .send({ 
                temperaturaReal: 23,
                sensacionTermica: 26,
                cubiertaNubes: "Lluvia",
                sonda: sondaId,
                fechaMedicion: "2025-11-02T15:30:00.000Z"
             })
            .expect(200)
        expect(response.body.data.cubiertaNubes).toBe("Lluvia");
    })

    //DELETE
    it('debe eliminar información meteorológica', async () => {
        const response = await request(app)
            .delete(`/api/v1/infoMeteorologica/${infoId}`)
            .set('Authorization', `Bearer ${global.testToken}`)
            .expect(200)
        expect(response.body.error).toBe(false)
    });
});