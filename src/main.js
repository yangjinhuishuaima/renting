// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store'
import http from './util/http'
import ui from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// post请求是格式化数据
import qs from 'qs'

// http.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
Vue.prototype.$axios = http
Vue.prototype.$store = store
Vue.prototype.$qs = qs
Vue.config.productionTip = false // element-ui的css
Vue.use(ui)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  watch: {
    $route: function (to, from) {
      console.log(to)// 当前路径
      console.log(from) // 前一个访问路径
    }
  }
})
