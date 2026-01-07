/* Importado de Bibliotecas */
//Bibliotecas externas
const express = require("express");
const { body } = require("express-validator");

// Bibliotecas propias
const {
    getPrecipitaciones,
    getPrecipitacionById,
    createPrecipitacion,
    updatePrecipitacion,
    deletePrecipitacion,
    getStats
} = require("../controllers/datosPrecipitacion.controller");
const { authenticateJWT } = require("../utils/handleJWT.utils");
const { validateResults } = require("../utils/handleValidator.utils");

/* Declaraciones Constantes */
const router = express.Router();

/* Validaciones */
const precipitacionValidator= [
    body("tipoPrecipitacion").isIn(["Agua", "Nieve", "Granizo"]),
    body("probabilidadPrecipitacion").isInt({ min: 0, max: 100 }),
    body("precipitacionAcumulada").isFloat({ min: 0 }),
    body("sonda").isMongoId(),
    body("fechaMedicion").isISO8601(),
    body("horaMedicion").matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
];

/* Definición de rutas */
// GET ALL
/**
 * @openapi
 * /api/datosPrecipitacion:
 *  get:
 *      tags:
 *      -  Datos Precipitación
 *      summary: Get all datos precipitacion
 *      description: ''
 *      responses:
 *          '200':
 *              description: Devuelve todos los registros
 */
router.get("/", getPrecipitaciones);

//Estadísticas
/**
 * @openapi
 * /api/datosPrecipitacion/stats:
 *  get:
 *      tags:
 *      -  Datos Precipitación
 *      summary: Get estadísticas de los datos
 *      description: ''
 *      responses:
 *          '200':
 *              description: Devuelve estadísticas de precipitación
 */
router.get("/stats", getStats);

//GET BY ID
/**
 * @openapi
 * /api/datosPrecipitacion/{id}:
 *  get:
 *      tags:
 *      -  Datos Precipitación
 *      summary: Get datos by ID
 *      description: ''
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *                  type: string
 *      responses:
 *          '200':
 *              description: Devuelve un registro específico
 */
router.get("/:id", getPrecipitacionById);

//CREATE
/**
 * @openapi
 * /api/datosPrecipitacion:
 *  post:
 *      tags:
 *      -  Datos Precipitación
 *      summary: Create datos precipitacion
 *      description: ''
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/datosPrecipitacion"
 *      responses:
 *          '201':
 *              description: Registro creado
 *      security:
 *          - bearerAuth: []
 */
router.post("/", authenticateJWT, precipitacionValidator, validateResults, createPrecipitacion);

//UPDATE
/**
 * @openapi
 * /api/datosPrecipitacion/{id}:
 *  put:
 *      tags:
 *      -  Datos Precipitación
 *      summary: Update datos precipitacion
 *      description: ''
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *                  type: string
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/datosPrecipitacion"
 *      responses:
 *          '200':
 *              description: Registro actualizado
 *      security:
 *          - bearerAuth: []
 */
router.put("/:id", authenticateJWT, precipitacionValidator, validateResults, updatePrecipitacion);

//DELETE
/**
 * @openapi
 * /api/datosPrecipitacion/{id}:
 *  delete:
 *      tags:
 *      -  Datos Precipitación
 *      summary: Delete datos precipitacion (lógico)
 *      description: ''
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *                  type: string
 *      responses:
 *          '200':
 *              description: Registro eliminado lógicamente
 *      security:
 *          - bearerAuth: []
 */
router.delete("/:id", authenticateJWT, deletePrecipitacion);

/* Exportado de Módulo */
module.exports = router;