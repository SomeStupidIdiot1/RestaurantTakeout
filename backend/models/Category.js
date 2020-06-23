const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  items: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },
  ],
});

module.exports = mongoose.model("Category", schema);
