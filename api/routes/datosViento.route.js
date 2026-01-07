/* Importado de Bibliotecas */
//Bibliotecas externas
const express = require("express");
const { body } = require("express-validator");


// Bibliotecas propias
const {
    getVientos,
    getVientoById,
    createViento,
    updateViento,
    deleteViento,
    getStats
} = require("../controllers/datosViento.controller");
const { authenticateJWT } = require("../utils/handleJWT.utils");
const { validateResults } = require("../utils/handleValidator.utils");

/* Declaraciones Constantes */
const router = express.Router();

/* Validaciones */
const vientoValidator = [
    body("velocidadViento").isFloat({ min: 0 }),
    body("velocidadRafagas").isFloat({ min: 0 }),
    body("direccionViento").isIn(["N", "NE", "E", "SE", "S", "SW", "W", "NW"]),
    body("sonda").isMongoId(),
    body("fechaMedicion").isISO8601(),
    body("horaMedicion").matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
];

/* Definición de rutas */
// GET ALL
/**
 * @openapi
 * /api/datosViento:
 *  get:
 *      tags:
 *      -  Datos Viento
 *      summary: Get all datos viento
 *      description: ''
 *      responses:
 *          '200':
 *              description: Devuelve todos los registros
 */
router.get("/", getVientos);

//Estadísticas
/**
 * @openapi
 * /api/datosViento/stats:
 *  get:
 *      tags:
 *      -  Datos Viento
 *      summary: Get estadísticas de los datos
 *      description: ''
 *      responses:
 *          '200':
 *              description: Devuelve estadísticas de viento
 */
router.get("/stats", getStats);

//GET BY ID
/**
 * @openapi
 * /api/datosViento/{id}:
 *  get:
 *      tags:
 *      -  Datos Viento
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
router.get("/:id", getVientoById);

//CREATE
/**
 * @openapi
 * /api/datosViento:
 *  post:
 *      tags:
 *      -  Datos Viento
 *      summary: Create datos viento
 *      description: ''
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/datosViento"
 *      responses:
 *          '201':
 *              description: Registro creado
 *      security:
 *          - bearerAuth: []
 */
router.post("/", authenticateJWT, vientoValidator, validateResults, createViento);

//UPDATE
/**
 * @openapi
 * /api/datosViento/{id}:
 *  put:
 *      tags:
 *      -  Datos Viento
 *      summary: Update datos viento
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
 *                      $ref: "#/components/schemas/datosViento"
 *      responses:
 *          '200':
 *              description: Registro actualizado
 *      security:
 *          - bearerAuth: []
 */
router.put("/:id", authenticateJWT, vientoValidator, validateResults, updateViento);

//DELETE
/**
 * @openapi
 * /api/datosViento/{id}:
 *  delete:
 *      tags:
 *      -  Datos Viento
 *      summary: Delete datos viento (lógico)
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
router.delete("/:id", authenticateJWT, deleteViento);

/* Exportado de Módulo */
module.exports = router;