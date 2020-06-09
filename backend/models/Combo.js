const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }],
  cost: {
    type: Number,
    required: true,
    min: 0,
  },
});

module.exports = mongoose.model("Combo", schema);
