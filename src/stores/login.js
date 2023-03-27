import { defineStore } from 'pinia';

export const useLoginStore = defineStore('login', {
  state: () => ({
    authenticated: null,
  }),

  actions: {
    increment() {
      this.counter++;
    },
  },
});
