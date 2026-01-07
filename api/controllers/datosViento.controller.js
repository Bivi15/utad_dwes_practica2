/* Importado de Bibliotecas */
const datosVientoModel = require("../models/datosViento.models");
const { meteoLogger } = require("../config/winstonLogger.config");
const mongoose = require("mongoose");
const { successResponse, errorResponse, BAD_REQUEST } = require("../utils/handleResponse.utils");

/* Codificación de Funciones */
// GET ALL 
const getVientos = async (req, res, next) => {
    try {
        //Filtro por sonda
        const filter = { isDelete: false };
        if (req.query.sonda) filter.sonda = req.query.sonda;
        if (req.query.direccionViento) filter.direccionViento = req.query.direccionViento;
        if (req.query.fechaInicio && req.query.fechaFin) {
            filter. fechaMedicion = {
                $gte: new Date (req.query.fechaInicio),
                $lte: new Date (req.query.fechaFin)
            };
        }
        const data = await datosVientoModel.find(filter).populate('sonda');
        meteoLogger.info("Listado de datos de viento obtenido");
        successResponse(res, data);
    } catch (err) {
        next(err);
    }
};

//GET BY ID
const getVientoById = async (req, res, next) => {
    try{
        const data = await datosVientoModel.findOne({ _id: req.params.id, isDelete: false }).populate('sonda');
        if (!data){
            return errorResponse(res, "Medición no encontrada", BAD_REQUEST);
        }
        successResponse(res, data);
    }catch (err) {
        next(err);
    }
};

//CREATE
const createViento = async (req, res, next) => {
    try{
        const created = await datosVientoModel.create(req.body);
        const data = await datosVientoModel.findById(created._id).populate('sonda');
        meteoLogger.info("Medición de viento creada");
        successResponse(res, data,null, 201);
    }catch (err) {
        next(err);
    }
};

//UPDATE
const updateViento = async (req, res, next) => {
    try{
        const data = await datosVientoModel.findOneAndUpdate({ _id: req.params.id, isDelete: false }, req.body, { new: true }).populate('sonda');
        if (!data) {
            return errorResponse(res, "Medición no encontrada", BAD_REQUEST);
        }
        meteoLogger.info("Medición de viento actualizada");
        successResponse(res, data);
    }catch (err) {
        next(err);
    }
};

//DELETE (lógico)
const deleteViento = async (req, res, next) => {
    try{
        const data = await datosVientoModel.findOneAndUpdate({ _id: req.params.id, isDelete: false }, { isDelete: true }, { new: true });
        if (!data) {
            return errorResponse(res, "Medición no encontrada", BAD_REQUEST);
        }
        meteoLogger.warn("Medición de viento eliminada lógicamente");
        res.json({ error: false, message: "Medición eliminada correctamente"});
    }catch (err) {
        next(err);
    }
};

//Estadísticas
const getStats = async (req, res, next) => {
    try{
        const { fechaInicio, fechaFin, sonda } = req.query;
        const match = { isDelete: false };
        if (sonda) match.sonda = mongoose.Types.ObjectId(sonda);
        if (fechaInicio && fechaFin) {
            match.fechaMedicion = { $gte: new Date(fechaInicio), $lte: new Date(fechaFin) };
        }
        const stats = await datosVientoModel.aggregate([
            { $match:  match },
            {
                $group: {
                    _id: null,
                    min: { $min: "$velocidadViento" },
                    max: { $max: "$velocidadViento" },
                    avg: { $avg: "$velocidadViento" },
                    all: { $push: "$velocidadViento" }
                }
            }
        ]);
        if (!stats[0])
            return res.json({ error: false, stats: {} });
        const all = stats[0].all.sort((a,b) => a-b);
        const mid = Math.floor(all.length/2);
        const media = all.length % 2 === 0 ? (all[mid-1]+all[mid])/2 : all[mid];
        res.json({ error: false, stats: { min: stats[0].min, max: stats[0].max, avg: stats[0].avg, media} });
    }catch (err) {
        next(err);
    }
};

/* Exportado de módulo */
module.exports = {
    getVientos,
    getVientoById,
    createViento,
    updateViento,
    deleteViento,
    getStats
};