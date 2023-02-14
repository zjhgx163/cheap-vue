import Vue from 'vue';
// import VueRouter from 'vue-router';
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router';

import routesCheap from './routes';
import routesYunpan from './routes_yunpan';
//解决NavigationDuplicated
// const routerPush = VueRouter.prototype.push;
// VueRouter.prototype.push = function (location) {
//   return routerPush.call(this, location).catch((error) => error);
// };
let routes = process.env.ROUTE_YUNPAN ? routesYunpan : routesCheap;

console.log(process.env.ROUTE_YUNPAN + ` #############`);

// Vue.use(VueRouter);

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
    ? createWebHistory
    : createWebHashHistory;

  const Router = new createRouter({
    // scrollBehavior: () => ({ x: 0, y: 0 }),
    scrollBehavior: function (to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition;
      } else {
        // 如果不是通过上述行为切换组件，就会让页面回到顶部
        return { x: 0, y: 0 };
      }
    },
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    // mode: process.env.VUE_ROUTER_MODE,
    // base: process.env.VUE_ROUTER_BASE,
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  // Router.beforeEach((to, from, next) => {
  //   console.info('to =' + to.fullPath);
  //   console.info('from =' + from.fullPath);

  //   next();
  // });

  return Router;
}
