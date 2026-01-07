/* Importado de Bibliotecas */
const usuariosModel = require("../models/usuarios.model");
const { meteoLogger } = require("../config/winstonLogger.config");
const { hashPassword, comparePassword } = require("../utils/handlePassword.utils");
const { tokenSign } = require("../utils/handleJWT.utils");
const { successResponse, errorResponse, BAD_REQUEST } = require("../utils/handleResponse.utils");

/* Codificación de Funciones */


// LOGIN DE USUARIO
const loginUser = async (req, res, next) => {
    try {
        const { email, contrasena } = req.body;

        const user = await usuariosModel.findOne({ email, isDelete: false }).select("+contrasena");
        if (!user || !user.contrasena)
            return errorResponse(res, "Credenciales inválidas", BAD_REQUEST);

        const check = await comparePassword(contrasena, user.contrasena);
        if (!check)
            return errorResponse(res, "Credenciales inválidas", BAD_REQUEST);

        const token = tokenSign(user);

        successResponse(res, { token }, "Login exitoso");;
    } catch (err) {
        next(err);
    }
};

// GET ALL 
const getUsers = async (req, res, next) => {
    try {
        const data = await usuariosModel.find({ isDelete: false });
        successResponse(res, data);
    } catch (err) {
        console.error("ERROR EN CREARE USUARIO:", err);
        res.status(500).json({ error: true, message: err.message });
        next(err);
    }
};

//GET BY ID
const getUserById = async (req, res, next) => {
    try{
        if (req.user._id.toString() !== req.params.id)
            return errorResponse(res, "Acceso no autorizado", BAD_REQUEST);

        const data = await usuariosModel.findById(req.params.id);
        successResponse(res, data);
    }catch (err) {
        next(err);
    }
};

//CREATE
const createUser = async (req, res, next) => {
    try{
        console.log("REQ BODY:", req.body);
        const body = req.body;
        body.contrasena = await hashPassword(body.contrasena);
        const data = await usuariosModel.create(body);
        meteoLogger.info("Usuario creado");
        successResponse(res, data, "Usuario creado correctamente", 201);
    }catch (err) {
        if (err.code === 11000) {
            return errorResponse(res, "Usuario o email ya existente", BAD_REQUEST);
        }
        next(err);
    }
};

//UPDATE
const updateUser = async (req, res, next) => {
    try{
        const data = await usuariosModel.findOneAndUpdate({ _id: req.params.id, isDelete: false }, req.body, { new: true });
        if (!data){
            return errorResponse(res, "Usuario no encontrado", BAD_REQUEST);
        }
        successResponse(res, data);
    }catch (err) {
        next(err);
    }
};

//DELETE
const deleteUser = async (req, res, next) => {
    try{
        const data = await usuariosModel.findOneAndUpdate({ _id: req.params.id, isDelete: false }, { isDelete: true }, { new: true });
        if (!data) {
            return errorResponse(res, "Usuario no encontrado", BAD_REQUEST);
        }
        res.json({ error: false, message: "Usuario eliminado correctamente" });
    }catch (err) {
        next(err);
    }
};

/* Exportado de módulo */
module.exports = {
    loginUser,
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};