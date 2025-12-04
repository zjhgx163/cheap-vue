import { defineStore } from 'pinia';
import { axios } from 'boot/axios';

export const useAppstateStore = defineStore('appstate', {
  state: () => ({
    isStateChangedMap: new Map(),
  }),

  getters: {},

  actions: {
    fireAppEvent(id, deviceInfo) {
      axios
        .post(`${global.config.domain}/capacitor/event`, {
          identifier: id,
          deviceInfo: deviceInfo,
        })
        .then((res) => {
          console.log(res.data.data);
        });
    },
  },
});
