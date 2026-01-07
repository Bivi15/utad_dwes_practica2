/* Importado de Bibliotecas */
const sondasModel = require("../models/sondas.models");
const { meteoLogger } = require("../config/winstonLogger.config");
const { successResponse, errorResponse, BAD_REQUEST } = require("../utils/handleResponse.utils");

/* Codificación de Funciones */
// GET ALL 
const getSondas = async (req, res, next) => {
    try {
        const filter = { isDelete: false};
        if (req.query.localizacion) {
            filter.localizacion = {
                $regex: req.query.localizacion,
                $option: "i"
            };
        }
        const data = await sondasModel.find(filter);
        successResponse(res, data,null, 200);
    } catch (err) {
        next(err);
    }
};

//GET BY ID
const getSondaById = async (req, res, next) => {
    try{
        const data = await sondasModel.findOne({ _id: req.params.id, isDelete: false });

        if (!data){
            return errorResponse(res, "Sonda no encontrada", BAD_REQUEST);
        }
        successResponse(res, data);
    }catch (err) {
        next(err);
    }
};

//CREATE
const createSonda = async (req, res, next) => {
    try{
        const data = await sondasModel.create(req.body);
        meteoLogger.info("Sonda creada");
        successResponse(res, data,null, 201);
    }catch (err) {
        next(err);
    }
};

//UPDATE
const updateSonda = async (req, res, next) => {
    try{
        const data = await sondasModel.findOneAndUpdate({ _id: req.params.id, isDelete: false}, req.body, { new: true });
        if (!data){
            return errorResponse(res, "Sonda no encontrada", BAD_REQUEST);
        }
        meteoLogger.info("Sonda actualizada");
        successResponse(res, data);
    }catch (err) {
        next(err);
    }
};

//DELETE
const deleteSonda = async (req, res, next) => {
    try{
        const data = await sondasModel.findOneAndUpdate({_id: req.params.id, isDelete: false }, { isDelete: true }, { new: true });
        if (!data) {
            return errorResponse(res, "Sonda no encontrada", BAD_REQUEST);
        }

        meteoLogger.warn("Sonda eliminada");
        res.json({ error: false, message: "Sonda eliminada correctamente" });
    }catch (err) {
        next(err);
    }
};

/* Exportado de módulo */
module.exports = {
    getSondas,
    getSondaById,
    createSonda,
    updateSonda,
    deleteSonda
};