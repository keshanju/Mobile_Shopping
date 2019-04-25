import Vue from 'vue'
import vuex from 'vuex'
// 引入store对象
import home from './Core_store/home'
import active from './Core_store/active'
import community from './Core_store/community'
Vue.use(vuex)

export default new vuex.Store({
  modules: {
    home: home,
    active: active,
    community: community
  }
})
