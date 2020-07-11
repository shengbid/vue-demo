const menus = [
  {
    path: '/home',
    name: 'home',
    component: 'home',
    meta: { title: '首页', icon: 'el-icon-s-home' }
  },
  {
    path: '/demo',
    name: 'demo',
    component: '',
    meta: { title: '示例', icon: 'el-icon-s-operation' },
    children: [
      {
        path: '/demo/tree',
        component: 'demo/tree',
        name: 'tree',
        meta: { title: '树形图', icon: 'el-icon-menu' }
      },
      {
        path: '/demo/rotate',
        component: 'demo/rotate',
        name: 'rotateOrangination',
        meta: { title: '旋转', icon: 'el-icon-refresh' }
      },
      {
        path: '/demo/magnifer',
        component: 'demo/magnifer',
        name: 'magnifying',
        meta: { title: '放大镜', icon: 'el-icon-search' }
      },
      {
        path: '/demo/cascader',
        component: 'demo/cascader',
        name: 'cascadePanel',
        meta: { title: '级联面板', icon: 'el-icon-s-grid' }
      },
      {
        path: '/demo/treeTable',
        component: 'demo/treeTable',
        name: 'treeTable',
        meta: { title: '树形表格', icon: 'el-icon-s-grid' }
      },
      {
        path: '/demo/print',
        component: 'demo/print',
        name: 'print',
        meta: { title: '打印', icon: 'el-icon-printer' }
      }
    ]
  },
  {
    path: '/pdf/index',
    name: 'pdf',
    component: 'pdf',
    meta: { title: 'pdf', icon: 'el-icon-tickets' }
  },
  {
    path: '/nest',
    name: 'nest',
    component: '',
    meta: { title: '嵌套路由', icon: 'el-icon-connection' },
    children: [
      {
        path: '/nest/nest1',
        name: 'nest1',
        component: 'nest/nest1',
        meta: { title: '嵌套路由1', icon: 'el-icon-connection' },
      },
      {
        path: '/nest/nest1-1',
        name: 'nest1-1',
        component: 'CommonLayout',
        meta: { title: '嵌套路由1-1', icon: 'el-icon-connection' },
        children: [
          {
            path: '/nest/nest1-1/nest1-1-1',
            name: 'nest1-1-1',
            component: 'nest/nest1-1/nest1-1-1',
            meta: { title: '嵌套路由1-1-1', icon: 'el-icon-connection' },
          }
        ]
      }
    ]
  }
]

export default menus