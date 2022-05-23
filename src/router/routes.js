// import IndexTabLayout from  'layouts/IndexTabLayout.vue'

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
            // component: () => import('layouts/IndexTabLayout.vue'),
            components: {
              default: () => import('layouts/IndexTabLayout.vue'),
              hot: () => import('components/HotList.vue'),
            },
            children: [
              {
                path: '',
                component: () => import('pages/Index.vue'),
              },
              {
                path: 'rank',
                component: () => import('pages/Index.vue'),
              },
              {
                path: 'cheap',
                component: () => import('pages/Index.vue'),
              },
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
      {
        path: 'coupon',
        component: () => import('layouts/CouponLayout.vue'),
        children: [
          {
            path: '',
            component: () => import('pages/Coupon.vue'),
          },
          { path: ':tabId', component: () => import('pages/Coupon.vue') },
        ],
      },
    ],
  },

  {
    path: '/user',
    component: () => import('pages/UserM.vue'),
    props: (route) => ({ code: route.query.code, state: route.query.state }),
  },

  {
    path: '/my/orderlist',
    component: () => import('pages/Order.vue'),
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

  {
    path: '/auth/:urlCode',
    component: () => import('pages/Auth.vue'),
    props: (route) => ({
      code: route.query.code,
      state: route.query.state,
    }),
  },

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
