/* Importado de Bibliotecas */
const BAD_REQUEST = 400;

// Respuesta exitosa
const successResponse = (res, data = null, message = null, status = 200) => {
    return res.status(status).json({
        error: false,
        message,
        data
    });
};

// Respuesta de error
const errorResponse = (res, message = "Error interno", status = BAD_REQUEST) => {
    return res.status(status).json({
        error: true,
        message
    });
};

module.exports = {
    BAD_REQUEST,
    successResponse,
    errorResponse
};