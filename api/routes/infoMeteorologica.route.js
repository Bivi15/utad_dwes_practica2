/* Importado de Bibliotecas */
//Bibliotecas externas
const express = require("express");
const { body } = require("express-validator");

// Bibliotecas propias
const {
    getInfo,
    getInfoById,
    createInfo,
    updateInfo,
    deleteInfo,
    getStats
} = require("../controllers/infoMeteorologico.controller");
const { authenticateJWT } = require("../utils/handleJWT.utils");
const { validateResults } = require("../utils/handleValidator.utils");

/* Declaraciones Constantes */
const router = express.Router();

/* Validaciones */
const infoValidator = [
    body("temperaturaReal").isNumeric(),
    body("sensacionTermica").isNumeric(),
    body("cubiertaNubes").isIn(["Soleado despejado", "Soleado nublado", "Lluvia", "Nieve", "Luna despejada", "Luna nublada"]),
    body("sonda").isMongoId(),
    body("fechaMedicion").isISO8601(),
];

/* Definición de rutas */
// GET ALL
/**
 * @openapi
 * /api/infoMeteorologica:
 *  get:
 *      tags:
 *      -  Info Meteorológica
 *      summary: Get all información meteorológica
 *      description: ''
 *      responses:
 *          '200':
 *              description: Devuelve todos los registros
 */
router.get("/", getInfo);

//Estadísticas
/**
 * @openapi
 * /api/infoMeteorologica/stats:
 *  get:
 *      tags:
 *      -  Info Meteorológica
 *      summary: Get estadísticas de la información meteorológica
 *      description: ''
 *      responses:
 *          '200':
 *              description: Devuelve estadísticas de info meteorológica
 */
router.get("/stats", getStats);

//GET BY ID
/**
 * @openapi
 * /api/infoMeteorologica/{id}:
 *  get:
 *      tags:
 *      -  Info Meteorológica
 *      summary: Get info by ID
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
router.get("/:id", getInfoById);

//CREATE
/**
 * @openapi
 * /api/infoMeteorologica:
 *  post:
 *      tags:
 *      -  Info Meteorológica
 *      summary: Create info
 *      description: ''
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/infoMeteorologica"
 *      responses:
 *          '201':
 *              description: Registro creado
 *      security:
 *          - bearerAuth: []
 */
router.post("/", authenticateJWT, infoValidator, validateResults, createInfo);

//UPDATE
/**
 * @openapi
 * /api/infoMeteorologica/{id}:
 *  put:
 *      tags:
 *      -  Info Meteorológica
 *      summary: Update info
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
 *                      $ref: "#/components/schemas/infoMeteorologica"
 *      responses:
 *          '200':
 *              description: Registro actualizado
 *      security:
 *          - bearerAuth: []
 */
router.put("/:id", authenticateJWT, infoValidator, validateResults, updateInfo);

//DELETE
/**
 * @openapi
 * /api/infoMeteorologica/{id}:
 *  delete:
 *      tags:
 *      -  Info Meteorológica
 *      summary: Delete info (lógico)
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
router.delete("/:id", authenticateJWT, deleteInfo);

/* Exportado de Módulo */
module.exports = router;