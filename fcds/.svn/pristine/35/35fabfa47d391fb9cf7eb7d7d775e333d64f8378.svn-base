import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import 'common/stylus/index.styl';
import App from './App';
import {deadline} from 'common/js/deadline.js';
import 'vue-event-calendar/dist/style.css';
import tool from 'common/js/tool.js';

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.prototype.toolHelper = tool;

const login = require('components/login/login.vue');
const main = require('components/main/main.vue');
const capital = require('components/capital/capital.vue');
const transaction = require('components/transaction/transaction.vue');
const broker = require('components/broker/broker.vue');
const dealer = require('components/dealer/dealer.vue');
const transactionAnalysis = require('components/transactionAnalysis/transactionAnalysis.vue');
const dealerAnalysis = require('components/dealerAnalysis/dealerAnalysis.vue');

const routes = [
  { path: '/login', component: login},
  { 
    path: '/main', 
    component: main,
    meta: {
      requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
    },  
    children:[
      { path: 'capital', component: capital, meta: {requireAuth: true}},
      { path: 'transaction', component: transaction, meta: {requireAuth: true}},
      { path: 'broker', component: broker, meta: {requireAuth: true}},
      { path: 'dealer', component: dealer, meta: {requireAuth: true}},
      { path: 'transactionAnalysis', component: transactionAnalysis, meta: {requireAuth: true}},
      { path: 'dealerAnalysis', component: dealerAnalysis, meta: {requireAuth: true}}
    ]
  }
];

const router = new VueRouter({
  routes,
  linkActiveClass: 'active'
});

router.beforeEach((to, from, next) => {

  if (to.meta.requireAuth) {
    const day = deadline();
    if(day >= 30){
      localStorage.clear();
    }

    if(localStorage.getItem("session_token")) {  
      
      next();

    }else { 

      next({
        path: '/login',
        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })

    }
  }else {

    next();

  }
})

router.push({ path: '/main/capital' }) 

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');

Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = el.innerText
    el.remove()
  }
})
