import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as mutations from './mutations'
import * as actions from './action'
Vue.use(Vuex)

const store = new Vuex.Store({
  // 定义状态
  state: {
    currentUser: null,
    isLogin: false,
    token: '',
    userPwd: null
  },
  getters,
  mutations,
  actions
})

export default store
