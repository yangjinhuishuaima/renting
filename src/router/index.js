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
          path: '/fadmins',
          name: 'Fadmins',
          component: () => import('../components/font/Fadmins'),
          children: [
              {
                  path: 'fadmin',
                  name: 'Fhouseshow',
                  component: () => import('../components/font/Fhouseshow')
              },
              {
                  path: 'fadmin',
                  name: 'Fadmin',
                  component: () => import('../components/font/Fadmin')
              },
              {
                  path: 'fser',
                  name: 'Fservice',
                  component: () => import('../components/font/Fservice')
              },
              {
                  path: 'fuppwd',
                  name: 'Fuppwd',
                  component: () => import('../components/font/Fuppwd')
              }
          ]
      },
      {
          path: 'fh',
          name: 'FHouseadd',
          component: () => import('../components/font/FHouseadd')
      },
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
      name: 'Login',
      component: () => import('../components/font/Login')
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
          component: () => import('../components/back/Mana')
        }, {
              path: 'badphoto',
              name: 'BAdphoto',
              component: () => import('../components/back/BAdphoto')
        }, {
              path: 'bservice',
              name: 'Bservice',
              component: () => import('../components/back/Bservice')
          },
          {
              path: '/bhouse',
              name: 'BHouse',
              component: () => import('../components/back/BHouse')
          },
          {
              path: '/bhouse_trouble',
              name: 'BHouse_trouble',
              component: () => import('../components/back/BHouse_trouble')
          },
          {
              path: '/unver',
              name: 'Unverified',
              component: () => import('../components/back/Unverified')
          },
          {
              path: '/verified',
              name: 'Verified',
              component: () => import('../components/back/Verified')
          }
      ]
    },
    {
      path: '/*',
      // name: '404',
      component: () => import('../components/404')
    }
  ]
})
