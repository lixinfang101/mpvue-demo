const {mysql} = require('../qcloud.js');

let https = require('https');

/*
 * 新增图书	post请求
*/

async function post(ctx,next){
	//获取请求体数据
	let {isbn,openid} = ctx.request.body;

	//首先，根据isbn码查询数据库，返回结果是一个数组
	let book = await mysql('books').select('*').where('isbn',isbn);

	if(book.length){
		ctx.state = {
			code : 1,
			data : {
				msg : '图书已存在'
			}
		};
		return ;
	}

	let url = 'https://api.douban.com/v2/book/isbn/' + isbn;

	let bookinfo = await getJSON(url);

	//根据获取到的图书信息，获取需要的图书信息
	const rate = bookinfo.rating.average;

	const {title , image , alt , publisher , summary , price } = bookinfo;
	//作者
	const author = bookinfo.author.join(',');
	//tags
	const tags = bookinfo.tags.map(v=>{
		return `${v.name} ${v.count}`;
	}).join(',');

	//将数据入库
	try{
		await mysql('books').insert({
			isbn,openid,rate,title,image,alt,publisher,summary,price,tags,author
		});
		ctx.state = {
			code : 0,
			data : {
				title,
				msg : 'success'
			}
		};
	}catch(e){
		ctx.state = {
			code : -1,
			data : {
				msg : '添加图书失败:' + e.sqlMessage
			}
		};
	}
	
}

function getJSON(url){
	return new Promise((resolve,reject)=>{

		//https获取图书信息
		https.get(url,res=>{
			let jsonData = '';

			//以流的形式返回
			res.on('data',data=>{
				jsonData += data;
			});

			res.on('end',data=>{
				let bookinfo = JSON.parse(jsonData);
				if(bookinfo.title){
					resolve(bookinfo);
				}else{
					reject(bookinfo);
				}
			});
		});
	});
}

module.exports = {
	post
};
