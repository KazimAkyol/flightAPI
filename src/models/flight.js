"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | Flight API
------------------------------------------------------- */
const { mongoose } = require("../configs/dbConnection");
/* ---------------------------------------------------- */

const FlightSchema = new mongoose.Schema(
  {
    flightNumber: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },

    airline: {
      type: String,
      trim: true,
      required: true,
    },

    departure: {
      type: String,
      trim: true,
      required: true,
    },

    arrival: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    collection: "flights",
    timestamps: true,
  }
);

module.exports = mongoose.model("Flight", FlightSchema);
