import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import 'common/stylus/index.styl';
import App from './App';
import {deadline} from 'common/js/deadline.js';
import 'vue-event-calendar/dist/style.css';
import tool from 'common/js/tool.js';
import VueAwesomeSwiper from 'vue-awesome-swiper';


Vue.use(VueRouter);
Vue.use(VueResource);
Vue.prototype.toolHelper = tool;
Vue.use(VueAwesomeSwiper);
 // this.toolHelper.arrayFlashback(response.body.data.monthList);

const login = require('components/login/login.vue');
  const firstLogin = require('components/login/firstLogin/firstLogin.vue');
  const forgetPassword = require('components/login/forgetPassword/forgetPassword.vue');
  const setPassword = require('components/login/setPassword/setPassword.vue');

const main = require('components/main/main.vue');
  // 首页路由
  const home = require('components/home/home.vue');
    const packages = require('components/home/package/package.vue');
      const sellDetailed = require('components/home/package/sellDetailed/sellDetailed.vue');
  // 返佣路由
  const rebate = require('components/rebate/rebate.vue');
    const integralSummary = require('components/rebate/integralSummary/integralSummary.vue');
    const seniorfranchise = require('components/rebate/seniorfranchise/seniorfranchise.vue');
    const franchise = require('components/rebate/franchise/franchise.vue');
    const integral = require('components/rebate/integral/integral.vue');
    const packagees = require('components/rebate/package/package.vue');
    const fee = require('components/rebate/fee/fee.vue');
      const franchiseDetails = require('components/rebate/franchise/franchiseDetails/franchiseDetails.vue');
      const integralDetails = require('components/rebate/integral/integralDetails/integralDetails.vue');
      const packageDetails = require('components/rebate/package/packageDetails/packageDetails.vue');
      const feeDetails = require('components/rebate/fee/feeDetails/feeDetails.vue');

  const ranking = require('components/ranking/ranking.vue');
    const assessment = require('components/ranking/assessment/assessment.vue');

  const center = require('components/center/center.vue');
      const modifyPassword = require('components/center/modifyPassword/modifyPassword.vue');
      const accountManagement = require('components/center/accountManagement/accountManagement.vue');
      const modifyRegion = require('components/center/modifyRegion/modifyRegion.vue');
      const recommendBroker = require('components/center/recommendBroker/recommendBroker.vue');
      const vip = require('components/center/vip/vip.vue');
      const platinumIntegral = require('components/center/platinumIntegral/platinumIntegral.vue');
      const platinumIntegralQuery = require('components/center/platinumIntegral/platinumIntegralQuery.vue');
      const sellingCommission = require('components/center/sellingCommission/sellingCommission.vue');
      const briefing = require('components/center/briefing/briefing.vue');
      const customerAnalysis = require('components/center/customerAnalysis/customerAnalysis.vue');
      const activeCustomer = require('components/center/customerAnalysis/activeCustomer/activeCustomer.vue');
      const tradingClient = require('components/center/customerAnalysis/tradingClient/tradingClient.vue');
      const intoGoldCustomer = require('components/center/customerAnalysis/intoGoldCustomer/intoGoldCustomer.vue');
      const outGoldCustomer = require('components/center/customerAnalysis/outGoldCustomer/outGoldCustomer.vue');
      const admissionCustomer = require('components/center/customerAnalysis/admissionCustomer/admissionCustomer.vue');
      const leaveCustomer = require('components/center/customerAnalysis/leaveCustomer/leaveCustomer.vue');

      const sellingCommissionDetails = require('components/center/sellingCommission/sellingCommissionDetails.vue');
      const modifySettlementAccount = require('components/center/modifySettlementAccount/modifySettlementAccount.vue');

      const takeGoods = require('components/center/takeGoods/takeGoods.vue');
      const takeGoodsDetails = require('components/center/takeGoods/takeGoodsDetails.vue');
      const takeCoodsProportion = require('components/center/takeGoods/takeCoodsProportion.vue');


  const emptydata = require('components/emptydata/emptydata.vue');

