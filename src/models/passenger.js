"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | Flight API
------------------------------------------------------- */
const { mongoose } = require("../configs/dbConnection");
/* ---------------------------------------------------- */

const PassengerSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: true,
    },

    lastName: {
      type: String,
      trim: true,
      required: true,
    },

    gender: {
      type: String,
      trim: true,
      required: true,
    },

    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      validate: [
        (email) => email.includes("@") && email.includes("."),
        "Email is not valid",
      ],
    },
  },
  {
    collection: "passengers",
    timestamps: true,
  }
);

module.exports = mongoose.model("Passenger", PassengerSchema);
