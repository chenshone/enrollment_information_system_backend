const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const schema = new mongoose.Schema(
  {
    //问题id
    cid: {
      type: mongoose.ObjectId,
      required: true,
      ref: "Comment",
    },
    //回复人id
    uid: {
      type: mongoose.ObjectId,
      required: true,
      ref: "User",
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

schema.plugin(uniqueValidator);

module.exports = mongoose.model("Reply", schema);