const routes = [
  { path: '/login', component: login},
  { path: '/emptydata', component: emptydata, meta: {requireAuth: true}},
  { path: '/integralSummary', component: integralSummary, meta: {requireAuth: true}},
  { path: '/seniorfranchise', component: seniorfranchise, meta: {requireAuth: true}},
  { path: '/franchise', component: franchise, meta: {requireAuth: true}},
  { path: '/integral', component: integral, meta: {requireAuth: true}},
  { path: '/package', component: packagees, meta: {requireAuth: true}},
  { path: '/fee', component: fee, meta: {requireAuth: true}},
  { path: '/franchiseDetails', component: franchiseDetails, meta: {requireAuth: true}},
  { path: '/integralDetails', component: integralDetails, meta: {requireAuth: true}},
  { path: '/packageDetails', component: packageDetails, meta: {requireAuth: true}},
  { path: '/feeDetails', component: feeDetails, meta: {requireAuth: true}},
  { path: '/modifyPassword', component: modifyPassword, meta: {requireAuth: true}},
  { path: '/accountManagement', component: accountManagement, meta: {requireAuth: true}},
  { path: '/modifyRegion', component: modifyRegion, meta: {requireAuth: true}},
  { path: '/recommendBroker', component: recommendBroker, meta: {requireAuth: true}},
  { path: '/vip', component: vip, meta: {requireAuth: true}},
  { path: '/platinumIntegral', component: platinumIntegral, meta: {requireAuth: true}},
  { path: '/platinumIntegralQuery', component: platinumIntegralQuery, meta: {requireAuth: true}},
  { path: '/sellingCommission', component: sellingCommission, meta: {requireAuth: true}},
  { path: '/briefing', component: briefing, meta: {requireAuth: true}},
  { path: '/customerAnalysis', component: customerAnalysis, meta: {requireAuth: true}},
  { path: '/activeCustomer', component: activeCustomer, meta: {requireAuth: true}},
  { path: '/tradingClient', component: tradingClient, meta: {requireAuth: true}},
  { path: '/intoGoldCustomer', component: intoGoldCustomer, meta: {requireAuth: true}},
  { path: '/outGoldCustomer', component: outGoldCustomer, meta: {requireAuth: true}},
  { path: '/admissionCustomer', component: admissionCustomer, meta: {requireAuth: true}},
  { path: '/leaveCustomer', component: leaveCustomer, meta: {requireAuth: true}},

  { path: '/sellingCommissionDetails', component: sellingCommissionDetails, meta: {requireAuth: true}},
  { path: '/modifySettlementAccount', component: modifySettlementAccount, meta: {requireAuth: true}},

  { path: '/takeGoods', component: takeGoods, meta: {requireAuth: true}},
  { path: '/takeGoodsDetails', component: takeGoodsDetails, meta: {requireAuth: true}},
  { path: '/takeCoodsProportion', component: takeCoodsProportion, meta: {requireAuth: true}},


  { path: '/assessment', component: assessment, meta: {requireAuth: true}},
  { path: '/firstLogin', component: firstLogin},
  { path: '/forgetPassword', component: forgetPassword},
  { path: '/setPassword', component: setPassword},
  { path: '/sellDetailed', component: sellDetailed, meta: {requireAuth: true}},
  { path: '/packageH', component: packages, meta: {requireAuth: true}},
  { 
    path: '/main', 
    component: main,
    meta: {
      requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
    },
    children:[
      { path: 'home', component: home, meta: {requireAuth: true}},
      { path: 'rebate', component: rebate, meta: {requireAuth: true}},
      { path: 'ranking', component: ranking, meta: {requireAuth: true}},
      { path: 'center', component: center, meta: {requireAuth: true}}
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

    if(localStorage.getItem("sessionToken")) {  
      window.scrollTo(0, 0);
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

router.push({ path: '/emptydata' }) 

Vue.http.interceptors.push((request, next)  =>{  
  // 登录成功后将后台返回的TOKEN在本地存下来,每次请求从sessionStorage中拿到存储的TOKEN值  
  let TOKEN=localStorage.getItem("sessionToken");  
  if(TOKEN){  
    //如果请求时TOKEN存在,就为每次请求的headers中设置好TOKEN,后台根据headers中的TOKEN判断是否放行  
    request.headers.set('sessionToken',TOKEN);  
    // console.log(request.headers)
  }  

  next((response) => {  
    if(response.body.result == "noSession"){
      // router.push({ path: '/login' });
    }
    return response;  
  });  
}); 

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');

Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = binding.value
  }
})
