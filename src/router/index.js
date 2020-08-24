import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
    return originalPush.call(this, location).catch(err => err)
}
Vue.use(Router)

export default new Router({
  routes: [
      {
          path: '/back/',
          name: '/back/Login',
          component: () => import('../components/back/Login')
      }, {
          path: '/back/home',
          name: '/back/Home',
          component: () => import('../components/back/Home'),
          // 二级路由视图：Home.vue <router-view/>
          // 嵌套路由，子路由在父路由的组件内部的路由视图中显示
          children: [
              {
                  path: '/back/*',
                  name: '/back/404',
                  component: () => import('../components/back/404')
              }
          ]
      },
      {
          path: '/back/403',
          name: '/back/403',
          component: () => import('../components/back/403')
      },
      {
          path: '/back/*',
          name: '/back/404',
          component: () => import('../components/back/404')
      }
  ]
})
