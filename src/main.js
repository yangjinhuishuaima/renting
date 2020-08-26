// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import http from './util/http'
import ui from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import VueAwesomeSwiper from 'vue-awesome-swiper'
// require styles
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper)

http.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
Vue.prototype.$axios = http
Vue.config.productionTip = false
Vue.use(ui)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  watch: {
    $route: function (to, from) {
      /* console.log(to)// 当前路径
      console.log(from) // 前一个访问路径 */
    }
  }
})
