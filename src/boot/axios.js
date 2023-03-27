// import Vue from 'vue';
import { boot } from 'quasar/wrappers';
import axios from 'axios';
import { LocalStorage } from 'quasar';
// import { useLoginStore } from 'stores/login';
// 请求带cookie
axios.defaults.withCredentials = true;

// axios.interceptors.request.use((req) => {
//   console.log('request');
//   console.log(`${JSON.stringify(req, null, 2)}`);
//   // you must return the request object after you are done
//   return req;
// });

axios.interceptors.response.use(
  function (response) {
    console.log('response');
    let isLogin = response.headers['is-login'];
    console.log('isLogin = ' + isLogin);
    // console.log('xxxcxcxcxcx');

    // const loginStore = useLoginStore();
    // console.log(loginStore);

    //ssr时，返回的isLogin总是false，因为ssr的cookie和浏览器上的是不一样的

    if (process.env.CLIENT) {
      if (isLogin == 'false') {
        if (LocalStorage.has('userInfo')) {
          // console.log(LocalStorage.getItem('userInfo'));
          console.log('remove userInfo');

          LocalStorage.remove('userInfo');
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
