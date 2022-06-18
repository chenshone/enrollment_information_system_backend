// routers/category.js

const router = require("koa-router")();

const controller = require("../controllers/article");

// 提交问题
router.post("/", controller.upArticle);
router.get("/", controller.getArticleByPageAndTopic);
router.get("/one", controller.getArticleById);
router.put("/", controller.updateArticle);
router.delete("/", controller.delArticle);

module.exports = router;
