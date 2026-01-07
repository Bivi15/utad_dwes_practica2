/* Importado de Bibliotecas */
const request = require('supertest');
const app = require('../app');

/* Tests unitarios para usuarioas */
describe('usuarios', () => {
    
    //Get (ALL)
    it('debe obtener usuarios', async () => {
        const response = await request(app)
            .get('/api/v1/usuarios')
            .set('Authorization', `Bearer ${global.testToken}`)
            .expect(200)
        expect(Array.isArray(response.body.data)).toBe(true);
    });

    //Get by ID
    it('debe obtener usuario por ID', async () => {
        const response = await request(app)
            .get(`/api/v1/usuarios/${global.testUserId}`)
            .set('Authorization', `Bearer ${global.testToken}`)
            .expect(200)
        expect(response.body.data._id).toBe(global.testUserId);
    });

    // UPDATE
    it("debe actualizar usuario", async () => {
        const response = await request(app)
            .put(`/api/v1/usuarios/${global.testUserId}`)
            .set("Authorization", `Bearer ${global.testToken}`)
            .send({ 
                nombreUsuario: "jest2",
                email: "jest2@test.com",
                contrasena: "1234567890",
                nombreCompleto: "Usuario actualizado"
             })
            .expect(200)
        expect(response.body.data.nombreCompleto).toBe("Usuario actualizado");
    });

    //DELETE
    it('debe eliminar usuario', async () => {
        const response = await request(app)
            .delete(`/api/v1/usuarios/${global.testUserId}`)
            .set('Authorization', `Bearer ${global.testToken}`)
            .expect(200)
        expect(response.body.error).toBe(false)
    });
});