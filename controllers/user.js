const userModel = require("../models/user");

const jwt = require("jsonwebtoken");

const { jwtSecret } = require("../config");

const roleMenu = ["", "admin", "editor", "student"];
/**
 * 用户注册
 */
exports.register = async (ctx) => {
  const dataObj = ctx.request.body;

  console.log("data: ", dataObj);

  const user = new userModel({
    role: 3,
    ...dataObj,
  });
  try {
    const res = await user.save();

    if (res) {
      ctx.status = 200;
      ctx.body = {
        code: 200,
        msg: "注册成功",
      };
    } else {
      ctx.status = 500;
      ctx.body = { code: 500, msg: "未知错误" };
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = { code: 500, msg: "该昵称已被注册" };
  }
};

exports.login = async (ctx) => {
  const data = ctx.request.body;
  console.log("user login data: ", data);

  const res = await userModel.findOne({
    username: data.username,
    pwd: data.pwd,
  });
  console.log("res user login: ", res);
  try {
    if (res) {
      ctx.status = 200;
      ctx.body = {
        code: 200,
        msg: "登录成功",
        data: {
          token: jwt.sign({ id: res._id }, jwtSecret, { expiresIn: "1h" }),
          id: res._id,
          username: res.username,
          role: res.role,
        },
      };
    } else {
      ctx.status = 400;
      ctx.body = { code: 400, msg: "该用户未注册或账号密码错误" };
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = { code: 500, msg: error.message };
  }
};

exports.login_token = async (ctx) => {
  const { myToken } = ctx.request.body;
  try {
    const res = await userModel.findById(jwt.verify(myToken, jwtSecret).id);
    if (res) {
      ctx.status = 200;
      ctx.body = {
        code: 200,
        msg: "登录成功",
        data: {
          token: jwt.sign({ id: res._id }, jwtSecret, { expiresIn: "1h" }),
          id: res._id,
          username: res.username,
          role: res.role,
        },
      };
    } else {
      ctx.status = 500;
      ctx.body = { code: 500, msg: "用户登录过期" };
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = { code: 500, msg: "未知错误" };
  }
};

exports.testJWT = async (ctx) => {
  ctx.status = 200;
};

exports.login_back = async (ctx) => {
  const data = ctx.request.body;
  console.log("user login data: ", data);

  const res = await userModel.findOne({
    username: data.username,
    pwd: data.pwd,
  });
  console.log("res user login: ", res);
  try {
    if (res && res.role != 3) {
      ctx.status = 200;

      ctx.body = {
        code: 200,
        msg: "登录成功",
        data: {
          token: jwt.sign({ id: res._id }, jwtSecret, { expiresIn: "1h" }),
          id: res._id,
          username: res.username,
          roles: [roleMenu[res.role]],
        },
      };
    } else {
      ctx.status = 400;
      ctx.body = { code: 400, msg: "该用户未注册或账号密码错误或没有权限" };
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = { code: 500, msg: error.message };
  }
};

exports.login_token_back = async (ctx) => {
  const { myToken } = ctx.request.body;
  try {
    const res = await userModel.findById(jwt.verify(myToken, jwtSecret).id);
    if (res) {
      ctx.status = 200;
      ctx.body = {
        code: 200,
        msg: "登录成功",
        data: {
          token: jwt.sign({ id: res._id }, jwtSecret, { expiresIn: "1h" }),
          id: res._id,
          username: res.username,
          roles: [roleMenu[res.role]],
        },
      };
    } else {
      ctx.status = 500;
      ctx.body = { code: 500, msg: "用户登录过期" };
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = { code: 500, msg: "未知错误" };
  }
};
