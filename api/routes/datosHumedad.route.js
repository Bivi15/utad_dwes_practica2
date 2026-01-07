/* Importado de Bibliotecas */
//Bibliotecas externas
const express = require("express");
const { body } = require("express-validator");

// Bibliotecas propias
const {
    getHumedades,
    getHumedadById,
    createHumedad,
    updateHumedad,
    deleteHumedad,
    getStats
} = require("../controllers/datosHumedad.controller");
const { authenticateJWT } = require("../utils/handleJWT.utils");
const { validateResults } = require("../utils/handleValidator.utils");

/* Declaraciones Constantes */
const router = express.Router();

/* Validaciones */
const humedadValidator = [
    body("humedad").isInt({ min: 0, max: 100 }),
    body("puntoRocio").isNumeric(),
    body("sonda").isMongoId(),
    body("fechaMedicion").isISO8601(),
    body("horaMedicion").matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
];

/* Definición de rutas */
// GET ALL
/**
 * @openapi
 * /api/datosHumedad:
 * get:
 *      tags:
 *      -  Datos Humedad
 *      summary: Get all datos humedad
 *      description: ''
 *      responses:
 *          '200':
 *              description: Devuelve todos los registros
 */
router.get("/", getHumedades);

//Estadísticas
/**
 * @openapi
 * /api/datosCalidadAire/stats:
 *  get:
 *      tags:
 *      -  Datos Humedad
 *      summary: Get estadísticas de los datos
 *      description: ''
 *      responses:
 *          '200':
 *              description: Devuelve estadísticas de humedad
 */
router.get("/stats", getStats);

//GET BY ID
/**
 * @openapi
 * /api/datosHumedad/{id}:
 *  get:
 *      tags:
 *      -  Datos Humedad
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
router.get("/:id", getHumedadById);

//CREATE
/**
 * @openapi
 * /api/datosHumedad:
 *  post:
 *      tags:
 *      -  Datos Humedad
 *      summary: Create datos humedad
 *      description: ''
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/datosHumedad"
 *      responses:
 *          '201':
 *              description: Registro creado
 *      security:
 *          - bearerAuth: []
 */
router.post("/", authenticateJWT,humedadValidator,validateResults, createHumedad);

//UPDATE
/**
 * @openapi
 * /api/datosHumedad/{id}:
 *  put:
 *      tags:
 *      -  Datos Humedad
 *      summary: Update datos humedad
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
 *                      $ref: "#/components/schemas/datosHumedad"
 *      responses:
 *          '200':
 *              description: Registro actualizado
 *      security:
 *          - bearerAuth: []
 */
router.put("/:id", authenticateJWT,humedadValidator,validateResults, updateHumedad);

//DELETE
/**
 * @openapi
 * /api/datosHumedad/{id}:
 *  delete:
 *      tags:
 *      -  Datos Humedad
 *      summary: Delete datos humedad (lógico)
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
router.delete("/:id", authenticateJWT, deleteHumedad);

/* Exportado de Módulo */
module.exports = router;