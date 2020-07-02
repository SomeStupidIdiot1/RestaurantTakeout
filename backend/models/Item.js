const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  cost: {
    type: Number,
    required: true,
    min: 0,
  },
  imgUrl: {
    type: String,
  },
  imgId: {
    type: String,
  },
});

module.exports = mongoose.model("Item", schema);
