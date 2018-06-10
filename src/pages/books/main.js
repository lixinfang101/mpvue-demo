import Vue from 'vue'
import Books from './Books.vue'

Vue.config.productionTip = false;

const books = new Vue(Books);
//手动挂载
books.$mount();

export default{
	config : {
		enablePullDownRefresh : true
	}
}
