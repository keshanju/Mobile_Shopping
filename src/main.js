// 导入所需模块
import Vue from 'vue'
import App from './App'
import router from './router'
import vuex from 'vuex'
// ajax
import axios from 'axios'
import VueAxios from 'vue-axios'
// ui 框架
import Vant from 'vant'
import 'vant/lib/index.css'
// 懒加载 瀑布流
import { Lazyload, Waterfall } from 'vant'
import store from './store/index'
Vue.config.productionTip = false
Vue.use(VueAxios, axios)
// 状态管理
Vue.use(vuex)
Vue.use(Vant)
Vue.use(Lazyload)
Vue.use(Waterfall)

/* VUE实例 */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
