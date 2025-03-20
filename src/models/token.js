"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | Flight API
------------------------------------------------------- */
const { mongoose } = require("../configs/dbConnection");
/* ------------------------------------------------------- */

const TokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", //* controller'daki user'in ismi User.
      required: true,
      unique: true,
      index: true,
    },

    token: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      index: true,
    },
  },
  { collection: "tokens", timestamps: true }
);

module.exports = mongoose.model("Token", TokenSchema);
