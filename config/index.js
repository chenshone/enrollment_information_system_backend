module.exports = {
  port: process.env.PORT || 3000,
  apiPrefix: "/api",
  database:
    " mongodb://用户名:密码@服务器公网IP:端口/库的名称?authSource=admin",
  jwtSecret: "secret",
};
