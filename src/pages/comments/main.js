import Vue from 'vue'
import Comment from './Comment.vue'

Vue.config.productionTip = false;

const comment = new Vue(Comment);
comment.$mount();

