/* Importado de Bibliotecas */
//Bibliotecas externas
const express = require("express");
const { body } = require("express-validator");

// Bibliotecas propias
const {
    loginUser,
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require("../controllers/usuarios.controller");
const { authenticateJWT } = require("../utils/handleJWT.utils");
const { validateResults } = require("../utils/handleValidator.utils");

/* Declaraciones Constantes */
const router = express.Router();

/* Validaciones */
const userValidator = [
    body("nombreUsuario").isLength({ min: 3 }),
    body("email").isEmail(),
    body("contrasena").isLength({ min: 6 })
];

const loginValidator = [
    body("email").isEmail(),
    body("contrasena").isLength({ min: 6 })
];

/* Definición de rutas */
//LOGIN
/**
 * @openapi
 * /api/usuarios/login:
 *  post:
 *      tags:
 *      -  User
 *      summary: Login de usuario
 *      description: ''
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/login"
 *      responses:
 *          '200':
 *              description: JWT generado
 *          '401':
 *              description: Credenciales incorrectas
 */
router.post("/login", loginValidator,validateResults, loginUser);

// GET ALL
/**
 * @openapi
 * /api/usuarios:
 *  get:
 *      tags:
 *      -  User
 *      summary: Get all usuarios
 *      description: ''
 *      responses:
 *          '200':
 *              description: Devuelve la lista de usuarios
 *      security:
 *          - bearerAuth: []
 */
router.get("/", authenticateJWT, getUsers);

//GET BY ID
/**
 * @openapi
 * /api/usuarios/{id}:
 *  get:
 *      tags:
 *      -  User
 *      summary: Get usuario by ID
 *      description: ''
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *                  type: string
 *      responses:
 *          '200':
 *              description: Devuelve el usuario
 *      security:
 *          - bearerAuth: []
 */
router.get("/:id", authenticateJWT, getUserById);

//CREATE
/**
 * @openapi
 * /api/usuarios:
 *  post:
 *      tags:
 *      -  User
 *      summary: Create usuario
 *      description: ''
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/user"
 *      responses:
 *          '201':
 *              description: Usuario creado
 *      security:
 *          - bearerAuth: []
 */
router.post("/", userValidator, validateResults, createUser);

//UPDATE
/**
 * @openapi
 * /api/usuarios/{id}:
 *  put:
 *      tags:
 *      -  User
 *      summary: Update usuario
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
 *                      $ref: "#/components/schemas/user"
 *      responses:
 *          '200':
 *              description: Usuario actualizado
 *      security:
 *          - bearerAuth: []
 */
router.put("/:id", authenticateJWT, userValidator, validateResults, updateUser);

//DELETE
/**
 * @openapi
 * /api/usuarios/{id}:
 *  delete:
 *      tags:
 *      -  User
 *      summary: Delete usuario (lógico)
 *      description: ''
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *                  type: string
 *      responses:
 *          '200':
 *              description: Usuario eliminado lógicamente
 *      security:
 *          - bearerAuth: []
 */
router.delete("/:id", authenticateJWT, deleteUser);

/* Exportado de Módulo */
module.exports = router;