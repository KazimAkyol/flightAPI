"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | Flight API
------------------------------------------------------- */
// $ npm i morgan
// app.use(logger):

// const morgan = require("morgan");
// const fs = require("node:fs");

// const now = new Date();
// const today = now.toISOString().split("T")[0];

// module.exports = morgan("combined", {
//   stream: fs.createWriteStream(`./logs/${today}.log`, { flags: "a+" }),
// });

const fs = require("fs");
const path = require("path");

const logDir = path.join(__dirname, "logs");
const logFilePath = path.join(
  logDir,
  `${new Date().toISOString().slice(0, 10)}.log`
);

// Eğer 'logs' klasörü yoksa oluştur
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Eğer günün log dosyası yoksa oluştur
if (!fs.existsSync(logFilePath)) {
  fs.writeFileSync(logFilePath, "");
}

// Log dosyasına yazmak için kullanıyorsan:
const logStream = fs.createWriteStream(logFilePath, { flags: "a" });
