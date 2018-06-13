let {mysql} = require('../qcloud.js');

/*
*  根据图书id，获取该图书的所有评论
*/

async function get(ctx,next){
	let {bookid} = ctx.request.query;

	console.log("<<<<<<<<<<后端获取图书id=========",bookid);

	ctx.state = {
		code : 0,
		data : {}
	};
}

module.exports = {
	get
};


