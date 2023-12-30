<template>
  <q-layout>
    <q-tabs
      v-model="selectedTab"
      align="center"
      active-color="accent"
      indicator-color="accent"
      content-class="text-grey-10"
      narrow-indicator
      shrink
    >
      <q-route-tab
        :to="{
          path: '/user/orderlist/all',
          query: { userId: $route.query.userId, status: '', type: $route.query.type },
        }"
        label="全部订单"
        name="all"
      />
      <q-route-tab
        :to="{
          path: '/user/orderlist/unbalanced',
          query: { userId: $route.query.userId, status: 0, type: $route.query.type },
        }"
        label="未结算"
        name="unbalanced"
      />
      <q-route-tab
        :to="{
          path: '/user/orderlist/balanced',
          query: { userId: $route.query.userId, status: 1, type: $route.query.type },
        }"
        label="已结算"
        name="balanced"
      />
    </q-tabs>
    <q-page-container class="bg-primary items-center column">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component
            :is="Component"
            @need-login="needLogin"
            ref="order-list"
            :key="$route.fullPath"
          />
        </keep-alive>
      </router-view>
      <!-- <router-view
        :key="$route.fullPath"
        @need-login="needLogin"
        ref="order-list"
        class="bg-primary items-center column"
      >
      </router-view> -->
    </q-page-container>
    <login-qr
      :is-loading-qr="isLoadingQr"
      @login-card-changed="loginCardChange"
      :login-card="loginCard"
      :wechat-qr="wechatQr"
      :is-persistent="false"
    />
  </q-layout>
</template>

<script>
import 'src/config';
import LoginQr from 'src/components/LoginQr.vue';

export default {
  components: { LoginQr },
  data() {
    return {
      isLoadingQr: false,
      loginCard: false,
      wechatQr: '',
      selectedTab: 'all',
    };
  },
  mounted() {
    console.log('OrderLayout mounted');
  },

  methods: {
    needLogin() {
      console.log('needLogin is trigged:');
      let userInfo = this.$q.localStorage.getItem('userInfo');
      if (userInfo !== undefined && userInfo !== null) {
        this.$q.localStorage.remove('userInfo');
      }
      this.isLoadingQr = true;
      this.loginCard = true;
      this.$axios.post(`${global.config.domain}/wechat/createQr`, {}).then((res) => {
        this.isLoadingQr = false;
        if (res.data.code == 0) {
          this.wechatQr = res.data.data.qrUrl;
          let beginTime = new Date();
          // 先清除旧的timer
          clearInterval(this.timer);
          this.timer = window.setInterval(() => {
            this.$axios
              .post(`${global.config.domain}/user/getScanLoginInfo/${res.data.data.sceneStr}`, {})
              .then((res) => {
                if (res.data.code == 0) {
                  console.log('this.timer = ' + this.timer);
                  if (res.data.data.loginFlag) {
                    this.userName = res.data.data.nickname;
                    this.avatar = res.data.data.avatar;
                    this.isLogin = true;
                    this.$q.localStorage.set('userInfo', res.data.data);
                    window.clearInterval(this.timer); //清除定时器
                    this.loginCard = false;
                    if (itemId != undefined) {
                      this.$refs.child.$emit('logined', itemId);
                    }
                  } else {
                    let now = new Date();
                    if (now.getTime() - beginTime.getTime() > 10 * 60 * 1000) {
                      //如果五分钟了还未登陆则二维码过期
                      console.log('二维码过期');
                      window.clearInterval(this.timer); //清除定时器
                      this.$q.notify({
                        type: 'negative',
                        message: '二维码已过期，2秒后跳转页面',
                      });
                      setTimeout(() => {
                        this.$router.push({ path: '/' });
                      }, 2000);
                    }
                  }
                } else {
                  this.$q.notify({
                    type: 'negative',
                    message: res.data.msg,
                  });
                  console.log('that.timer = ' + this.timer);
                  window.clearInterval(this.timer); //清除定时器
                  this.loginCard = false;
                }
              });
          }, 1000);
        } else {
          this.$q.notify({
            type: 'negative',
            message: res.data.msg,
          });
          this.loginCard = false;
        }

        // this.$q.loading.hide();
      });
    },

    loginCardChange(value) {
      this.loginCard = value;
      this.isLoadingQr = false;
      this.wechatQr = '';
      clearInterval(this.timer);
    },
  },
};
</script>
