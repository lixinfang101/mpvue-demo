let {mysql} = require('../qcloud.js');

/*
*  根据图书id，获取该图书的所有评论
*/

async function get(ctx,next){
	let {bookid,openid} = ctx.request.query;

	console.log("<<<<<<<<",bookid,openid);

	let mysqlSelect = mysql('comments')
						.select('comments.*','cSessionInfo.user_info')
						.join('cSessionInfo','comments.openid','cSessionInfo.open_id');
	let comments = '';

	if(bookid){
		comments = await mysqlSelect.where('bookid',bookid);
	}else if(openid){
		comments = await mysqlSelect.where('openid',openid);
	}
					
	ctx.state = {
		code : 0,
		data : comments.map(v=>{
			let info = JSON.parse(v.user_info);
			return Object.assign({},v,{
				title : info.nickName,
				image : info.avatarUrl
			})
		})
	};
}

module.exports = {
	get
};


