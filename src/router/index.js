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
      path: '/back',
      name: 'back',
      component: () => import('../components/back/BLogin')
    },
    {
      path: '/',
      name: 'rrr',
      component: () => import('../components/rrr')
    },
    {
      path: '/login',
      name: 'FLogin',
      component: () => import('../components/font/FLogin')
    },
    {
      path: '/bhome',
      name: 'BHome',
      component: () => import('../components/back/BHome'),
      redirect: {name: 'Hello'},
      // 二级路由视图：BHome.vue <router-view/>
      // 嵌套路由，子路由在父路由的组件内部的路由视图中显示
      children: [
        {
          path: '/hello',
          name: 'Hello',
          component: () => import('../components/back/Hello')
        },
        {
          path: '/role',
          name: 'Role',
          component: () => import('../components/back/Role')
        }, {
          path: 'mana',
          name: 'Mana',
          component: () => import('../components/back/mana')
        }
        // {
        //   path: 'permission',
        //   name: 'permission',
        //   component: () => import('../components/permission')
        // },
        // {
        //   path: 'customer',
        //   name: 'customer',
        //   component: () => import('../components/customer')
        // }
      ]
    },
    {
      path: '/*',
      // name: '404',
      component: () => import('../components/404')
    }
  ]
})
