/* Importado de Bibliotecas */
// Bibliotecas propias
const app = require("./app");
const connectToMongoDB = require("./api/config/mongodb.config");
const { appLogger } = require("./api/config/winstonLogger.config");

/* Declaraciones Globales */
const PORT = process.env.PORT || 3000;

// Inicializamos el servidor web
app.listen(PORT, async () => {
    try {
        await connectToMongoDB();
        appLogger.info(`Servidor escuchando en el puerto ${PORT}`);
    } catch (error) {
        appLogger.error("Error al conectar con MongoDB");
        process.exit(1);
    }
});