/* Importado de Bibliotecas */
// Bibliotecas externas
const mongoose = require("mongoose");

/* Esquema de Usuarios */
const datosVientoSchema = new mongoose.Schema(
    {
        velocidadViento: {
            type: Number, // km/h
            required: true,
            min: 0
        },
        velocidadRafagas: {
            type: Number, // km/h
            required: true,
            min: 0
        },
        direccionViento: {
            type: String,
            required: true,
            enum: [
                'N',
                'NE',
                'E',
                'SE',
                'S',
                'SW',
                'W',
                'NW'
            ]
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
module.exports = mongoose.model("datosViento", datosVientoSchema);