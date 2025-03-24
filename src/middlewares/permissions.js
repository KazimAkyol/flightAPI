"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | Flight API
------------------------------------------------------- */
// Middleware: permissions

module.exports = {
  isLogin: (req, res, next) => {
    if (req.user && req.user.isActive) {
      //* Kisinin login olup/olmadigi ve active olup/olmadigi kontrol edilir.
      next();
      //* next() parametresiyle de bu kisinin bu isi yapip/yapamayacagi da belirtilmis olur.
    } else {
      res.errorStatusCode = 403;
      throw new Error("NoPermission: You must login.");
    }
  },

  isAdmin: (req, res, next) => {
    if (req.user && req.user.isActive && req.user.isAdmin) {
      //* Kisinin admin olup/olmadigi ve active olup/olmadigi kontrol edilir.
      next();
    } else {
      res.errorStatusCode = 403;
      throw new Error("NoPermission: You must login and to be Admin.");
    }
  },

  isStaff: (req, res, next) => {
    if (req.user && req.user.isStaff) {
      next(); //* Yetkiliyse devam et
    } else {
      res.errorStatusCode = 403;
      throw new Error("NoPermission: You are not authorized.");
    }
  },
};
