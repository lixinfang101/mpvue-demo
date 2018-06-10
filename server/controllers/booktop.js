const {mysql} = require('../qcloud.js');

async function get(ctx,next){

	let topBooks = await mysql('books').select('id','title','image','count').orderBy('count','desc').limit(9);

	ctx.state = {
		code : 0,
		data : topBooks
	}
}

module.exports = {
	get
};