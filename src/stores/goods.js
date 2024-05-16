import { defineStore } from 'pinia';
import { axios } from 'boot/axios';
import { Loading } from 'quasar';

export const useGoodsStore = defineStore('goods', {
  state: () => ({
    prefetchFlag: 0, //prefetch是否执行过标志
    items: [],
    maxPage: 0,
    isListEnd: false,
    detail: {},
    detailParts: [],
    bigImages: [],
    couponInfo: [],
    categoryInfo: [],
    userAgent: '',
  }),

  getters: {
    doubleCount(state) {
      return state.counter * 2;
    },
  },

  actions: {
    getItemList(page, path, q, sortIndex) {
      // console.log('page =' + page);
      // console.log('path =' + path);
      // console.log('q =' + q);
      // console.log('sortIndex =' + sortIndex);

      return axios
        .post(`${global.config.local}/goods/list`, {
          page: page === undefined ? 1 : page,
          path: path === undefined ? null : path,
          query: q === undefined ? null : q,
          sort: sortIndex === undefined ? null : sortIndex,
        })
        .then((res) => {
          // console.log(res.data.data);
          console.log('getItemList  return');

          this.items = res.data.data.records;
          // console.log(this.items);
          if (res.data.data.records.length < 20) {
            this.isListEnd = true;
          }
          this.maxPage = Math.ceil(res.data.data.total / res.data.data.size);
          console.log('this.maxPage ' + this.maxPage);
          Loading.hide();
          // this.$q.loading.hide();
        });
    },
    getGoodDetail(urlCode, redirect) {
      return axios.post(`${global.config.local}/goods/detail`, { code: urlCode }).then((res) => {
        this.detail = res.data.data;
        // console.log(this.detail);
        if (this.detail == null) {
          redirect({ path: '/' }, 301);

          Loading.hide();
        }
        this.detailParts = JSON.parse(this.detail.detail);
        if (this.detail.bigImageUrls) {
          this.bigImages = JSON.parse(this.detail.bigImageUrls);
        }
        if (this.detail.couponInfo) {
          this.couponInfo = JSON.parse(this.detail.couponInfo);
        }
        this.categoryInfo = JSON.parse(this.detail.categoryText);

        Loading.hide();
      });
    },
  },
});
