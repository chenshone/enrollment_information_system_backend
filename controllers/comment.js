const commentModel = require("../models/comment");
const replyModel = require("../models/reply");
/**
 * 消息发布
 */
exports.upComment = async (ctx) => {
  const dataObj = ctx.request.body;

  const comment = new commentModel({
    ...dataObj,
  });

  try {
    const res = await comment.save();
    if (res) {
      ctx.status = 200;
      ctx.body = {
        code: 200,
        msg: "提交成功",
        data: {
          datetime: res.updatedAt,
          id: res._id,
        },
      };
    } else {
      ctx.status = 500;
      ctx.body = {
        code: 500,
        msg: err.message,
        data: { code: 500, msg: err.message },
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

exports.getCommentsByPage = async (ctx) => {
  // console.log("get detail:", ctx.params);
  const { page } = ctx.query;
  try {
    let res = await commentModel
      .find()
      .sort({ updatedAt: -1 })
      .skip((page - 1) * 10)
      .limit(10)
      .populate("author", "username")
      .populate({
        path: "reply",
        populate: {
          path: "uid",
        },
      });

    const sum = await commentModel.find().count();
    const result = [];
    for (let i = 0; i < res.length; i++) {
      let replyObj = res[i].reply;
      result.push({
        id: res[i]._id,
        author: res[i].author.username,
        content: res[i].content,
        datetime: res[i].createdAt,
        reply: replyObj
          ? {
              id: replyObj._id,
              cid: replyObj.cid,
              author: replyObj.uid.username,
              content: replyObj.content,
              datetime: replyObj.updatedAt,
            }
          : undefined,
      });
    }
    console.log("res: ", res);
    // console.log("result: ", result);

    ctx.status = 200;
    ctx.body = {
      code: 200,
      msg: "获取成功",
      data: {
        comments: result,
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

exports.getCommentsByPage_back = async (ctx) => {
  // console.log("get detail:", ctx.params);
  const { page } = ctx.query;
  try {
    let res = await commentModel
      .find()
      .sort({ updatedAt: -1 })
      .skip((page - 1) * 10)
      .limit(10)
      .populate({
        path: "author",
        select: "username age sex addr score tel",
      })
      .populate({
        path: "reply",
        populate: {
          path: "uid",
        },
      });

    const sum = await commentModel.find().count();
    const result = [];
    for (let i = 0; i < res.length; i++) {
      let replyObj = res[i].reply;
      result.push({
        id: res[i]._id,
        author: res[i].author.username,
        content: res[i].content,
        age: res[i].author.sex,
        sex: res[i].author.sex == 1 ? "男" : "女",
        addr: res[i].author.addr,
        tel: res[i].author.tel,
        score: res[i].author.score,
        datetime: res[i].createdAt.toString(),
        reply: replyObj
          ? {
              id: replyObj._id,
              cid: replyObj.cid,
              author: replyObj.uid.username,
              content: replyObj.content,
              datetime: replyObj.updatedAt.toString(),
            }
          : undefined,
      });
    }
    console.log("res: ", res);
    // console.log("result: ", result);

    ctx.status = 200;
    ctx.body = {
      code: 200,
      msg: "获取成功",
      data: {
        comments: result,
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

exports.delComment = async (ctx) => {
  const { cid } = ctx.query;
  try {
    let cRes = await commentModel.findByIdAndDelete(cid);
    console.log("res:", cRes);
    if (!!cRes.reply) await replyModel.findByIdAndDelete(cRes.reply);

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
