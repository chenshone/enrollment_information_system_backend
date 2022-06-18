const mongoose = require("mongoose");
const config = require("../config");

mongoose.Promise = global.Promise;

// const IS_PROD = ["production", "prod", "pro"].includes(process.env.NODE_ENV);
// const databaseUrl = IS_PROD ? config.databasePro : config.database;
const databaseUrl = config.database;

/**
 *  连接数据库
 */

mongoose.connect(databaseUrl, {
  config: {
    autoIndex: false,
  },
});

/**
 *  连接成功
 */

mongoose.connection.on("connected", () => {
  console.log(`Mongoose 连接成功: ${databaseUrl}`);
});

/**
 *  连接异常
 */

mongoose.connection.on("error", (err) => {
  console.log(`Mongoose 连接出错: ${err}`);
});

/**
 *  连接断开
 */

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose 连接关闭！");
});

module.exports = mongoose;
