const mongoose = require("mongoose");

const photoSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },

  path: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Photo = mongoose.model("Photo", photoSchema);

module.exports = Photo;