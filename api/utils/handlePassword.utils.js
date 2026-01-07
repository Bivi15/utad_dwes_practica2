/* Importado de Bibliotecas */
const bcryptjs = require("bcryptjs");

const SALT_ROUNDS = 10;

// Hash seguro de password
const hashPassword = async (password) => {
    const salt = await bcryptjs.genSalt(SALT_ROUNDS);
    return bcryptjs.hash(password, salt);
};

// Comparar password con hash
const comparePassword = async (password, hash) => {
    return bcryptjs.compare(password, hash);
};

module.exports = {
    hashPassword,
    comparePassword
};