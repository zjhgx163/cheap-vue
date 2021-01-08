const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('layouts/IndexLayout.vue'),
        children: [
          {
            path: '',
            component: () => import('layouts/IndexTabLayout.vue'),
            children: [
              { path: '', component: () => import('pages/Index.vue') },
              { path: 'rank', component: () => import('pages/Index.vue') },
              { path: 'cheap', component: () => import('pages/Index.vue') },
              {
                path: 'search',
                name: 'search',
                component: () => import('pages/Index.vue'),
                props: (route) => ({ query: route.query.q }),
              },
            ],
          },
        ],
      },
      // {
      // path: '/search',
      // name: 'search',
      // component: () => import('layouts/IndexLayout.vue'),
      // children: [
      //   { path: '', component: () => import('pages/Index.vue') },
      //   { path: 'rank', component: () => import('pages/Index.vue') },
      //   { path: 'cheap', component: () => import('pages/Index.vue') },
      // ],
      // },
      {
        path: '/item/:id',
        name: 'detail',
        component: () => import('layouts/DetailLayout.vue'),
        children: [
          {
            path: '',
            component: () => import('pages/DetailPage.vue'),
            props: true,
          },
        ],
        // 在router之间传递参数用下面配置
        // props: (route) => ({ title: route.query.title, detail: route.query.detail }),
      },
    ],
  },
  // {
  //   path: '/main',
  //   component: () => import('pages/Index.vue'),
  //   // children: [{ path: 'main', component: () => import('pages/Index.vue') }],
  // },

  // Always leave this as last one,
  // but you can also remove it
  // {
  //   path: '/search',
  //   name: 'search',
  //   component: () => import('layouts/IndexLayout.vue'),
  //   props: (route) => ({ query: route.query.q }),
  //   children: [
  //     { path: '', component: () => import('pages/Index.vue') },
  //     { path: 'rank', component: () => import('pages/Index.vue') },
  //     { path: 'cheap', component: () => import('pages/Index.vue') },
  //   ],
  // },
  {
    path: '*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
