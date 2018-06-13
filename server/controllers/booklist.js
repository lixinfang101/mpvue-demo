const {mysql} = require('../qcloud.js');

async function get(ctx,next){
	
	const {page} = ctx.request.query;
	const size = 10; 

	// let books = await mysql('books')
	// 				.select('books.*','cSessionInfo.user_info')
	// 				.join('cSessionInfo','books.openid','cSessionInfo.open_id')
	// 				.limit(size)
	// 				.offset(Number(page)*size)
	// 				.orderBy('books.id','desc');

	const books = await mysql('books')
                  .select('books.*', 'cSessionInfo.user_info')
                  .join('cSessionInfo', 'books.openid', 'cSessionInfo.open_id')
                  .limit(size)
                  .offset(Number(page) * size)
                  .orderBy('books.id', 'desc');


	//let books = await mysql('books').select('*').limit(size).offset(Number(page)*size).orderBy('books.id','desc');

	console.log("<<<<<<<<books========",books);


	ctx.state = {
		code : 0,
		data : {
			data : books.map(v => {
            		const info = JSON.parse(v.user_info)
	            	return Object.assign({}, v, {
		                user_info: {
		                    nickName: info.nickName
		                }
		            });
        		})
		}
	};
}

module.exports = {
	get
};


