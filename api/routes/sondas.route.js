/* Importado de Bibliotecas */
//Bibliotecas externas
const express = require("express");
const { body } = require("express-validator");

// Bibliotecas propias
const {
    getSondas,
    getSondaById,
    createSonda,
    updateSonda,
    deleteSonda
} = require("../controllers/sondas.controller");
const { authenticateJWT } = require("../utils/handleJWT.utils");
const { validateResults } = require("../utils/handleValidator.utils");

/* Declaraciones Constantes */
const router = express.Router();

/* Validaciones */
const sondaValidator = [
    body("nombreSonda").isLength({ min: 3 }),
    body("localizacion").notEmpty()
];

/* Definición de rutas */
// GET ALL
/**
 * @openapi
 * /api/sondas:
 *  get:
 *      tags:
 *      -  Sondas
 *      summary: Get all sondas
 *      description: ''
 *      responses:
 *          '200':
 *              description: Lista de sondas
 */
router.get("/", getSondas);

//GET BY ID
/**
 * @openapi
 * /api/usuarios/{id}:
 *  get:
*      tags:
*      -  Sondas
*      summary: Get sonda by ID
*      description: ''
*      parameters:
*          - in: path
*            name: id
*            required: true
*            schema:
*                  type: string
*      responses:
*          '200':
*              description: Devuelve una sonda
 */
router.get("/:id", getSondaById);

//CREATE
/**
 * @openapi
 * /api/sondas:
 *  post:
 *      tags:
 *      -  Sondas
 *      summary: Create sonda
 *      description: ''
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/sonda"
 *      responses:
 *          '201':
 *              description: Sonda creada
 *      security:
 *          - bearerAuth: []
 */
router.post("/", authenticateJWT, sondaValidator, validateResults, createSonda);

//UPDATE
/**
 * @openapi
 * /api/sondas/{id}:
 *  put:
 *      tags:
 *      -  Sondas
 *      summary: Update sonda
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
 *                      $ref: "#/components/schemas/sonda"
 *      responses:
 *          '200':
 *              description: Sonda actualizada
 *      security:
 *          - bearerAuth: []
 */
router.put("/:id", authenticateJWT, sondaValidator, validateResults, updateSonda);

//DELETE
/**
 * @openapi
 * /api/sondas/{id}:
 *  delete:
 *      tags:
 *      -  Sondas
 *      summary: Delete sonda (lógico)
 *      description: ''
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *                  type: string
 *      responses:
 *          '200':
 *              description: Sanda eliminada lógicamente
 *      security:
 *          - bearerAuth: []
 */
router.delete("/:id", authenticateJWT, deleteSonda);

/* Exportado de Módulo */
module.exports = router;