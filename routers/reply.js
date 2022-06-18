// routers/category.js

const router = require("koa-router")();

const controller = require("../controllers/reply");

// 提交问题
router.post("/", controller.upReply);
router.put("/", controller.updateReply);
router.delete("/", controller.delReply);

module.exports = router;
