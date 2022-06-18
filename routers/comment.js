// routers/category.js

const router = require("koa-router")();

const controller = require("../controllers/comment");

// 提交问题
router.post("/", controller.upComment);
router.get("/", controller.getCommentsByPage);
router.get("/b", controller.getCommentsByPage_back);
router.delete("/", controller.delComment);

module.exports = router;
