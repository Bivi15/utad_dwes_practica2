/* Importado de Bibliotecas */
const { createLogger, format, transports } = require("winston");
const { MESSAGE } = require("triple-beam");
const path = require("path");
const fs = require("fs");

const { combine, timestamp, label } = format;

/* Crear carpeta logs si no existe */
const logsDir = path.join(__dirname, "../../logs");
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
}

/* Formato general */
const generalFormat = format((info) => {
    const { level, message, timestamp, label } = info;
    info[MESSAGE] = `[${timestamp}] [${label}] ${level.toUpperCase()}: ${message}`;
    return info;
});

/* Helper para crear loggers por área */
const createAreaLogger = (areaLabel) =>
    createLogger({
        format: combine(
            label({ label: areaLabel }),
            timestamp({ format: "YYYY-MM-DD HH:mm:ss"}),
            generalFormat()
        ),
        transports: [
            new transports.Console({ level: "silly" }),
            new transports.File({
                filename: path.join(
                    logsDir,
                    `log-${new Date().toISOString().replace(/:/g, "-")}.log`
                ),
                level: "info"
            })
        ]
    });

/* Loggers */
const appLogger = createAreaLogger("APP");
const jwtLogger = createAreaLogger("JWT");
const userLogger = createAreaLogger("USUARIOS");
const archivoLogger = createAreaLogger("ARCHIVOS");
const sondaLogger = createAreaLogger("SONDAS");
const meteoLogger = createAreaLogger("METEO");

module.exports = {
    appLogger,
    jwtLogger,
    userLogger,
    archivoLogger,
    sondaLogger,
    meteoLogger
};