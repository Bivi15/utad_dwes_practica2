/* Importado de Bibliotecas */
//Bibliotecas externas
const express = require("express");
const { body } = require("express-validator");

// Bibliotecas propias
const {
    getArchivos,
    getArchivoById,
    createArchivo,
    updateArchivo,
    deleteArchivo
} = require("../controllers/archivos.controller");
const { authenticateJWT } = require("../utils/handleJWT.utils");
const { validateResults } = require("../utils/handleValidator.utils");

/* Declaraciones Constantes */
const router = express.Router();

/* Validaciones*/
const archivoValidator = [
    body("sonda").isMongoId(),
    body("localizacion").isString().notEmpty(),
    body("urlImagen").isURL(),
    body("fechaCaptura").isISO8601()
];

/* Definición de rutas */
// GET ALL
/**
 * @swagger
 * /api/archivos:
 *  get:
 *    tags:
 *      -  Archivos
 *    summary: Get all archivos
 *    description: ''
 *    responses:
 *      '200':
 *        description: Lista de archivos
 */
router.get("/", getArchivos);

//GET BY ID
/**
 * @swagger
 * /api/archivos/{id}:
 *   get:
 *    tags:
 *      -  Archivos
 *    summary: Get archivo by ID
 *    description: ''
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: Devuelve un archivo
 */
router.get("/:id", getArchivoById);

//CREATE
/**
 * @swagger
 * /api/archivos:
 *   post:
 *     tags:
 *      -  Archivos
 *     summary: Create archivo
 *     description: ''
 *     requestBody:
 *         content:
 *             application/json:
 *                 schema:
 *                     $ref: "#/components/schemas/archivo"
 *     responses:
 *         '201':
 *             description: Archivo creado
 *     security:
 *         - bearerAuth: []
 */
router.post("/", authenticateJWT, archivoValidator, validateResults, createArchivo);

//UPDATE
/**
 * @swagger
 * /api/archivos/{id}:
 *  put:
*      tags:
*      -  Archivos
*      summary: Update archivo
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
*                      $ref: "#/components/schemas/archivo"
*      responses:
*          '200':
*              description: Archivo actualizado
*      security:
*          - bearerAuth: []
 */
router.put("/:id", authenticateJWT, archivoValidator, validateResults, updateArchivo);

//DELETE
/**
 * @swagger
 * /api/archivos/{id}:
 * delete:
 *      tags:
 *      -  Archivos
 *      summary: Delete archivo (lógico)
 *      description: ''
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *                  type: string
 *      responses:
 *          '200':
 *              description: Archivo eliminado lógicamente
 *      security:
 *          - bearerAuth: []
 */
router.delete("/:id", authenticateJWT, deleteArchivo);

/* Exportado de Módulo */
module.exports = router;