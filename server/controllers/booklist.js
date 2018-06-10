const {mysql} = require('../qcloud.js');

async function get(ctx,next){
	
	const {page} = ctx.request.query;
	const size = 10; 

	//let books = await mysql('books').select('books.*','cSessionInfo.user_info').join('cSessionInfo','books.openid','cSessionInfo.open_id').orderBy('books.id','desc');
	let books = await mysql('books').select('*').limit(size).offset(Number(page)*size).orderBy('books.id','desc');

	ctx.state = {
		code : 0,
		data : {
			data : books
		}
	};
}

module.exports = {
	get
};


