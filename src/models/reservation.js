"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | Flight API
------------------------------------------------------- */
const { mongoose } = require("../configs/dbConnection");
/* ---------------------------------------------------- */

const ReservationSchema = new mongoose.Schema(
  {
    flightId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Passenger",
      required: true,
      unique: true,
      index: true,
    },
  },
  {
    collection: "reservations",
    timestamps: true,
  }
);

module.exports = mongoose.model("Reservation", ReservationSchema);
