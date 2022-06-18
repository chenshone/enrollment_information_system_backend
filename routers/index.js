// routers/index.js
const router = require("koa-router")();
const { apiPrefix } = require("../config/index");

const user = require("./user");
const comment = require("./comment");
const reply = require("./reply");
const article = require("./article");

router.prefix(apiPrefix);

router.use("/user", user.routes(), user.allowedMethods());
router.use("/comment", comment.routes(), comment.allowedMethods());
router.use("/reply", reply.routes(), reply.allowedMethods());
router.use("/article", article.routes(), article.allowedMethods());

module.exports = router;
