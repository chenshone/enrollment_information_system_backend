const articleModel = require("../models/article");

/**
 * 文章发布
 */
exports.upArticle = async (ctx) => {
  const dataObj = ctx.request.body;

  const article = new articleModel({
    ...dataObj,
  });

  try {
    const res = await article.save();
    if (res) {
      ctx.status = 200;
      ctx.body = {
        code: 200,
        msg: "提交成功",
      };
    } else {
      ctx.status = 500;
      ctx.body = { code: 500, msg: "未知错误" };
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      code: 500,
      msg: error,
      data: { code: 500, msg: error },
    };
  }
};

exports.getArticleByPageAndTopic = async (ctx) => {
  // console.log("get detail:", ctx.params);
  const { page } = ctx.query;
  const myTopics = ctx.query["topics[]"];
  console.log(ctx.query);
  try {
    let res = await articleModel
      .find({
        topics: {
          $all: myTopics,
        },
      })
      .sort({ updatedAt: -1 })
      .skip((page - 1) * 10)
      .limit(10)
      .populate("author", "username");

    const sum = await articleModel
      .find({
        topics: {
          $all: myTopics,
        },
      })
      .count();
    const result = [];
    for (let i = 0; i < res.length; i++) {
      result.push({
        id: res[i]._id,
        author: res[i].author.username,
        title: res[i].title,
        isExcel: res[i].isExcel,
        datetime: res[i].createdAt,
      });
    }
    console.log("res: ", res);
    console.log("result: ", result);

    ctx.status = 200;
    ctx.body = {
      code: 200,
      msg: "获取成功",
      data: {
        articles: result,
        sum,
      },
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      code: 500,
      msg: "未知错误",
      data: { code: 500, msg: "未知错误" },
    };
  }
};

exports.getArticleById = async (ctx) => {
  // console.log("get detail:", ctx.params);
  const { id } = ctx.query;
  console.log(id);
  try {
    let res = await articleModel.findById(id).populate("author", "username");
    const result = {};
    result.id = res._id;
    result.author = res.author.username;
    result.title = res.title;
    result.datetime = res.createdAt;
    result.content = res.content;
    result.topics = res.topics;
    result.isExcel = res.isExcel;
    result.form = res.form;

    console.log("res: ", res);
    console.log("result: ", result);

    ctx.status = 200;
    ctx.body = {
      code: 200,
      msg: "获取成功",
      data: {
        article: result,
      },
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      code: 500,
      msg: "未知错误",
      data: { code: 500, msg: "未知错误" },
    };
  }
};

exports.updateArticle = async (ctx) => {
  const dataObj = ctx.request.body;
  console.log("1111111", dataObj);

  try {
    const res = await articleModel.findByIdAndUpdate(dataObj.id, {
      content: dataObj.content,
      title: dataObj.title,
      author: dataObj.author,
    });
    if (res) {
      console.log(res);
      ctx.status = 200;
      ctx.body = {
        code: 200,
        msg: "修改成功",
      };
    } else {
      ctx.status = 500;
      ctx.body = {
        code: 500,
        msg: err.message,
        data: { code: 500, msg: "未知错误" },
      };
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      code: 500,
      msg: "未知错误",
      data: { code: 500, msg: "未知错误" },
    };
  }
};

exports.delArticle = async (ctx) => {
  const { id } = ctx.query;
  try {
    let Res = await articleModel.findByIdAndDelete(id);
    console.log("res:", Res);

    // console.log("result: ", result);

    ctx.status = 200;
    ctx.body = {
      code: 200,
      msg: "删除成功",
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      code: 500,
      msg: "未知错误",
      data: { code: 500, msg: "未知错误" },
    };
  }
};
