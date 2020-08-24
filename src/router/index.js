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
      path: '/font',
      name: 'font',
      component: () => import('../components/font/Home')
    },
    {
      path: '/',
      name: 'rrr',
      component: () => import('../components/rrr')
    },
    {
      path: '/Home',
      name: 'Home',
      component: () => import('../components/font/Home')
    },
    {
      path: '/back',
      name: 'back',
      component: () => import('../components/back/Login'),
      // 二级路由视图：Home.vue <router-view/>
      // 嵌套路由，子路由在父路由的组件内部的路由视图中显示
      children: [

      ]
    },
    {
      path: '/*',
      // name: '404',
      component: () => import('../components/404')
    }
  ]
})
