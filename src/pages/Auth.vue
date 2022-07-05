<template>
  <div></div>
</template>

<script>
import 'src/config';

export default {
  props: ['code', 'state'],
  data() {
    return {
      host: global.config.domain,
      showing: false,
      taobaoPwd: '',
      alertText: '淘口令已复制\n请打开手淘',
    };
  },

  mounted() {
    //解决iphone移动端的延迟
    // FastClick.attach(document.body);

    this.wechatLogin(this.code, this.state);
  },

  methods: {
    wechatLogin(code, state) {
      this.$q.loading.show({
        delay: 400, // ms
      });
      // let that = this;
      this.$axios
        .post(`${global.config.domain}/wechat/accesstokenlogin`, {
          code: this.code,
          state: this.state,
        })
        .then((res) => {
          if (res.data == null) {
            console.log('error! res.data is null');
          }
          if (this.state == 'buy') {
            //代表购买商品
            this.buyClick(this.$route.params.urlCode);
          } else if (this.state.indexOf('coupon') > -1) {
            //领券操作
            let coupon_index = this.state.slice(6);
            console.log('coupon_index = ' + coupon_index);
            this.takeCouponClick(this.$route.params.urlCode, coupon_index);
          } else {
            console.log('order list' + this.state);
            this.$router.push({
              path: '/my/orderlist/all',
              query: { userId: this.$route.params.urlCode, status: this.state },
            });
          }
          // this.$q.loading.hide();
          // console.log(this.isBigSc = reen);
        });
    },

    buyClick(urlCode) {
      // this.$q.loading.show({
      //   delay: 100, // ms
      // });

      //淘口令要从后台取
      this.$axios.post(`${this.host}/goods/go/${urlCode}`, {}).then((res) => {
        console.log(res.data);
        if (typeof res.data === 'string') {
          if (/(http|https):\S*/.test(res.data)) {
            window.location.href = res.data;
            // window.open(res.data, '_blank');
          } else if (/redirect:\S*/.test(res.data)) {
            //redirect其他页面
            let redirectPath = res.data.slice(9);
            this.$router.push({ path: redirectPath });
          } else {
            console.log('taobaoPwd = ' + res.data);
            this.$router.push({
              path: 'item',
              name: 'detail',
              params: { urlCode: urlCode },
              query: { taobao_code: res.data },
            });
          }
          // window.open(res.data, '_blank');
          this.$q.loading.hide();
        } else {
          this.$q.notify({
            type: 'negative',
            message: '好物已过期',
          });
        }
      });
    },

    takeCouponClick(urlCode, index) {
      // this.$q.loading.show({
      //   delay: 100, // ms
      // });
      //因为每个用户的链接不同，需要每次从后台取链接
      console.log('coupon urlCode = ' + urlCode);
      this.$axios
        .post(`${this.host}/goods/coupon-url/${urlCode}?index=${index}`, {})
        .then((res) => {
          console.log(res.data);
          if (typeof res.data === 'string') {
            if (/(http|https):\S*/.test(res.data)) {
              window.location.href = res.data;
            } else if (/redirect:\S*/.test(res.data)) {
              //redirect其他页面
              let redirectPath = res.data.slice(9);
              this.$router.push({ path: redirectPath });
            } else {
              console.log('taobaoPwd = ' + res.data);
              that.$router.push({
                path: 'item',
                name: 'detail',
                params: { urlCode: urlCode },
                query: { taobao_code: res.data },
              });
            }
            // window.open(res.data, '_blank');
            this.$q.loading.hide();
          } else {
            this.$q.notify({
              type: 'negative',
              message: '好物已过期',
            });
          }
        });
    },
  },
};
</script>

<style lang="sass">
.YL
  &__750w
    width: 100%;
    max-width: 750px;
    min-width: 320px;
</style>
