/* Importado de Bibliotecas */
// Bibliotecas externas
const mongoose = require("mongoose");

/* Esquema de Usuarios */
const datosCalidadAireSchema = new mongoose.Schema(
    {
        indiceCalidad: {
            // Índice de calidad del aire 0 - 100
            type: Number,
            required: true,
            min: 0,
            max: 100
        },
        ozono_ppb: {
            // Ozono en partes por billón (ppb)
            type: Number,
            required: true,
            min: 0
        },
        particulasPequenas_ugm3: {
            // (µg/m3)
            type: Number,
            required: true,
            min: 0
        },
        particulasGrandes_ugm3: {
            // (µg/m3)
            type: Number,
            required: true,
            min: 0
        },
        dioxidoNitrogeno_ppb: {
            // NO2 en ppb
            type: Number,
            required: true,
            min: 0
        },
        monoxidoCarbono_ppb: {
            // CO en ppb
            type: Number,
            required: true,
            min: 0
        },
        dioxidoAzufre_ppb: {
            // SO2 en ppb
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
module.exports = mongoose.model("datosCalidadAire", datosCalidadAireSchema);