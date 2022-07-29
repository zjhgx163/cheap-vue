import Vue from 'vue';
import axios from 'axios';
import { SessionStorage } from 'quasar';
// 请求带cookie
axios.defaults.withCredentials = true;
axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    console.log(response);
    let isLogin = response.headers['is-login'];
    console.log('isLogin = ' + isLogin);
    if (isLogin == 'false') {
      console.log('is-Login is false');
      if (SessionStorage.has('userInfo')) {
        console.log(SessionStorage.getItem('userInfo'));
        console.log('remove userInfo');

        // SessionStorage.remove(userInfo);
      }
    }
    return response;
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error);
  },
);

Vue.prototype.$axios = axios;
