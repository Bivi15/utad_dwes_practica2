/* Importado de Bibliotecas */
// Bibliotecas externas
const mongoose = require("mongoose");

/* Esquema de Usuarios */
const SondasSchema = new mongoose.Schema(
    {
        nombreSonda: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: 3
        },
        descripcionSonda: {
            type: String,
            default: '',
            trim: true
        },
        localizacion: {
            type: String,
            required: true,
            trim: true
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
module.exports = mongoose.model("sondas", SondasSchema);