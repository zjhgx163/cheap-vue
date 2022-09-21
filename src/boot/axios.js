import Vue from 'vue';
import axios from 'axios';
import { LocalStorage } from 'quasar';
// 请求带cookie
axios.defaults.withCredentials = true;
axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    // console.log(response);
    let isLogin = response.headers['is-login'];
    console.log('isLogin = ' + isLogin);
    if (isLogin == 'false') {
      console.log('is-Login is false');
      if (LocalStorage.has('userInfo')) {
        // console.log(LocalStorage.getItem('userInfo'));
        console.log('remove userInfo');

        LocalStorage.remove('userInfo');
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
