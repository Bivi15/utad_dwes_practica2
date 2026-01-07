/* Importado de Bibliotecas */
const datosAvanzadosModel = require("../models/datosAvanzados.models");
const { meteoLogger } = require("../config/winstonLogger.config");
const { mongoose } = require("mongoose");
const { successResponse, errorResponse, BAD_REQUEST } = require("../utils/handleResponse.utils");

/* Codificación de Funciones */
// GET ALL 
const getDatosAvanzados = async (req, res, next) => {
    try {
        //Filtro por sonda
        const filter = { isDelete: false };
        if (req.query.sonda) filter.sonda = req.query.sonda;
        if (req.query.fechaInicio && req.query.fechaFin) {
            filter. fechaMedicion = {
                $gte: new Date (req.query.fechaInicio),
                $lte: new Date (req.query.fechaFin)
            };
        }
        const data = await datosAvanzadosModel.find(filter).populate('sonda');
        meteoLogger.info("Listado de datos avanzados obtenido");
        successResponse(res, data);
    } catch (err) {
        next(err);
    }
};

//GET BY ID
const getDatosAvanzadosById = async (req, res, next) => {
    try{
        const data = await datosAvanzadosModel.findOne({ _id: req.params.id, isDelete: false }).populate('sonda');

        if (!data)
            return errorResponse(res, "Medición no encontrada", BAD_REQUEST);
        successResponse(res, data);
    }catch (err) {
        next(err);
    }
};

//CREATE
const createDatosAvanzados = async (req, res, next) => {
    try{
        const created = await datosAvanzadosModel.create(req.body);
        const data = await datosAvanzadosModel.findById(created._id).populate('sonda');
        meteoLogger.info("Dato avanzado creado");
        successResponse(res, data,null, 201);
    }catch (err) {
        next(err);
    }
};

//UPDATE
const updateDatosAvanzados = async (req, res, next) => {
    try{
        const data = await datosAvanzadosModel.findOneAndUpdate({ _id: req.params.id, isDelete: false}, req.body, {new: true}).populate('sonda');
        if (!data) {
            return errorResponse(res, "Medición no encontrada", BAD_REQUEST);
        }
        meteoLogger.info("Dato avanzado actualizado");
        successResponse(res, data);
    }catch (err) {
        next(err);
    }
};

//DELETE (lógico)
const deleteDatosAvanzados = async (req, res, next) => {
    try{
        const data = await datosAvanzadosModel.findOneAndUpdate({ _id: req.params.id, isDelete: false }, { isDelete: true }, { new: true });
        if (!data) {
            return errorResponse(res, "Medición no encontrada", BAD_REQUEST);
        }
        meteoLogger.warn("Dato avanzado eliminado lógicamente");
        res.json({ error: false, message: "Medición eliminada correctamente" });
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
        const stats = await datosAvanzadosModel.aggregate([
            { $match:  match },
            {
                $group: {
                    _id: null,
                    minPresion: { $min: "$presion" },
                    maxPresion: { $max: "$presion" },
                    avgPresion: { $avg: "$presion" },
                    allPresion: { $push: "$presion" }
                }
            }
        ]);
        if (stats.length === 0)
            return res.json({ error: false, stats: {} });
        const all = stats[0].allPresion.sort((a,b) => a-b);
        const mid = Math.floor(all.length/2);
        const media = all.length % 2 === 0 ? (all[mid-1]+all[mid])/2 : all[mid];
        res.json({ error: false, stats: { min: stats[0].minPresion, max: stats[0].maxPresion, avg: stats[0].avgPresion, media} });
    }catch (err) {
        next(err);
    }
};

/* Exportado de módulo */
module.exports = {
    getDatosAvanzados,
    getDatosAvanzadosById,
    createDatosAvanzados,
    updateDatosAvanzados,
    deleteDatosAvanzados,
    getStats
};