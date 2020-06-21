import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'
import CommonLayout from '@/layout/commonLayout'

const constantRoter = [{
  path: '/login',
  component: () => import('@/views/login'),
  name: 'login',
}, {
  path: '/',
  component: Layout,
  redirect: '/home',
  children: [
    {
      path: 'home',
      component: () => import('@/views/home'),
      name: 'home',
      meta: { title: '首页', icon: 'el-icon-s-home' }
    }
  ]
}, {
  path: '/demo',
  component: Layout,
  redirect: '/demo/tree',
  children: [
    {
      path: 'tree',
      component: () => import('@/views/demo/tree'),
      name: 'tree',
      meta: { title: '树形图', icon: 'el-icon-menu' }
    },
    {
      path: 'rotate',
      component: () => import('@/views/demo/rotate'),
      name: 'rotateOrangination',
      meta: { title: '旋转', icon: 'el-icon-menu' }
    },
    {
      path: 'magnify',
      component: () => import('@/views/demo/magnifer'),
      name: 'magnifying',
      meta: { title: '放大镜', icon: 'el-icon-search' }
    },
    {
      path: 'cascader',
      component: () => import('@/views/demo/cascader'),
      name: 'cascadePanel',
      meta: { title: '级联面板', icon: 'el-icon-s-grid' }
    }
  ]
}, {
  path: '/nest',
  component: Layout,
  redirect: '/nest/nest1',
  children: [
    {
      path: 'nest1',
      name: 'nest1',
      component: () => import('@/views/nest/nest1-1'),
      meta: { title: '嵌套路由1', icon: 'el-icon-connection' },
    },
    {
      path: 'nest1-1',
      component: CommonLayout,
      redirect: '/nest/nest1-1/nest1-1-1',
      children: [
        {
          path: 'nest1-1-1',
          name: 'nest1-1-1',
          component: () => import('@/views/nest/nest1-1/nest1-1-1'),
          meta: { title: '嵌套路由1-1-1', icon: 'el-icon-connection' },
        }
      ]
    }]
  }
]

const router = new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoter
})

export default router