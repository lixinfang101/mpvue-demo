import Vue from 'vue'
import Me from './Me.vue'

Vue.config.productionTip = false;

const me = new Vue(Me);
//手动挂载
me.$mount();
