export default [
  { 
    name: '主页',
    icon: 'smile',
    path: '/',
    component: './Index'
  },
  {
    name: '接口详情页',
    icon: 'BarChartOutlined',
    path: '/interface_details/:id',
    component: './InterfaceInfo',
    hideInMenu: true, // 在菜单隐藏
  },
  {
    name:'登录',
    path: '/user',
    layout: false, //通过配置 layout: false 可以单独关闭某一个路由的全局布局
    routes: [{ path: '/user/login', component: './User/Login' }] },
  {
    name: '管理页面',
    path: '/admin',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      { name: '接口管理', icon:'table', path: '/admin/interface_info', component: './Admin/InterfaceInfo' },
    ],
  },
  // { name: '表格', icon: 'table', path: '/list', component: './TableList' },
  // { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
