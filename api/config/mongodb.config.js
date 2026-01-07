/* Importado de Bibliotecas */
// Bibliotecas externas
const mongoose = require("mongoose");
const { appLogger } = require("./winstonLogger.config");

/* Declaraciones Constantes */
const DB_URI = process.env.DB_URI;

/* Codificación de Funciones */
const connectToMongoDB = async () => {
    try{
        await mongoose.connect(DB_URI);

        appLogger.info("[MongoDB Config] Conexión con la base de datos inicializada con éxito.");
    } catch(error){
        appLogger.error("[MongoDB Config] No se ha podido establecer conexión con la base de datos, error:" + error);
        throw error;
    }
}

/* Exportado de Módulo */
module.exports = connectToMongoDB;