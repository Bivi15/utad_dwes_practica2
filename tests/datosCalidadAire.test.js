/* Importado de Bibliotecas */
const request = require('supertest');
const app = require('../app');

/* Tests unitarios para usuarioas */
describe('datos calidad aire', () => {
    let calidadId;
    let sondaId;
    
    const datoCalidadMock = {
        indiceCalidad: 25,
        ozono_ppb: 13,
        particulasPequenas_ugm3: 34,
        particulasGrandes_ugm3: 54,
        dioxidoNitrogeno_ppb: 23,
        monoxidoCarbono_ppb: 43,
        dioxidoAzufre_ppb: 56,
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
    it('debe crear datos calidad del aire', async () => {
        const response = await request(app)
            .post('/api/v1/datosCalidadAire')
            .set("Authorization", `Bearer ${global.testToken}`)
            .send({ ...datoCalidadMock, sonda: sondaId })
            .expect(201)
        calidadId = response.body.data._id;
        expect(response.body.data.monoxidoCarbono_ppb).toBe(43);
    });

    //GET (ALL)
    it('debe obtener todos los datos de calidad del aire', async () => {
        const response = await request(app)
            .get('/api/v1/datosCalidadAire')
            .set('Authorization', `Bearer ${global.testToken}`)
            .expect(200)
        expect(Array.isArray(response.body.data)).toBe(true);
    });

    //STATS
    it('debe obtener estadísticas de datos caliad de aire', async () => {
        const response = await request(app)
            .get('/api/v1/datosCalidadAire/stats')
            .set('Authorization', `Bearer ${global.testToken}`)
            .expect(200)
        expect(response.body.error).toBe(false);
    });

    //GET BY ID
    it('debe obtener datos calidad de aire por ID', async () => {
        const response = await request(app)
            .get(`/api/v1/datosCalidadAire/${calidadId}`)
            .set('Authorization', `Bearer ${global.testToken}`)
            .expect(200)
        expect(response.body.data._id).toBe(calidadId);
    });

    // UPDATE
    it("debe actualizar datos calidad de aire", async () => {
        const response = await request(app)
            .put(`/api/v1/datosCalidadAire/${calidadId}`)
            .set("Authorization", `Bearer ${global.testToken}`)
            .send({ 
                indiceCalidad: 25,
                ozono_ppb: 20,
                particulasPequenas_ugm3: 34,
                particulasGrandes_ugm3: 54,
                dioxidoNitrogeno_ppb: 23,
                monoxidoCarbono_ppb: 43,
                dioxidoAzufre_ppb: 56,
                sonda: sondaId,
                fechaMedicion: "2025-11-02",
                horaMedicion: "13:59"
            })
            .expect(200)
        expect(response.body.data.ozono_ppb).toBe(20);
    });    

    //DELETE
    it('debe eliminar datos avanzados', async () => {
        const response = await request(app)
            .delete(`/api/v1/datosCalidadAire/${calidadId}`)
            .set('Authorization', `Bearer ${global.testToken}`)
            .expect(200)
        expect(response.body.error).toBe(false)
    });
});