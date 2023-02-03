// import IndexTabLayout from  'layouts/IndexTabLayout.vue'

const routes = [
  {
    path: '/',
    component: () => import('layouts/YunpanLayout.vue'),
    children: [
      {
        path: 'list',
        component: () => import('pages/YunpanList.vue'),
        props: (route) => ({ query: route.query.q }),
      },
      {
        path: 'list/:page',
        component: () => import('pages/YunpanList.vue'),
        props: (route) => ({ query: route.query.q }),
      },
      {
        path: 'category/:category',
        component: () => import('pages/YunpanList.vue'),
        props: (route) => ({ query: route.query.q, page: route.query.page }),
      },
      // {
      //   path: 'd/:id',
      //   component: () => import('pages/YunpanItemDetail.vue'),
      // },
      // {
      //   path: 'p/:id',
      //   component: () => import('pages/YunpanItemDetailShare.vue'),
      // },
      // {
      //   path: 'search',
      //   component: () => import('pages/YunpanList.vue'),
      //   props: (route) => ({ query: route.query.q }),
      // },
    ],
  },

  {
    path: '*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
