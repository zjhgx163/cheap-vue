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
              hot: () => import('components/ResourceSideList.vue'),
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
    path: '/yunpan',
    component: () => import('layouts/YunpanLayout.vue'),
    children: [
      { path: 'list', component: () => import('pages/YunpanList.vue') },
      {
        path: 'd/:id',
        component: () => import('pages/YunpanItemDetail.vue'),
      },
      {
        path: 'p/:id',
        component: () => import('pages/YunpanItemDetailShare.vue'),
      },
      {
        path: 'search',
        component: () => import('pages/YunpanList.vue'),
        props: (route) => ({ query: route.query.q }),
      },
    ],
  },
  // { path: '/yunpan/list', component: () => import('pages/YunpanList.vue') },

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
      { path: 'withdraw', name: 'withdraw', component: () => import('pages/Withdraw.vue') },
    ],
  },

  {
    path: '/my/orderlist',
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

  {
    path: '/auth/:urlCode',
    component: () => import('pages/Auth.vue'),
    props: (route) => ({
      code: route.query.code,
      state: route.query.state,
    }),
  },

  { path: '/contact', component: () => import('pages/Contact.vue') },
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
    path: '*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
