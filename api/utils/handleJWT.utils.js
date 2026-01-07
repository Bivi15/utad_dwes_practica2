/* Importado de Bibliotecas */
const jwt = require("jsonwebtoken");
const { jwtLogger } = require("../config/winstonLogger.config");


const JWT_SECRET = process.env.JWT_SECRET;
const NORMAL_TOKENS_EXPIRATION = process.env.JWT_EXPIRATION || "2h";

//Generar token
const tokenSign = (user) => {
    return jwt.sign(
        {
            _id: user._id,
            rol: user.rol,
        },
        JWT_SECRET,
        { expiresIn: NORMAL_TOKENS_EXPIRATION }
    );
};

// Verificar token (devuelve payload o null)
const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (err) {
        jwtLogger.error(`[handleJWT] verifyToken: ${err.message}`);
        return null;
    }
};

// Middleware para proteger rutas
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        jwtLogger.warn("[handleJWT] Token no proporcionado o formato inválido");
        return res.status(401).json({ error: true, message: "Token requerido" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);
    if (!decoded){
        jwtLogger.warn("[handleJWT] Token inválido");
        return res.status(401).json({ error: true, message: "Token inválido"});
    }
    req.user = decoded;
    next();
};

module.exports = {
    tokenSign,
    verifyToken,
    authenticateJWT
};