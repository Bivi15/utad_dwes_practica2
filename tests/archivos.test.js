/* Importado de Bibliotecas */
const request = require('supertest');
const app = require('../app');

/* Tests unitarios para usuarioas */
describe('archivos', () => {
    let archivoId;
    let sondaId;
    
    const archivoMock = {
        sonda: sondaId,
        localizacion: "Madrid",
        urlImagen: "http://ejemplo.com/foto2.jpg",
        fechaCaptura: "2025-11-02T10:00:00.000Z"
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
    it('debe crear un archivo', async () => {
        const response = await request(app)
            .post('/api/v1/archivos')
            .set("Authorization", `Bearer ${global.testToken}`)
            .send({...archivoMock, sonda: sondaId})
            .expect(201)
        archivoId = response.body.data._id;
        expect(response.body.data.localizacion).toBe("Madrid");
    });

    //GET (ALL)
    it('debe listar archivos', async () => {
        const response = await request(app)
            .get('/api/v1/archivos')
            .set('Authorization', `Bearer ${global.testToken}`)
            .expect(200)
        expect(Array.isArray(response.body.data)).toBe(true);
    });

    //GET BY ID
    it('debe obtener archivos por ID', async () => {
        const response = await request(app)
            .get(`/api/v1/archivos/${archivoId}`)
            .set('Authorization', `Bearer ${global.testToken}`)
            .expect(200)
        expect(response.body.data._id).toBe(archivoId);
    });

    // UPDATE
    it("debe actualizar archivos", async () => {
        const response = await request(app)
            .put(`/api/v1/archivos/${archivoId}`)
            .set("Authorization", `Bearer ${global.testToken}`)
            .send({ 
                sonda: sondaId,
                urlImagen: "http://ejemplo.com/foto2.jpg",
                fechaCaptura: "2025-11-02T10:00:00.000Z",
                localizacion: "Sevilla" 
            })
            .expect(200)
        expect(response.body.data.localizacion).toBe("Sevilla");
    });

    //DELETE
    it('debe eliminar archivo', async () => {
        const response = await request(app)
            .delete(`/api/v1/archivos/${archivoId}`)
            .set('Authorization', `Bearer ${global.testToken}`)
            .expect(200)
        expect(response.body.error).toBe(false)
    });
});