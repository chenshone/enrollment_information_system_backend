const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

/**
 * topic:
 *  0：走进紫大
 *  subTopic
 *    0：学校简介
 *    1：校园风光
 *  1：院系专业
 *  subTopic
 *    0：智能制造学院
 *    1：电光
 *    2：计算机
 *    3：商学院
 *    4：人文
 *  2：招生指南
 *  subTopic
 *    0：招生简章
 *    1：招生计划
 *    2：分数线
 *    3：填报指南
 */

const schema = new mongoose.Schema(
  {
    author: {
      type: mongoose.ObjectId,
      required: true,
      ref: "User",
    },
    content: {
      type: String,
      // required: true,
      // select: false,
    },
    topics: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    isExcel: {
      type: Boolean,
      default: false,
    },
    form: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

schema.plugin(uniqueValidator);

module.exports = mongoose.model("Article", schema);
