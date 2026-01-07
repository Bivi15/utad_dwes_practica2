/* Importado de Bibliotecas */
// Bibliotecas externas
const mongoose = require("mongoose");

/* Esquema de Usuarios */
const archivoSchema = new mongoose.Schema(
    {
        sonda: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'sondas',
            required: true
        },
        localizacion : {
            type: String,
            required: true,
            trim: true
        },
        urlImagen: {
            type: String,
            required: true,
            match: /^https?:\/\/.+$/i
        },
        fechaCaptura: {
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
module.exports = mongoose.model("archivos", archivoSchema);