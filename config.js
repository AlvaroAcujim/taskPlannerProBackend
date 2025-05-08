require('dotenv').config;

module.exports = {
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    PORT: process.env.PORT,
    SECRET_KEY: process.env.SECRET_KEY,
    DB_HOST: process.env.DB_HOST
}