"use strict";
/* -------------------------------------------------------
    EXPRESS - Flight API
------------------------------------------------------- */
require("dotenv").config();
const HOST = process.env?.HOST || "127.0.0.1";
const PORT = process.env?.PORT || 8000;
/* ------------------------------------------------------- */
const swaggerAutogen = require("swagger-autogen")();
const packageJson = require("./package.json");

const document = {
  info: {
    version: packageJson.version,
    title: packageJson.title,
    description: packageJson.description,
    termsOfService: "http://www.clarusway.com",
    contact: { name: packageJson.author, email: "akyolkzm.2016493@gmail.com" },
    license: { name: packageJson.license },
  },
  host: `${HOST}:${PORT}`,
  basePath: "/",
  schemes: ["http", "https"],
  // JWT Settings:
  securityDefinitions: {
    JWT: {
      type: "apiKey",
      in: "header",
      name: "Authorization",
      description:
        "Enter Your AccessToken (JWT) for Login. Example: <b>Bearer</b>",
    },
  },
  security: [{ JWT: true }],
  definitions: {
    Flight: require("./src/models/flight").schema.obj,
    Passenger: require("./src/models/passenger").schema.obj,
    Reservation: require("./src/models/reservation").schema.obj,
    User: require("./src/models/user").schema.obj,
  },
};

const routes = ["./index.js"];
const outputFile = "./src/configs/swagger.json";

// Create JSON file:
swaggerAutogen(outputFile, routes, document);
