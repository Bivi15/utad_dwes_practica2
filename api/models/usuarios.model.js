/* Importado de Bibliotecas */
// Bibliotecas externas
const mongoose = require("mongoose");

/* Esquema de Usuarios */
const UsuariosScheme = new mongoose.Schema(
    {
        nombreUsuario: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: 3
        },
        nombreCompleto: {
            type: String,
            required: true,
            trim: true
        },
        descripcion: {
            type: String,
            default: '',
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        contrasena: {
            type: String,
            required: true,
            minlength: 6,
            select: false
        },
        isDelete: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

/* Exportado de Módulo */
module.exports = mongoose.model("usuarios", UsuariosScheme);