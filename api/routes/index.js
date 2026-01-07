/* Importado de Bibliotecas */
// Bibliotecas externas
const express = require("express");
const fs = require("fs");
const path = require("path");

/* Declaraciones Globales */
// Constantes
const router = express.Router();

/* Ejecición Principal */
// Recorremos todas las rutas y las vamos añadiendo
fs.readdirSync(__dirname).filter(file => file !== "index.js" && file.endsWith(".route.js")).forEach((file) => {
    const routeName = file.replace(".route.js","");
    router.use("/" + routeName, require(path.join(__dirname, file)));
});

/* Exportado de módulo */
module.exports = router;