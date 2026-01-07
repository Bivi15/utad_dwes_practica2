/* Importado de Bibliotecas */
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Carpeta storage
const storagePath = path.join(__dirname, "../storage");
if (!fs.existsSync(storagePath)) fs.mkdirSync(storagePath);

// Configuración de storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, storagePath),
    filename: (req, file, cb) => {
        const ext = file.originalname.split(".").pop();
        const filename = `file-${Date.now()}.${ext}`;
        cb(null, filename);
    }
});

// Middleware para rutas
const uploadMiddleware = multer({ storage });

module.exports = uploadMiddleware;
