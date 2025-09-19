// import Vue from 'vue';
import { boot } from 'quasar/wrappers';
import axios from 'axios';
import { LocalStorage } from 'quasar';
// import 'src/config';
import { useTokenStore } from 'stores/token.js';
// 请求带cookie
axios.defaults.withCredentials = true;

let getPreferences;
let removePreferences;
let tokenStore;

if (process.env.MODE === 'capacitor') {
  tokenStore = useTokenStore();

  import('src/capacitor-preferences').then((result) => {
    let { removeValue, getValue } = result;
    getPreferences = getValue;
    removePreferences = removeValue;
  });
}
// if (process.env.BUILD_TARGET === 'capacitor') {
//   require('src/capacitor-preferences.js');
// }
axios.interceptors.request.use((req) => {
  console.log('request');
  // you must return the request object after you are done
  if (process.env.MODE === 'capacitor') {
    console.log('###XXX' + tokenStore.token);
    if (tokenStore.token != '') {
      req.headers.Authorization = `Bearer ${tokenStore.token}`;
    }
  }

  return req;
});

axios.interceptors.response.use(
  function (response) {
    let isLogin = response.headers['is-login'];
    console.log('isLogin = ' + isLogin);
    // console.log('xxxcxcxcxcx');

    // const loginStore = useLoginStore();
    // console.log(loginStore);
    if (process.env.MODE === 'capacitor') {
      //认证错误
      if (response.data.code == -401) {
        console.log('bearer token 认证失败');
        if (tokenStore.token != '') {
          // remove token
          tokenStore.token = 'bearer_initial';
          tokenStore.userInfo = {};
          getPreferences('token').then((token) => {
            if (token != null && token != '') {
              removePreferences('token');
              removePreferences('userInfo');
            }
          });
        }
      }

      return response;
    } else {
      //ssr时，返回的isLogin总是false，因为ssr的cookie和浏览器上的是不一样的
      if (process.env.CLIENT) {
        console.log('is client');
        if (isLogin == 'false') {
          if (LocalStorage.has('userInfo')) {
            // console.log(LocalStorage.getItem('userInfo'));
            console.log('remove userInfo');

            LocalStorage.remove('userInfo');
          }
        }
      }
    }

    return response;
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

// Vue.prototype.$axios = axios;
export default boot(({ app, store }) => {
  // const loginStore = useLoginStore(store);

  app.config.globalProperties.$axios = axios;
  // app.config.globalProperties.$api = api;
});
export { axios };
