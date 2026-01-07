/* Importado de Bibliotecas */
// Bibliotecas externas
const mongoose = require("mongoose");

/* Esquema de Usuarios */
const infoMeteorologicaSchema = new mongoose.Schema(
    {
        temperaturaReal: {
            type: Number,
            required: true
        },
        sensacionTermica: {
            type: Number,
            required: true
        },
        cubiertaNubes: {
            type: String,
            required: true,
            enum: [
                'Soleado despejado',
                'Soleado nublado',
                'Lluvia',
                'Nieve',
                'Luna despejada',
                'Luna nublada'
            ],
            required: true,
        },
        sonda: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'sondas',
            required: true
        },
        fechaMedicion: {
            type: Date,
            required: true
        },
        isDelete: {
            type: Boolean,
            default: false
        }
    }, {
        timestamps: true,
        versionKey: false
    }
);

/* Exportado de Módulo */
module.exports = mongoose.model("infoMeteorologica", infoMeteorologicaSchema);