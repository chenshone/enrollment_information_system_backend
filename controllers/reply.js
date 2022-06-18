const commentModel = require("../models/comment");
const replyModel = require("../models/reply");
/**
 * 消息发布
 */
exports.upReply = async (ctx) => {
  const dataObj = ctx.request.body;

  const reply = new replyModel({
    ...dataObj,
  });

  try {
    const res = await reply.save();
    const comment = await commentModel.findByIdAndUpdate(dataObj.cid, {
      reply: res._id,
    });
    if (res && comment) {
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

exports.updateReply = async (ctx) => {
  const dataObj = ctx.request.body;
  console.log("1111111", dataObj);

  try {
    const res = await replyModel.findByIdAndUpdate(dataObj.id, {
      content: dataObj.content,
      uid: dataObj.uid,
    });
    if (res) {
      console.log(res);
      ctx.status = 200;
      ctx.body = {
        code: 200,
        msg: "修改成功",
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

exports.delReply = async (ctx) => {
  const { rid, cid } = ctx.query;
  console.log(rid, cid);
  try {
    const cRes = await commentModel.findByIdAndUpdate(cid, { reply: null });
    const res = await replyModel.findByIdAndDelete(rid);
    if (res && cRes) {
      ctx.status = 200;
      ctx.body = {
        code: 200,
        msg: "删除成功",
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
