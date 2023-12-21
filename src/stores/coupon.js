import { defineStore } from 'pinia';
import { axios } from 'boot/axios';
import { Loading } from 'quasar';

export const useCouponStore = defineStore('coupons', {
  state: () => ({
    topCoupons: [],
    coupons: [],
    isListEnd: false,

    couponInfo: [],
    categoryInfo: [],
    userAgent: '',
  }),

  actions: {
    getTopCoupons() {
      return axios.post(`${global.config.domain}/coupon/top`, {}).then((res) => {
        // console.log(res.data.data);
        console.log('getTopCoupons  return');
        console.log(res.data.data);

        this.topCoupons = res.data.data;

        Loading.hide();
        // this.$q.loading.hide();
      });
    },

    getCouponPage(page, path, q, sortIndex) {
      return axios.post(`${global.config.domain}/coupon/page`, {}).then((res) => {
        this.coupons = res.data.data.records;
        console.log();

        if (res.data.data.records.length < 20) {
          this.isListEnd = true;
        }
        this.maxPage = Math.ceil(res.data.data.total / res.data.data.size);
        console.log('this.maxPage ' + this.maxPage);
      });
    },
  },
});
