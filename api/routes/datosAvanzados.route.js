/* Importado de Bibliotecas */
//Bibliotecas externas
const express = require("express");
const { body } = require("express-validator");

// Bibliotecas propias
const {
    getDatosAvanzados,
    getDatosAvanzadosById,
    createDatosAvanzados,
    updateDatosAvanzados,
    deleteDatosAvanzados,
    getStats
} = require("../controllers/datosAvanzados.controller");
const { authenticateJWT } = require("../utils/handleJWT.utils");
const { validateResults } = require("../utils/handleValidator.utils");

/* Declaraciones Constantes */
const router = express.Router();

/* Validaciones */
const datosAvanzadosValidator = [
    body("presion").isFloat({ min: 0 }),
    body("indiceUV").isInt({ min: 0, max: 10 }),
    body("indicePolen").isInt({ min: 0, max: 100 }),
    body("sonda").isMongoId(),
    body("fechaMedicion").isISO8601(),
    body("horaMedicion").matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
];

/* Definición de rutas */
// GET ALL
/**
 * @openapi
 * /api/datosAvanzados:
 *  get:
 *      tags:
 *      -  Datos Avanzados
 *      summary: Get all datos avanzados
 *      description: ''
 *      responses:
 *          '200':
 *              description: Devuelve todos los registros
 */
router.get("/", getDatosAvanzados);

//Estadísticas
/**
 * @openapi
 * /api/datosAvanzados/stats:
 *  get:
 *      tags:
 *      -  Datos Avanzados
 *      summary: Get estadísticas de los datos avanzados
 *      description: ''
 *      responses:
 *          '200':
 *              description: Devuelve estadísticas de datos
 */
router.get("/stats", getStats);

//GET BY ID
/**
 * @openapi
 * /api/datosAvanzados/{id}:
 *  get:
 *      tags:
 *      -  Datos Avanzados
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
router.get("/:id", getDatosAvanzadosById);

//CREATE
/**
 * @openapi
 * /api/datosAvanzados:
 *  post:
 *      tags:
 *      -  Datos Avanzados
 *      summary: Create datos avanzados
 *      description: ''
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/datosAvanzados"
 *      responses:
 *          '201':
 *              description: Registro creado
 *      security:
 *          - bearerAuth: []
 */
router.post("/", authenticateJWT, datosAvanzadosValidator, validateResults, createDatosAvanzados);

//UPDATE
/**
 * @openapi
 * /api/datosAvanzados/{id}:
 *  put:
 *      tags:
 *      -  Datos Avanzados
 *      summary: Update datos avanzados
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
 *                      $ref: "#/components/schemas/datosAvanzados"
 *      responses:
 *          '200':
 *              description: Registro actualizado
 *      security:
 *          - bearerAuth: []
 */
router.put("/:id", authenticateJWT, datosAvanzadosValidator, validateResults, updateDatosAvanzados);

//DELETE
/**
 * @openapi
 * /api/datosAvanzados/{id}:
 *  delete:
 *      tags:
 *      -  Datos avanzados
 *      summary: Delete datos avanzados (lógico)
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
router.delete("/:id", authenticateJWT, deleteDatosAvanzados);

/* Exportado de Módulo */
module.exports = router;