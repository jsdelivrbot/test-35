import Vue from 'vue'
import Vuex from 'vuex';
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App'
import './common/js/jquery-1.8.3.min.js';
import './common/js/common.js';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import tool from './common/js/geoData.js';
Vue.use(VueAwesomeSwiper);
Vue.prototype.toolHelper = tool;

import center from './components/center/center.vue';
import details from './components/details/details.vue';
import record from './components/record/record.vue';
import mybuyrecord from './components/mybuyrecord/mybuyrecord.vue';
import caldetail from './components/caldetail/caldetail.vue';
import mybuy from './components/mybuy/mybuy.vue';
import mywinning from './components/mywinning/mywinning.vue';
import activeintro from './components/activeintro/activeintro.vue';
import mywinningdetail from './components/mywinningdetail/mywinningdetail.vue';
import mybuydetail from './components/mybuydetail/mybuydetail.vue';
import newpublish from './components/newpublish/newpublish.vue';
import graphicdetails from './components/graphicdetails/graphicdetails.vue';

import './common/stylus/index.styl';

Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = el.innerText
    el.remove()
  }
});
const store = new Vuex.Store({
  state: {
    goods: [],
    good: [],
    index: 0
  },
  mutations: {
    increment (state) {
      state
    }
  }
})

Vue.directive('drag', function (el) {
  el.ontouchstart = function (e) {
    var disX = e.targetTouches[0].pageX - el.offsetLeft;
    document.ontouchmove = function (e) {
      var l = e.targetTouches[0].pageX - disX;
      if (l >= 0) {
        el.style.left = 0;
      } else if (l <= -(el.offsetWidth - window.screen.availWidth)) {
        el.style.left = -(el.offsetWidth - window.screen.availWidth);
      } else {
        el.style.left = l + 'px';
      }
    };
    document.ontouchend = function () {
      document.ontouchmove = null;
      document.ontouchend = null;
    };
  };
});

const routes = [
  {
    path: '/', redirect: '/center'
  },
  {
    path: '/center', name: 'center', component: center
  },
  {
    path: '/details', name: 'details', component: details
  },
  {
    path: '/record', name: 'record', component: record
  },
  {
    path: '/caldetail', name: 'caldetail', component: caldetail
  },
  {
    path: '/activeintro', name: 'activeintro', component: activeintro
  },
  {
    path: '/mybuydetail', name: 'mybuydetail', component: mybuydetail
  },
  {
    path: '/mywinningdetail', name: 'mywinningdetail', component: mywinningdetail
  },
  {
    path: '/newpublish', name: 'newpublish', component: newpublish
  },
  {
    path: '/graphicdetails', name: 'graphicdetails', component: graphicdetails
  },
  {
    path: '/mybuyrecord', component: mybuyrecord,
    children: [
      {path: '/', redirect: '/mybuy'},
      {
        path: '/mybuy', name: 'mybuy', component: mybuy
      },
      {
        path: '/mywinning', name: 'mywinning', component: mywinning
      }
    ]
  }
];


const router = new VueRouter({
  routes,
  linkActiveClass: 'active',
  // mode: 'history',
  hashbang: true,
  saveScrollPosition: false,
  scrollBehavior: () => ({ y: 0 }),
});


Vue.config.productionTip = false

// router.push({ path: '/center' }) 

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');



