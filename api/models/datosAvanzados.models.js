/* Importado de Bibliotecas */
// Bibliotecas externas
const mongoose = require("mongoose");

/* Esquema de Usuarios */
const datosAvanzadosSchema = new mongoose.Schema(
    {
       presion: {
            type: Number, // en milibares (hPa)
            required: true,
            min: 0
       },
       indiceUV: {
            type: Number, // 0 - 10
            required: true,
            min: 0,
            max: 10
       },
       indicePolen: {
            type: Number, // 0 - 100
            required: true,
            min: 0,
            max: 100
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
module.exports = mongoose.model("datosAvanzados", datosAvanzadosSchema);