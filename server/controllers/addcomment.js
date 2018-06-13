let {mysql} = require("../qcloud");

/*
 *	新增图书评论
*/
async function post(ctx,next){
	//获取请求体数据
	let {openid,bookid,comment,location,phone} = ctx.request.body.data;

	//将获取到的评论信息入库
	try{
		await mysql('comments').insert({bookid,comment,openid,location,phone});
		ctx.state = {
			code : 0,
			msg : 'success'
		};
	}catch(e){
		ctx.state = {
			code : -1,
			data : {
				msg : '添加评论失败：'+e.sqlMessage
			}
		}
	}
}

module.exports = {
	post
};

