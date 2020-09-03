import Vue from 'vue'
import Router from 'vue-router'

const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(Router)

export default new Router({
  // 顶层路由视图：App.vue <router-view/>
  routes: [


    {
      path: '/',
      name: 'rrr',
      component: () => import('../components/rrr')
    },

  ]
})
