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
  path: '/down',
  component: () => import('@/views/pdf/download'),
  name: 'downpdf',
  meta: { title: 'pdf', icon: 'el-icon-s-home' }
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
      component: CommonLayout,
      redirect: '/tree/tree1',
      children: [
        {
          path: 'tree1',
          name: 'tree1',
          component: () => import('@/views/demo/tree'),
          meta: { title: '树形图1', icon: 'el-icon-menu' }
        },
        {
          path: 'tree2',
          name: 'tree2',
          component: () => import('@/views/demo/tree/tree2'),
          meta: { title: '树形图2', icon: 'el-icon-menu' }
        },
        {
          path: 'tree3',
          name: 'tree3',
          component: () => import('@/views/demo/tree/tree3'),
          meta: { title: '树形图3', icon: 'el-icon-menu' }
        }
      ]
    },
    // {
    //   path: 'tree',
    //   component: () => import('@/views/demo/tree'),
    //   name: 'tree',
    //   meta: { title: '树形图', icon: 'el-icon-menu' }
    // },
    // {
    //   path: 'tree/tree2',
    //   component: () => import('@/views/demo/tree/tree2'),
    //   name: 'tree2',
    //   meta: { title: '树形图2', icon: 'el-icon-menu' }
    // },
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
    },
    {
      path: 'print',
      component: () => import('@/views/demo/print'),
      name: 'print',
      meta: { title: '打印', icon: 'el-icon-s-grid' }
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
  }, {
    path: '/pdf',
    component: Layout,
    redirect: '/pdf/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/pdf'),
        name: 'pdf',
        meta: { title: 'pdf', icon: 'el-icon-s-home' }
      }
    ]
  }, {
    path: '/editImage',
    component: Layout,
    redirect: '/editImage/image',
    children: [
      {
        path: 'image',
        component: () => import('@/views/editImage/editImage'),
        name: 'editImage',
        meta: { title: 'editImage', icon: 'el-icon-picture' }
      },
      {
        path: 'imageObj',
        component: () => import('@/views/editImage/imgobj'),
        name: 'editImageObj',
        meta: { title: 'editImage', icon: 'el-icon-picture' }
      },
      {
        path: 'upload/file',
        component: () => import('@/views/editImage/upload'),
        name: 'uploadFile',
        meta: { title: 'uploadFile', icon: 'el-icon-picture' }
      },
    ]
  }, {
    path: '/Table',
    component: Layout,
    redirect: '/Table/tree',
    children: [
      {
        path: 'tree',
        component: () => import('@/views/Table/treeTable'),
        name: 'treeTable',
        meta: { title: '树形表格', icon: 'el-icon-s-grid' }
      },
      {
        path: 'validate',
        component: () => import('@/views/Table/validateTable'),
        name: 'validateTable',
        meta: { title: '可验证表格', icon: 'el-icon-notebook-2' }
      },
      {
        path: 'checkbox',
        component: () => import('@/views/Table/checkTable'),
        name: 'checkTable',
        meta: { title: '可选择表格', icon: 'el-icon-notebook-2' }
      },
      {
        path: 'spanTable',
        component: () => import('@/views/Table/spanTable'),
        name: 'spanTable',
        meta: { title: '表格合并', icon: 'el-icon-film' }
      },
      {
        path: 'hoverSpanTable',
        component: () => import('@/views/Table/hoverSpanTable'),
        name: 'hoverSpanTable',
        meta: { title: '表格合并hover', icon: 'el-icon-film' }
      },
      {
        path: 'radioTable',
        component: () => import('@/views/Table/radioTable'),
        name: 'radioTable',
        meta: { title: '单选表格', icon: 'el-icon-film' }
      }
    ]
  }, {
    path: '/Form',
    component: Layout,
    redirect: '/Form/select',
    children: [
      {
        path: 'select',
        component: () => import('@/views/Form/select'),
        name: 'debounceSelect',
        meta: { title: '延迟搜索select', icon: 'el-icon-s-grid' }
      },
      {
        path: 'validate',
        component: () => import('@/views/Form/formValidate'),
        name: 'formValidate',
        meta: { title: 'form表单验证', icon: 'el-icon-s-grid' }
      },
      {
        path: 'ellipsis',
        component: () => import('@/views/Form/ellipsis'),
        name: 'ellipsis',
        meta: { title: '换行省略', icon: 'el-icon-s-grid' }
      },
    ]
  }
]

const router = new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoter
})

export default router