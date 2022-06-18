// routers/category.js

const router = require("koa-router")();
const jwt = require("koa-jwt");

const { jwtSecret } = require("../config");
const controller = require("../controllers/user");

const auth = jwt({ secret: jwtSecret });
// 注册
router.post("/register", controller.register);

// 登录
router.post("/login", controller.login);

// token登录
router.post("/login_token", controller.login_token);

// 后台登录
router.post("/b/login", controller.login_back);

// 后台token登录
router.post("/b/login_token", controller.login_token_back);

//  test jwt
router.get("/test", auth, controller.testJWT);

module.exports = router;
