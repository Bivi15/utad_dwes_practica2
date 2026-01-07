/* Importado de Biblioteca */
const { validationResult } = require("express-validator");
const { errorResponse } = require("./handleResponse.utils");

// Middleware que valida los resultados de express-validator
const validateResults = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return errorResponse(res, "Datos inválidos", 400);
    }
    next();
};

module.exports = {
    validateResults
};