"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | Flight API
------------------------------------------------------- */
const router = require("express").Router();
const flight = require("../controllers/flight");
/* ------------------------------------------------------- */
// URL: /flights

router.route("/").get(flight.list).post(flight.create);

router
  .route("/:id")
  .get(flight.read)
  .put(flight.update)
  .patch(flight.update)
  .delete(flight.delete);

/* ------------------------------------------------------- */
module.exports = router;
