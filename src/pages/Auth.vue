<template>
  <div></div>
</template>

<script>
import 'src/config';
import $ from 'jquery';

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
      this.$axios
        .post(`${global.config.domain}/wechat/accesstokenlogin`, {
          code: this.code,
          state: this.state,
        })
        .then((res) => {
          console.log('res.data = ' + res.data);
          if (res.data == null) {
          }
          if (this.state == 'buy') {
            //代表购买商品
            this.buyClick(this.$route.params.urlCode);
          } else {
            //领券操作
            this.takeCouponClick($route.params.urlCode, this.state.slice(6));
          }
          this.$q.loading.hide();
          // console.log(this.isBigSc = reen);
        });
    },

    buyClick(urlCode) {
      this.$q.loading.show({
        delay: 100, // ms
      });

      //淘口令要从后台取
      let that = this;
      this.$axios.post(`${this.host}/goods/go/${urlCode}`, {}).then((res) => {
        console.log(res.data);
        if (/(http|https):\S*/.test(res.data)) {
          window.location.href = res.data;
          // window.open(res.data, '_blank');
        } else if (/redirect:\S*/.test(res.data)) {
          //redirect其他页面
          let redirectPath = res.data.slice(9);
          that.$router.push({ path: redirectPath });
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
      });
    },

    takeCouponClick(code, index) {
      let that = this;
      $.ajaxSettings.async = false;
      $.ajax({
        type: 'POST',
        async: false,
        xhrFields: {
          //携带cookie
          withCredentials: true,
        },
        contentType: 'application/json;charset=UTF-8',
        url: `${this.host}/goods/coupon-url/${code}?index=${index}`,
        success: function (res) {
          console.log('res = ' + res);
          if (/(http|https):\S*/.test(res)) {
            window.location.href = res;
          } else if (/redirect:\S*/.test(res)) {
            //redirect其他页面
            let redirectPath = res.slice(9);
            that.$router.push({ path: redirectPath });
          } else {
            that.taobaoPwd = res;
            console.log('coupon taobaoPwd = ' + res);
          }
        },
      });

      if (this.taobaoPwd != '') {
        this.$copyText(this.taobaoPwd).then(
          function (e) {
            console.log('coupon this.taobaoPwd = ' + that.taobaoPwd);

            that.showing = true;
            let t = setTimeout(() => {
              that.showing = false;
            }, 1500);
          },
          function (e) {
            alert('Can not copy');
            console.log(e);
          },
        );
      }
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
  &__user_money
    line-height: 1.2em !important
</style>
