"use strict";

const config = {
    database: process.env.DB_NAME || "pverse",
    username: process.env.DB_USER || "pverse",
    password: process.env.DB_PASS || "pverse",
    host: process.env.DB_HOST || "localhost",
    dialect: process.env.DB_HOST || "postgres",
}

module.exports = {
  config,
};
