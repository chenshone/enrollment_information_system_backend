const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const schema = new mongoose.Schema(
  {
    author: {
      type: mongoose.ObjectId,
      required: true,
      ref: "User",
    },
    content: {
      type: String,
      required: true,
    },
    reply: {
      type: mongoose.ObjectId,
      ref: "Reply",
    },
  },
  {
    timestamps: true,
  }
);

schema.plugin(uniqueValidator);

module.exports = mongoose.model("Comment", schema);
