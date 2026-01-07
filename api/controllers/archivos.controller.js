/* Importado de Bibliotecas */
const archivosModel = require("../models/archivos.models");
const { archivoLogger } = require("../config/winstonLogger.config");
const { successResponse, errorResponse, BAD_REQUEST } = require("../utils/handleResponse.utils");

/* Codificación de Funciones */
// GET ALL 
const getArchivos = async (req, res, next) => {
    try {
        const filter = { isDelete: false };
        if (req.query.localizacion) filter.localizacion = req.query.localizacion;
        if (req.query.sonda) filter.sonda = req.query.sonda;
        if (req.query.fechaInicio && req.query.fechaFin) {
            filter. fechaCaptura = {
                $gte: new Date (req.query.fechaInicio),
                $lte: new Date (req.query.fechaFin)
            };
        }

        const data = await archivosModel.find(filter);
        archivoLogger.info("Listado de archivos obtenido");
        successResponse(res, data);
    } catch (err) {
        next(err);
    }
};

//GET BY ID
const getArchivoById = async (req, res, next) => {
    try{
        const data = await archivosModel.findOne({
            _id: req.params.id,
            isDelete: false
        });

        if (!data)
            return errorResponse(res, "Archivo no encontrado", BAD_REQUEST);
        successResponse(res, data);
    }catch (err) {
        next(err);
    }
};

//CREATE
const createArchivo = async (req, res, next) => {
    try{
        const data = await archivosModel.create(req.body);
        archivoLogger.info("Archivo creado");
        successResponse(res, data,null, 201);
    }catch (err) {
        next(err);
    }
};

//UPDATE
const updateArchivo = async (req, res, next) => {
    try{
        const data = await archivosModel.findOneAndUpdate(
            { _id: req.params.id, isDelete: false },
            req.body,
            { new: true }
        );
        if (!data) {
            return errorResponse(res, "Archivo no encontrado", BAD_REQUEST);
        }
        archivoLogger.info("Archivo actualizado");
        successResponse(res, data);
    }catch (err) {
        next(err);
    }
};

//DELETE (lógico)
const deleteArchivo = async (req, res, next) => {
    try{
        const data = await archivosModel.findOneAndUpdate(
            { _id: req.params.id, isDelete: false },
            { isDelete : true },
            { new: true }
        );

        if (!data){
            return errorResponse(res, "Archivo no encontrado", BAD_REQUEST);
        }
        archivoLogger.warn("Archivo eliminado lógicamente");
        res.json({ error: false, message: "Archivo eliminado correctamente" });
    }catch (err) {
        next(err);
    }
};

/* Exportado de módulo */
module.exports = {
    getArchivos,
    getArchivoById,
    createArchivo,
    updateArchivo,
    deleteArchivo
};