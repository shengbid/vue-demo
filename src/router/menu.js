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
    path: '/editImage',
    name: 'editImage',
    component: '',
    meta: { title: '图形编辑', icon: 'el-icon-picture' },
    children: [
      {
        path: '/editImage/image',
        name: 'editImage',
        component: '/editImage/editImage',
        meta: { title: '图形编辑', icon: 'el-icon-picture' },
      },
      {
        path: '/editImage/imageObj',
        name: 'editImageObj',
        component: '/editImage/imgobj',
        meta: { title: '图形编辑(js包引入)', icon: 'el-icon-picture' },
      },
      {
        path: '/editImage/upload/file',
        name: 'uploadFile',
        component: '/editImage/upload',
        meta: { title: '文件列表上传', icon: 'el-icon-files' },
      }
    ]
  },
  {
    path: '/Table',
    name: 'table',
    component: '',
    meta: { title: '表格', icon: 'el-icon-menu' },
    children: [
      {
        path: '/Table/tree',
        name: 'treeTable',
        component: '/Table/treeTable',
        meta: { title: '树形表格', icon: 'el-icon-s-grid' },
      },
      {
        path: '/Table/validate',
        name: 'validateTable',
        component: '/Table/validateTable',
        meta: { title: '可验证表格', icon: 'el-icon-notebook-2'},
      },
      {
        path: '/Table/checkbox',
        name: 'checkTable',
        component: '/Table/checkTable',
        meta: { title: '可选择表格', icon: 'el-icon-notebook-2'},
      },
      {
        path: '/Table/span',
        name: 'spanTable',
        component: '/Table/spanTable',
        meta: { title: '表格合并', icon: 'el-icon-film'},
      },
      {
        path: '/Table/hover',
        name: 'hoverSpanTable',
        component: '/Table/hoverSpanTable',
        meta: { title: '表格合并hover', icon: 'el-icon-film'},
      },
      {
        path: '/Table/radio',
        name: 'radioTable',
        component: '/Table/radioTable',
        meta: { title: '单选表格', icon: 'el-icon-film'},
      }
    ]
  },
  {
    path: '/Form',
    component: '',
    meta: { title: 'Form表单', icon: 'el-icon-connection' },
    children: [
      {
        path: '/Form/tree',
        component: '/Form/tree',
        name: 'debounceSelect',
        meta: { title: '延迟搜索select', icon: 'el-icon-s-grid' }
      },
    ]
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