/* Importado de Bibliotecas */
const swagger = require("swagger-jsdoc");

/*Opciones de Swagger */
const options = {
    definition: {
        openapi: "3.0.3",
        info: {
            title: "API Meteorológica",
            version: "0.1.0",
            description: 
                "API REST para gestión meteorológica",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
            contact: {
                name: "Sandra",
                url: "URL de contacto",
                email: "sandra@gmail.com"
            }
        },
        servers: [
            {
                url: "http://localhost:3000/api/v1",
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }  
            },
            schemas: {
                usuarios: {
                    type: "object",
                    required: ["nombreUsuario", "email", "contrasena"],
                    properties: {
                        nombreUsuario: { type: "string", example: "usuario1" },
                        nombreCompleto: { type: "string", example: "Juan Perez" },
                        email: { type: "string", example: "juan@example.com" },
                        contrasena: { type: "string", example: "contrasena1234" }
                    }
                },
                sonda: {
                    type: "object",
                    required: ["nombreSonda", "localizacion"],
                    properties: {
                        nombreSonda: { type: "string", example: "Sonda Norte" },
                        descriptionSonda: { type: "string", example: "Zona norte" },
                        localizacion: { type: "string", example: "Madrid" }
                    }
                },
                archivo: {
                    type: "object",
                    required: ["sonda", "localizacion", "urlImagen", "fechaCaptura"],
                    properties: {
                        sonda: { type: "string", example: "12ab3456" },
                        localizacion: { type: "string", example: "Valencia" },
                        urlImagen: { type: "string", example: "https://imagen.com/img.jpg" },
                        fechaCaptura: { type: "string", format: "date-time" }
                    }
                },
                datosAvanzados: {
                    type: "object",
                    properties: {
                        presion: { type: "number", example: 1013 },
                        indiceUV: { type: "number", example: 6 },
                        indicePolen: { type: "number", example: 30 },
                        sonda: { type: "string" },
                        fechaMedicion: { type: "string", format: "date" },
                        horaMedicion: { type: "string", example: "14:30" }
                    }
                },
                calidadAire: {
                    type: "object",
                    properties: {
                        indiceCalidad: { type: "number", example: 70 },
                        ozono_ppb: { type: "number", example: 40 },
                        particulasPequenas_ugm3: { type: "number", example: 20 },
                        particulasGrandes_ugm3: { type: "number", example: 10 },
                        dioxidoNitrogeno_ppb: { type: "number", example: 30 },
                        monoxidoCarbono_ppb: { type: "number", example: 5 },
                        dioxidoAzufre_ppb: { type: "number", example: 2 },
                        sonda: { type: "string" },
                        fechaMedicion: { type: "string", format: "date" }
                    }
                },
                humedad: {
                    type: "object",
                    properties: {
                        humedad: { type: "number", example: 60 },
                        puntoRocio: { type: "number", example: 12 },
                        sonda: { type: "string" },
                        fechaMedicion: { type: "string", format: "date" }
                    }
                },
                precipitacion: {
                    type: "object",
                    properties: {
                        tipoPrecipitacion: { type: "string", example: "Agua" },
                        probabilidadPrecipitacion: { type: "number", example: 80 },
                        precipitacionAcumulada: { type: "number", example: 12 },
                        sonda: { type: "string" },
                        fechaMedicion: { type: "string", format: "date" }
                    }
                },
                viento: {
                    type: "object",
                    properties: {
                        velocidadViento: { type: "number", example: 15 },
                        velocidadRafagas: { type: "number", example: 30 },
                        direccionViento: { type: "string", example: "NE" },
                        sonda: { type: "string" },
                        fechaMedicion: { type: "string", format: "date" }
                    }
                },
                infoMeteorologica: {
                    type: "object",
                    properties: {
                        temperaturaReal: { type: "number", example: 22 },
                        sensacionTermica: { type: "number", example: 24 },
                        cubiertaNubes: { type: "string", example: "Soleado despejado" },
                        sonda: { type: "string" },
                        fechaMedicion: { type: "string", format: "date" }
                    }
                }
            }
        }
    },
    apis: ["./api/routes/*.route.js"]
};

/* Exportado de Módulos */
module.exports = swagger(options);