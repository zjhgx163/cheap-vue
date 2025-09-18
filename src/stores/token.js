import { defineStore } from 'pinia';

export const useTokenStore = defineStore('token', {
  state: () => ({
    userInfo: {},
    token: '',
  }),

  getters: {},

  actions: {
    setToken(data) {
      console.log('setToken execute');
      this.token = data;
    },

    setUserInfo(data) {
      console.log('setUserInfo execute');
      this.userInfo = data;
    },
  },
});
