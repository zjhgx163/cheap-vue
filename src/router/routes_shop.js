const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        meta: { isGoodsList: true },

        components: {
          default: () => import('pages/Index.vue'),
          // hot: () => import('components/HotList.vue'),
          hot: () => import('components/ResourceSideList.vue'),
        },
        props: {
          default: (route) => ({
            sort: route.query.sort,
          }),
          hot: false,
        },
      },
      {
        path: 'list/:page',
        meta: { isGoodsList: true },

        components: {
          default: () => import('pages/Index.vue'),
          // hot: () => import('components/HotList.vue'),
          hot: () => import('components/ResourceSideList.vue'),
        },
        props: {
          default: (route) => ({ query: route.query.q, sort: route.query.sort }),
          hot: false,
        },
      },
      {
        path: ':path',
        meta: { isGoodsList: true },

        components: {
          default: () => import('pages/Index.vue'),
          hot: () => import('components/ResourceSideList.vue'),
        },
        props: {
          default: (route) => ({
            query: route.query.q,
            page: route.query.page,
            sort: route.query.sort,
          }),
          hot: false,
        },
      },
      {
        path: 'search',
        name: 'search',
        meta: { isGoodsList: true },
        components: {
          default: () => import('pages/Index.vue'),
          hot: () => import('components/ResourceSideList.vue'),
        },
        props: {
          default: (route) => ({ query: route.query.q, x: route.query.x, sort: route.query.sort }),
          hot: false,
        },
      },
      {
        path: 'item',
        component: () => import('layouts/DetailLayout.vue'),
        // props: true,
        beforeEnter: (to, from, next) => {
          console.info('##before enter DetailLayout, to=' + to.fullPath);
          next();
        },
        children: [
          {
            name: 'detail',
            path: 'detail/:urlCode',
            component: () => import('pages/DetailPage.vue'),
            props: (route) => ({ taobaoCode: route.query.taobao_code }),

            // beforeEnter: (to, from, next) => {
            //   console.info('%%before enter DetailPage, to=' + to.fullPath);
            //   next();
            // },
          },
        ],
        // 在router之间传递参数用下面配置
        // props: (route) => ({ title: route.query.title, detail: route.query.detail }),
      },
      // {
      //   path: 'coupon',
      //   components: {
      //     default: () => import('layouts/CouponLayout.vue'),
      //     hot: () => import('components/ResourceSideList.vue'),
      //   },
      //   children: [
      //     {
      //       path: '',
      //       component: () => import('src/pages/CouponPage_archive.vue'),
      //     },
      //     { path: ':tabId', component: () => import('src/pages/CouponPage_archive.vue') },
      //   ],
      // },
      { path: 'mock/login', name: 'mocklogin', component: () => import('pages/MockLogin.vue') },
    ],
  },

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
