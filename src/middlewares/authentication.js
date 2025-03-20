"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | Flight API
------------------------------------------------------- */

const Token = require("../models/token");

module.exports = async (req, res, next) => {
  req.user = null;

  const auth = req.headers?.authorization; // Token ...tokenKey...
  const tokenKey = auth ? auth.split(" ") : null; // ['Token', '...tokenKey...']

  if (tokenKey && tokenKey[0] == "Token") {
    const tokenData = await Token.findOne({ token: tokenKey[1] }).populate(
      "userId"
    ); //* DB'de token'a ait bilgileri saklayan function populate()'tir.
    req.user = tokenData ? tokenData.userId : null;
  }

  next();
};
