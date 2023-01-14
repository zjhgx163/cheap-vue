<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-primary text-grey-8 YL__750w">
      <q-toolbar class="bg-secondary" v-bind:class="[itemPadding]">
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
            hide-bottom-space
          >
            <template v-slot:append>
              <q-btn name="search" icon="search" unelevated @click="search" />
            </template>
          </q-input>
        </div>
        <div class="col-sm-2 gt-sm row items-center justify-end">
          <!-- <span>{{ userName }}</span> -->

          <q-avatar size="2.5em">
            <img :src="avatar" />
          </q-avatar>

          <!-- <q-btn unelevated flat v-bind:class="{ hidden: !isLogin }" @click="logout">
            <a class="text-grey-9 text-weight-bold text-subtitle2"> 登出</a>
          </q-btn> -->
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container class="bg-primary YL__750w">
      <keep-alive exclude="YunpanItemDetail">
        <router-view @need-login="needLogin" ref="child" :key="$route.fullPath" />
      </keep-alive>
    </q-page-container>

    <q-footer reveal class="bg-secondary q-pt-xs q-pb-md">
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
      height: 60%
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
    console.log('YunpanDetailLayout mounted');
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

    // 广告初始化
    window.TencentGDT.push({
      app_id: '1201538404', // {String} - appid - 必填
      placement_id: '4054888219125381', // {String} - 广告位id - 必填
      type: 'native', // {String} - 原生广告类型 - 必填
      // muid_type: '1', // {String} - 移动终端标识类型，1：imei，2：idfa，3：mac号 - 选填
      // muid: '******', // {String} - 加密终端标识，详细加密算法见API说明 -  选填
      count: 1, // {Number} - 拉取广告的数量，默认是3，最高支持10 - 选填
      onComplete: function (res) {
        if (res && res.constructor === Array) {
          // 原生模板广告位调用 window.TencentGDT.NATIVE.renderAd(res[0], 'containerId') 进行模板广告的渲染
          // res[0] 代表取广告数组第一个数据
          // containerId：广告容器ID
          window.TencentGDT.NATIVE.renderAd(res[0], 'yunpanDetailAdvert');
        } else {
          // 加载广告API，如广告回调无广告，可使用loadAd再次拉取广告
          // 注意：拉取广告频率每分钟不要超过20次，否则会被广告接口过滤，影响广告位填充率
          setTimeout(function () {
            window.TencentGDT.NATIVE.loadAd(placement_id);
          }, 3000);
        }
      },
    });

    // H5 SDK接入全局只需运行一次
    (function () {
      var doc = document,
        h = doc.getElementsByTagName('head')[0],
        s = doc.createElement('script');
      s.async = true;
      s.src = '//qzs.qq.com/qzone/biz/res/i.js';
      h && h.insertBefore(s, h.firstChild);
    })();
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
          path: '/yunpan/list',
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
                    this.avatar = res.data.data.avatar;
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
