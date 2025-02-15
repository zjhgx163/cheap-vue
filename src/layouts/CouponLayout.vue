<template>
  <q-layout>
    <div class="column flex-center bg-primary">
      <q-header elevated class="YL__750w bg-pink-4">
        <q-toolbar>
          <q-toolbar-title inset class="q-ml-md">生活频道</q-toolbar-title>
          <div class="col-sm-4 row flex-center">
            <q-btn unelevated flat>
              <a
                class="text-grey-9 text-weight-bold text-subtitle2"
                style="text-decoration: underline"
              >
                {{ userName }}</a
              >
            </q-btn>
            <q-avatar size="2.5em">
              <img :src="avatar" />
            </q-avatar>

            <!-- <q-btn unelevated flat v-bind:class="{ hidden: !isLogin }" @click="logout">
              <a class="text-grey-9 text-weight-bold text-subtitle2"> 登出</a>
            </q-btn> -->
          </div>
        </q-toolbar>
      </q-header>
      <div class="YL__750w bg-secondary">
        <q-page-container>
          <router-view :userInfo="userInfo" @need-login="needLogin"></router-view>
        </q-page-container>
      </div>
    </div>
    <login-qr
      :is-loading-qr="isLoadingQr"
      @login-card-changed="loginCardChange"
      :login-card="loginCard"
      :wechat-qr="wechatQr"
      :is-persistent="false"
    />
    <!-- <q-drawer side="right" :width="300" :breakpoint="700" show-if-above content-class="bg-primary">
    </q-drawer> -->
  </q-layout>
</template>

<style lang="sass">
.YL
  &__750w
    @media(min-width: $breakpoint-sm-min)
      width: 675px
      margin: 0px auto
      font-size: 14px
    @media(max-width: $breakpoint-xs-max)
      width: 100%
</style>

<script>
import LoginQr from 'src/components/LoginQr.vue';

export default {
  components: { LoginQr },
  name: 'CouponLayout',
  data() {
    return {
      avatar: '/static/not_login_user.png',
      userName: '注册/登陆',
      isLogin: false,
      userInfo: {},
      isLoadingQr: false,
      loginCard: false,
      wechatQr: '',
      timer: null,
    };
  },

  mounted() {
    // this.$emit('searchHidden', true);
    console.log('CouponLayout mounted');
    let windowWidth = window.screen.width;
    if (windowWidth > 1023.99) {
      this.isBigScreen = true;
    }

    if (this.$q.localStorage.has('userInfo')) {
      let userInfo = this.$q.localStorage.getItem('userInfo');
      console.log('userInfo', userInfo);
      if (userInfo !== undefined && userInfo !== null) {
        this.userInfo = userInfo;
        this.userName = userInfo.nickname;
        this.isLogin = true;
        if (userInfo.headimgurl != null && userInfo.headimgurl != '') {
          this.avatar = userInfo.headimgurl;
        }
      }
    }
  },

  created() {
    console.log('CouponLayout created');
  },

  methods: {
    loginCardChange(value) {
      this.loginCard = value;
      this.isLoadingQr = false;
      this.wechatQr = '';
      clearInterval(this.timer);
    },

    needLogin() {
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
                    this.userInfo = res.data.data;

                    this.isLogin = true;
                    this.$q.localStorage.set('userInfo', res.data.data);
                    window.clearInterval(this.timer); //清除定时器
                    this.loginCard = false;
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
  },
};
</script>
