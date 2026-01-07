/* Importado de Bibliotecas */
// Bibliotecas externas
const mongoose = require("mongoose");

/* Esquema de Usuarios */
const datosPrecipitacionSchema = new mongoose.Schema(
    {
        tipoPrecipitacion: {
            type: String,
            required: true,
            enum: [
                'Agua',
                'Nieve',
                'Granizo'
            ]
        },
        probabilidadPrecipitacion: {
            type: Number,
            required: true,
            min: 0,
            max: 100
        },
        precipitacionAcumulada: {
            // Litros por metro cuadrado (L/m2)
            type: Number,
            required: true,
            min: 0
        },
        sonda: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'sondas',
            required: true
        },
        fechaMedicion: {
            type: Date,
            required: true
        },
        horaMedicion: {
            type: String,
            required: true,
            // Formato 24h HH:mm
            match: /^([01]\d|2[0-3]):([0-5]\d)$/
        },
        isDelete: {
            type: Boolean,
            default: false
        }
    },{
        timestamps: true,
        versionKey: false
    }
);

/* Exportado de Módulo */
module.exports = mongoose.model("datosPrecipitacion", datosPrecipitacionSchema);