const routes = [
  {
    path: '/',
    component: () => import('layouts/YunpanLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/YunpanList.vue'),
        meta: { isList: true },
        props: (route) => ({
          query: route.query.q,
          x: route.query.x,
          idForLogin: route.query.idForLogin,
        }),
      },
      {
        path: 'list',
        component: () => import('pages/YunpanList.vue'),
        meta: { isList: true },
        props: (route) => ({
          query: route.query.q,
          x: route.query.x,
          idForLogin: route.query.idForLogin,
        }),
      },
      {
        path: 'list/:page',
        component: () => import('pages/YunpanList.vue'),
        meta: { isList: true },
        props: (route) => ({ query: route.query.q }),
      },
      {
        path: 'category/:category',
        meta: { isList: true },
        component: () => import('pages/YunpanList.vue'),
        props: (route) => ({ query: route.query.q, page: route.query.page }),
      },
      {
        path: 'd/:id',
        name: 'yunpanDetail',
        component: () => import('pages/YunpanItemDetail.vue'),
      },
      {
        path: 'article/:id',
        name: 'articleDetail',
        component: () => import('pages/YunpanArticle.vue'),
      },

      { path: 'mock/login', name: 'mocklogin', component: () => import('pages/MockLogin.vue') },
    ],
  },
  {
    path: '/coupon',
    component: () => import('layouts/CouponLayout.vue'),
    children: [
      {
        path: '',
        name: 'coupon',

        component: () => import('src/pages/CouponPage.vue'),
        props: (route) => ({ actId: route.query.actId }),
      },
    ],
  },

  // {
  //   path: '/yunpan',
  //   component: () => import('layouts/YunpanLayout.vue'),
  //   children: [
  //     {
  //       path: 'list',
  //       component: () => import('pages/YunpanList.vue'),
  //       meta: { isList: true },
  //       props: (route) => ({
  //         query: route.query.q,
  //         x: route.query.x,
  //         idForLogin: route.query.idForLogin,
  //       }),
  //     },
  //     {
  //       path: 'list/:page',
  //       component: () => import('pages/YunpanList.vue'),
  //       meta: { isList: true },
  //       props: (route) => ({ query: route.query.q }),
  //     },
  //     {
  //       path: 'category/:category',
  //       meta: { isList: true },
  //       component: () => import('pages/YunpanList.vue'),
  //       props: (route) => ({ query: route.query.q, page: route.query.page }),
  //     },
  //     {
  //       path: 'd/:id',
  //       component: () => import('pages/YunpanItemDetail.vue'),
  //     },
  //     {
  //       path: 'p/:id',
  //       component: () => import('pages/YunpanItemDetailShare.vue'),
  //     },
  //   ],
  // },

  {
    path: '/user',
    component: () => import('layouts/UserLayout.vue'),
    props: (route) => ({ code: route.query.code, state: route.query.state }),
    children: [
      {
        path: '',
        name: 'account',
        component: () => import('pages/UserM.vue'),
      },
      {
        path: 'orderlist',
        component: () => import('src/layouts/OrderLayout.vue'),
        children: [
          {
            path: 'all',
            component: () => import('pages/OrderList.vue'),
            props: (route) => ({ userId: route.query.userId, status: route.query.status }),
          },
          {
            path: 'unbalanced',
            component: () => import('pages/OrderList.vue'),
            props: (route) => ({ userId: route.query.userId, status: route.query.status }),
          },
          {
            path: 'balanced',
            component: () => import('pages/OrderList.vue'),
            props: (route) => ({ userId: route.query.userId, status: route.query.status }),
          },
        ],
      },
      { path: 'converturl', name: 'converturl', component: () => import('pages/Tool.vue') },

      { path: 'withdraw', name: 'withdraw', component: () => import('pages/WithdrawFund.vue') },
    ],
  },

  {
    path: '/auth/:urlCode',
    component: () => import('src/pages/AuthJumper.vue'),
    props: (route) => ({
      code: route.query.code,
      state: route.query.state,
    }),
  },

  { path: '/contact', component: () => import('src/pages/ContactMe.vue') },
  { path: '/help', component: () => import('pages/UploadWechatqrHelp.vue') },

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
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
