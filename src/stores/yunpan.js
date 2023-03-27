import { defineStore } from 'pinia';
import { axios } from 'boot/axios';
import { Loading } from 'quasar';

export const useYunpanStore = defineStore('yunpan', {
  state: () => ({
    items: [],
    sideItems: [],
    isListEnd: false,
    pageNavigateHidden: true,
    stopLoading: false,
    max: 0,
    prefetchFlag: 0,
  }),

  getters: {
    doubleCount(state) {
      return state.counter * 2;
    },
  },

  actions: {
    getItemList(page, query, tag, x, redirect) {
      return axios
        .post(`${global.config.domain}/yunpan/resource/list`, {
          page: page === undefined ? 1 : page,
          tag: tag,
          query: query,
        })
        .then((res) => {
          if (res.data.code < 0) {
            redirect({ path: '/error/404' }, 301);
          } else {
            this.items = res.data.data.records;
            this.max = Math.ceil(res.data.data.total / res.data.data.size);
            if (res.data.data.records.length < 30 || page >= this.max) {
              this.isListEnd = true;
              this.pageNavigateHidden = false;
              this.stopLoading = true;
            }
            //只有点击‘搜索’才记录关键词
            if (x !== undefined && x != null) {
              axios
                .post(`${global.config.domain}/yunpan/search/log`, {
                  searchKeyword: query,
                  total: res.data.data.total,
                  x: x,
                })
                .then((res) => {
                  console.log(res.data.data);
                });
            }
          }

          console.log('hidden = ' + this.pageNavigateHidden);
          console.log('this.current  = ' + page);
          console.log('this.isListEnd  = ' + this.isListEnd);
          Loading.hide();
        });
    },
    getSideYunpanList() {
      // console.log('$$$$$$' + this.query);
      // this.$q.loading.show({
      //   delay: 400, // ms
      // });
      return axios
        .post(`${global.config.domain}/yunpan/resource/list`, {
          page: 1,
        })
        .then((res) => {
          this.sideItems = res.data.data.records;

          // this.$q.loading.hide();
        });
    },
  },
});
