const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  items: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },
  ],
  desc: {
    type: String,
  },
});

module.exports = mongoose.model("Category", schema);
