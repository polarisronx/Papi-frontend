export default [
  { 
    name: '主页',
    icon: 'smile',
    path: '/',
    component: './Index'
  },
  {
    name:'登录',
    path: '/user',
    layout: false,
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
