/* Importado de Bibliotecas */
//Bibliotecas externas
const express = require("express");
const { body } = require("express-validator");

// Bibliotecas propias
const {
    getCalidades,
    getCalidadById,
    createCalidad,
    updateCalidad,
    deleteCalidad,
    getStats
} = require("../controllers/datosCalidadAire.controller");
const { authenticateJWT } = require("../utils/handleJWT.utils");
const { validateResults } = require("../utils/handleValidator.utils");

/* Declaraciones Constantes */
const router = express.Router();

/* Validaciones */
const calidadAireValidator = [
    body("indiceCalidad").isInt({ min: 0, max: 100 }),
    body("ozono_ppb").isNumeric().isFloat({ min: 0 }),
    body("particulasPequenas_ugm3").isFloat({ min: 0 }),
    body("particulasGrandes_ugm3").isFloat({ min: 0 }),
    body("dioxidoNitrogeno_ppb").isFloat({ min: 0 }),
    body("monoxidoCarbono_ppb").isFloat({ min: 0 }),
    body("monoxidoCarbono_ppb").isFloat({ min: 0 }),
    body("dioxidoAzufre_ppb").isFloat({ min: 0 }),
    body("sonda").isMongoId(),
    body("fechaMedicion").isISO8601(),
    body("horaMedicion").matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
];

/* Definición de rutas */
// GET ALL
/**
 * @openapi
 * /api/datosCalidadAire:
 *  get:
 *      tags:
 *      -  Datos Calidad Aire
 *      summary: Get all datos calidad aire
 *      description: ''
 *      responses:
 *          '200':
 *              description: Devuelve todos los registros
 */
router.get("/", getCalidades);

//Estadísticas
/**
 * @openapi
 * /api/datosCalidadAire/stats:
 *  get:
 *      tags:
 *      -  Datos Calidad Aire
 *      summary: Get estadísticas de los datos
 *      description: ''
 *      responses:
 *          '200':
 *              description: Devuelve estadísticas de calidad de aire
 */
router.get("/stats", getStats);

//GET BY ID
/**
 * @openapi
 * /api/datosCalidadAire/{id}:
 *  get:
 *      tags:
 *      -  Datos Calidad Aire
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
router.get("/:id", getCalidadById);

//CREATE
/**
 * @openapi
 * /api/datosCalidadAire:
 *  post:
 *      tags:
 *      -  Datos Calidad Aire
 *      summary: Create datos calidad aire
 *      description: ''
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/datosCalidadAire"
 *      responses:
 *          '201':
 *              description: Registro creado
 *      security:
 *          - bearerAuth: []
 */
router.post("/", authenticateJWT, calidadAireValidator, validateResults, createCalidad);

//UPDATE
/**
 * @openapi
 * /api/datosCalidadAire/{id}:
 *  put:
 *      tags:
 *      -  Datos Calidad Aire
 *      summary: Update datos calidad aire
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
 *                      $ref: "#/components/schemas/datosCalidadAire"
 *      responses:
 *          '200':
 *              description: Registro actualizado
 *      security:
 *          - bearerAuth: []
 */
router.put("/:id", authenticateJWT, calidadAireValidator, validateResults, updateCalidad);

//DELETE
/**
 * @openapi
 * /api/datosCalidadAire/{id}:
 *  delete:
 *      tags:
 *      -  Datos calidad aire
 *      summary: Delete datos calidad aire (lógico)
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
router.delete("/:id", authenticateJWT, deleteCalidad);

/* Exportado de Módulo */
module.exports = router;