import Vue from 'vue';
import axios from 'axios';

// 请求带cookie
axios.defaults.withCredentials = true;
Vue.prototype.$axios = axios;
