/* Importado de Bibliotecas */
const request = require('supertest');
const app = require('../app');

/* Tests unitarios para usuarioas */
describe('sondas', () => {
    let sondaId;

    //CREATE
    it('debe crear una sonda', async () => {
        const response = await request(app)
            .post('/api/v1/sondas')
            .set("Authorization", `Bearer ${global.testToken}`)
            .send({
                nombreSonda: "Sonda Jest",
                descripcionSonda: "Test",
                localizacion: "Madrid"
            })
            .expect(201)
        sondaId = response.body.data._id;
    });

    //Get (ALL)
    it('debe obtener sondas', async () => {
        const response = await request(app)
            .get('/api/v1/sondas')
            .set('Authorization', `Bearer ${global.testToken}`)
            .expect(200)
        expect(Array.isArray(response.body.data)).toBe(true);
    });

    //Get by ID
    it('debe obtener sonda por ID', async () => {
        const response = await request(app)
            .get(`/api/v1/sondas/${sondaId}`)
            .set('Authorization', `Bearer ${global.testToken}`)
            .expect(200)
        expect(response.body.data._id).toBe(sondaId);
    });

    // UPDATE
    it("debe actualizar sonda", async () => {
        const response = await request(app)
            .put(`/api/v1/sondas/${sondaId}`)
            .set("Authorization", `Bearer ${global.testToken}`)
            .send({ 
                nombreSonda: "Sonda Jest",
                localizacion: "Madrid",
                descripcionSonda: "Sonda actualizado" })
            .expect(200)
        expect(response.body.data.descripcionSonda).toBe("Sonda actualizado");
    });

    //DELETE
    it('debe eliminar sonda', async () => {
        const response = await request(app)
            .delete(`/api/v1/sondas/${sondaId}`)
            .set('Authorization', `Bearer ${global.testToken}`)
            .expect(200)
        expect(response.body.error).toBe(false)
    });
});