<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-primary text-grey-8 YL__750w">
      <q-toolbar class="q-mb-sm bg-secondary" v-bind:class="[itemPadding]">
        <div class="col-12 col-sm-10 justify-center">
          <q-input
            dense
            filled
            standout="text-white"
            square
            v-model="searchKey"
            placeholder="搜索"
            type="search"
            class="absolute-center YL__toolbar-input-container"
            v-on:keyup.enter="search"
          >
            <template v-slot:append>
              <q-btn name="search" icon="search" unelevated @click="search" />
            </template>
          </q-input>
        </div>
        <div class="col-sm-2 gt-sm row items-center justify-end">
          <span>{{ userName }}</span>

          <q-avatar size="2.5em">
            <img :src="avatar" />
          </q-avatar>

          <q-btn unelevated flat v-bind:class="{ hidden: !isLogin }" @click="logout">
            <a class="text-grey-9 text-weight-bold text-subtitle2"> 登出</a>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>
    <q-page-container class="bg-primary YL__750w">
      <keep-alive exclude="YunpanItemDetail">
        <router-view @need-login="needLogin" ref="child" :key="$route.fullPath" />
      </keep-alive>
    </q-page-container>

    <q-footer reveal class="bg-secondary q-py-md">
      <q-item>
        <q-item-section top side class="text-bold"> 声明：</q-item-section>
        <q-item-section>
          <q-item-label caption>
            本站所有资源均由网友自发提供，本站不存储任何资源，仅供于学习，请于保存后24小时内自行删除
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-footer>
    <login-qr :is-loading-qr="isLoadingQr" :login-card="loginCard" :wechat-qr="wechatQr" />
  </q-layout>
</template>
<style lang="sass">
.YL
  &__750w
    @media(min-width: $breakpoint-sm-min)
      width: 750px
      margin: 0px auto
      font-size: 14px
    @media(max-width: $breakpoint-xs-max)
      width: 100%
  &__toolbar-input-container
    @media(max-width: $breakpoint-xs-max)
      width: 90%
    @media(min-width: $breakpoint-xs-max)
      width: 50%
</style>

<script>
// import { fabYoutube } from '@quasar/extras/fontawesome-v5';
import { Screen } from 'quasar';
import 'src/config';
import LoginQr from 'src/components/LoginQr.vue';

export default {
  components: { LoginQr },
  name: 'YunpanLayout',

  data() {
    return {
      searchKey: '',
      host: global.config.domain,
      itemPadding: Screen.gt.sm ? 'q-py-none' : 'q-py-xs',
      userName: '',
      isLogin: false,
      isLoadingQr: false,
      loginCard: false,
      wechatQr: '',
      timer: null,
      avatar: 'https://cheap-david.oss-cn-hangzhou.aliyuncs.com/static/not_login_user.png',
    };
  },

  mounted() {
    console.log('YunpanLayout mounted');
    if (this.$q.localStorage.has('userInfo')) {
      let userInfo = this.$q.localStorage.getItem('userInfo');
      console.log(userInfo);
      if (userInfo !== undefined && userInfo !== null) {
        this.userName = userInfo.nickname;
        this.isLogin = true;
        if (userInfo.avatar != null && userInfo.avatar != '') {
          this.avatar = userInfo.avatar;
        }
      }
    }
  },
  beforeDestroy() {
    console.log('beforeDestroy');
    clearInterval(this.timer);
    this.timer = null;
  },
  beforeRouteLeave(to, from, next) {
    console.log('beforeRouteleave');
    clearInterval(this.timer);
    next();
  },
  methods: {
    search() {
      let randomNum = Math.random();
      this.$router
        .push({
          path: '/yunpan/search',
          query: { q: this.searchKey, x: randomNum },
        })
        .catch((err) => {
          err;
        });
    },
    needLogin(itemId) {
      console.log('needLogin is trigged:' + itemId);
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
                    this.isLogin = true;
                    this.$q.localStorage.set('userInfo', res.data.data);
                    window.clearInterval(this.timer); //清除定时器
                    this.loginCard = false;
                    this.$refs.child.$emit('logined', itemId);
                  } else {
                    let now = new Date();
                    if (now.getTime() - beginTime.getTime() > 5 * 60 * 1000) {
                      //如果五分钟了还未登陆则二维码过期
                      console.log('二维码过期');
                      window.clearInterval(this.timer); //清除定时器
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
    logout() {
      this.$axios.post(`${global.config.domain}/user/logout`, {}).then((res) => {
        if (this.$q.localStorage.has('userInfo')) {
          this.$q.localStorage.remove('userInfo');
          this.userName = '注册/登陆';
          this.avatar =
            'https://cheap-david.oss-cn-hangzhou.aliyuncs.com/static/not_login_user.png';
          this.isLogin = false;
        }
      });
    },
  },
};
</script>
