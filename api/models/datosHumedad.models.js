/* Importado de Bibliotecas */
// Bibliotecas externas
const mongoose = require("mongoose");

/* Esquema de Usuarios */
const datosHumedadSchema = new mongoose.Schema(
    {
        humedad: {
            type: Number, // porcentaje
            required: true,
            min: 0,
            max: 100
        },
        puntoRocio: {
            type: Number, // °C
            required: true
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
module.exports = mongoose.model("datosHumedad", datosHumedadSchema);