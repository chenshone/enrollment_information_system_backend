const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userRole = require("./userRole");

const schema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    pwd: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: Number,
      default: userRole.student,
      // select: false,
    },
    age: {
      type: Number,
      select: false,
    },
    sex: {
      type: Number,
      select: false,
    }, // 1 男  0 女
    tel: {
      type: Number,
      select: false,
    },
    addr: {
      type: Array,
      select: false,
    },
    score: {
      type: Number,
      select: false,
    },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

schema.plugin(uniqueValidator);

module.exports = mongoose.model("User", schema);
