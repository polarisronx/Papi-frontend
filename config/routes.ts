export default [
  {
    name: '主页',
    icon: 'smile',
    path: '/',
    component: './Index',
  },
  {
    name: '接口详情页',
    icon: 'BarChartOutlined',
    path: '/interface_details/:id',
    component: './InterfaceInfo',
    hideInMenu: true, // 在菜单隐藏
  },
  {
    name: '协议',
    icon: 'BarChartOutlined',
    hideInMenu: true, // 在菜单隐藏
    routes: [
      { name: '隐私协议', path: '/agreement/privacy', component: './Agreement/privacy' },
      { name: '用户协议', path: '/agreement/user', component: './Agreement/user' },
    ],
  },
  {
    name: '接口市场',
    icon: 'BarChartOutlined',
    path: '/interfaceMarket',
    component: './InterfaceMarket',
  },
  {
    path: '/user',
    layout: false, //通过配置 layout: false 可以单独关闭某一个路由的全局布局
    routes: [
      { name: '登录', path: '/user/login', component: './User/Login' },
      { name: '注册', path: '/user/register', component: './User/Register' },
    ],
  },
  {
    name: '管理页面',
    path: '/admin',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {
        name: '接口管理',
        icon: 'table',
        path: '/admin/interface/info',
        component: './Admin/InterfaceInfo',
      },
      {
        name: '接口分析',
        icon: 'analysis',
        path: '/admin/interface/analysis',
        component: './Admin/InterfaceAnalysis',
      },
    ],
  },
  // { name: '表格', icon: 'table', path: '/list', component: './TableList' },
  // { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
