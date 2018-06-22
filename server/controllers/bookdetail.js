const {mysql} = require('../qcloud.js');

async function get(ctx,next){
	let {bookid} = ctx.request.query;

	//根据图书id，获取图书数据
	let book = await mysql('books').select('books.*','cSessionInfo.user_info')
					.join('cSessionInfo','books.openid','cSessionInfo.open_id')
					.where('id',bookid).first();

	//根据bookid，查询该图书，让该图书的count增1
	await mysql('books').where('id',bookid).increment('count',1);

	let info = JSON.parse(book.user_info);

	ctx.state = {
		code : 0,
		data : Object.assign({},book,{
			tags : book.tags.split(','),
			summary : book.summary.split('\n'),
			user_info : {
				name : info.nickName,
				image : info.avatarUrl
			}
		})
	}
}

module.exports = {
	get
};

