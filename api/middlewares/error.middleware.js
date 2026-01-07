/* Importado de Bibliotecas */
const axios = require("axios");
const { appLogger } = require("../config/winstonLogger.config");
const { IncomingWebhook } = require("@slack/webhook");

const SLACK_WEBHOOK = process.env.SLACK_WEBHOOK;
const slack = SLACK_WEBHOOK ? new IncomingWebhook(SLACK_WEBHOOK) : null;

const errorMiddleware = async (err,req, res, next) => {
    const statusCode = err.status || 500;
    const message = err.message || "INTERNAL SEVER ERROR";

    //Log
    appLogger.error(`[${req.method}] ${req.originalUrl} - ${message}`);

    // Enviar a Slack solo errores 500+
    if (statusCode >= 500 && slack) {
        try {
            await slack.send({
                text: `*Error API*\nRuta: ${req.method} ${req.originalUrl}\nMensaje: ${message}`
            });
        } catch (slackErr) {
            appLogger.error("Error enviando mensaje a Slack");
        }
    }

    res.status(statusCode).json({
        error: true,
        message
    });
};

module.exports = errorMiddleware;