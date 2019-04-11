import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/Layout'

Vue.use(Router)

const BoardConfig = () => import('@/views/config/board/BoardConfig')

export default new Router({
  routes: [
    {
      path: '',
      component: Layout,
      redirect: 'login'
    }, {
      path: '/login',
      name: 'login',
      component: _ => import('@/views/login')
    }, {
      path: '/dashboard',
      name: 'dashboard',
      component: Layout,
      children: [{
        // path: ':name/:id',
        path: ':id',
        // component: Dashboard
        component: _ => import('@/views/dashboard/index')
        // component: _ => import('@/views/dashboard/Dashboard')
      }]
    }, {
      path: '/config',
      name: 'config',
      component: Layout,
      children: [
        {
          path: 'board',
          name: 'BoardConfig',
          component: BoardConfig
        }
        // {
        //   path: 'job',
        //   name: 'jobConfig',
        //   component: () => import('@/views/config/job/jobConfig')
        // }
      ]
    }, {
      path: '/admin',
      name: 'admin',
      component: Layout,
      children: [{
        path: 'user',
        name: 'user',
        component: _ => import('@/views/admin/UserAdmin')
      }]
    }
    // {
    //   path: '*',
    //   redirect: '404'
    // }, {
    //   path: '/404',
    //   name: '404',
    //   component: Layout,
    //   component: _ => import('@/views/404')
    // }
  ]
})
