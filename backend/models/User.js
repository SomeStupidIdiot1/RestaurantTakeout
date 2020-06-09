const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  combos: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Combo", required: true },
  ],
  items: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },
  ],
});
schema.plugin(uniqueValidator);

module.exports = mongoose.model("User", schema);
