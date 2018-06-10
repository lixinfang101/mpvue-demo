const {mysql} = require('../qcloud.js');

async function get(ctx,next){
	let {bookid} = ctx.request.query;

	//根据图书id，获取图书数据
	let book = await mysql('books').select('*').where('id',bookid).first();

	//根据bookid，查询该图书，让该图书的count增1
	await mysql('books').where('id',bookid).increment('count',1);

	ctx.state = {
		code : 0,
		data : book
	}
}

module.exports = {
	get
};

