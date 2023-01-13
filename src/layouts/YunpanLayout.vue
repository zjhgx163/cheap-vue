<template>
  <q-layout view="hHh lpR fFf">
    <q-header reveal class="bg-primary text-grey-8 YL__750w">
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

      <q-toolbar class="q-mb-xs bg-secondary" v-bind:class="[itemPadding]">
        <q-tabs
          dense
          align="left"
          active-color="pink-4"
          indicator-color="pink-4"
          content-class="text-grey-10"
          narrow-indicator
          outside-arrows
          mobile-arrows
          shrink
        >
          <q-route-tab
            :to="{ path: '/yunpan/list', query: { q: searchKey } }"
            label="全部"
            name="all"
          />
          <q-route-tab
            :to="{ path: '/yunpan/category/影视', query: { q: searchKey } }"
            label="影视"
            name="影视"
          />
          <q-route-tab
            :to="{ path: '/yunpan/category/动漫', query: { q: searchKey } }"
            label="动漫"
            name="动漫"
          />
          <q-route-tab
            :to="{ path: '/yunpan/category/学习', query: { q: searchKey } }"
            label="学习"
            name="学习"
          />
          <q-route-tab
            :to="{ path: '/yunpan/category/游戏%2F软件', query: { q: searchKey } }"
            label="游戏/软件"
            name="游戏/软件"
          />
          <q-route-tab
            :to="{ path: '/yunpan/category/音乐%2F音频', query: { q: searchKey } }"
            label="音乐/音频"
            name="音乐/音频"
          />
          <q-route-tab
            :to="{ path: '/yunpan/category/图片', query: { q: searchKey } }"
            label="图片"
            name="图片"
          />
          <q-route-tab
            :to="{ path: '/yunpan/category/书籍', query: { q: searchKey } }"
            label="书籍"
            name="书籍"
          />
          <q-route-tab
            :to="{ path: '/yunpan/category/求资源', query: { q: searchKey } }"
            label="求资源"
            name="求资源"
          />
          <q-route-tab
            :to="{ path: '/yunpan/category/other', query: { q: searchKey } }"
            label="其他"
            name="other"
          />
        </q-tabs>
      </q-toolbar>
    </q-header>

    <q-page-container class="bg-primary YL__750w">
      <keep-alive exclude="YunpanItemDetail">
        <router-view @need-login="needLogin" ref="child" :key="$route.fullPath" />
      </keep-alive>
    </q-page-container>

    <q-footer reveal class="bg-secondary q-pt-none q-pb-xs">
      <q-toolbar class="flex-center q-pr-lg q-py-xs">
        <q-btn
          round
          color="pink-4"
          size="0.9em"
          text-color="white"
          dense
          icon="add"
          @click="addYunpanItem"
        />
      </q-toolbar>
    </q-footer>
    <login-qr
      :is-loading-qr="isLoadingQr"
      @login-card-changed="loginCardChange"
      :login-card="loginCard"
      :wechat-qr="wechatQr"
    />
    <wysisyg-editor @editor-show-changed="editorShowChanged" :is-editor-show="isEditorShowing" />
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
.q-tab__label
  @media(max-width: $breakpoint-xs-max)
   font-size: 0.7em
   font-weight: 600
  @media(min-width: $breakpoint-xs-max)
   font-size: 1.0em
   font-weight: 700
</style>

<script>
// import { fabYoutube } from '@quasar/extras/fontawesome-v5';
import { Screen } from 'quasar';
import 'src/config';
import LoginQr from 'src/components/LoginQr.vue';
import WysisygEditor from 'src/components/WysiwygEditor.vue';

export default {
  components: { LoginQr, WysisygEditor },
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
      isEditorShowing: false,
    };
  },
  // computed: {
  //   categoryTab: function () {
  //     return this.$refs.child.category;
  //   },
  // },
  created() {
    console.log('YunpanLayout created');
  },
  activated() {
    console.log('YunpanLayout activated');
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
          path: '/yunpan/list',
          query: { q: this.searchKey, x: randomNum },
        })
        .catch((err) => {
          err;
        });
    },
    addYunpanItem() {
      this.$axios.post(`${global.config.domain}/user/islogin`, {}).then((res) => {
        console.log(res.data.data);
        if (res.data.data == true) {
          this.isEditorShowing = true;
        } else {
          //未登陆的话
          if (this.$refs.child.isWeixin()) {
            window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa249d330e183eb43&redirect_uri=https://www.hjdang.com/auth/xxx&response_type=code&scope=snsapi_userinfo&state=yunpanList#wechat_redirect`;
          } else {
            this.needLogin();
          }
        }
      });
    },
    needLogin(itemId) {
      console.log('needLogin is trigged:' + itemId);
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
    loginCardChange(value) {
      this.loginCard = value;
      this.isLoadingQr = false;
      this.wechatQr = '';
      clearInterval(this.timer);
    },
    editorShowChanged(value) {
      this.isEditorShowing = value;
      this.$router.push({
        path: '/yunpan/list/1',
        query: { q: '' },
      });
    },
  },
};
</script>
<script type="text/javascript">
// H5 SDK 在线文档地址：http://developers.adnet.qq.com/doc/web/js_develop
// 全局命名空间申明TencentGDT对象
window.TencentGDT = window.TencentGDT || [];

// 广告初始化
window.TencentGDT.push({
  app_id: '1201538404', // {String} - appid - 必填
  placement_id: '4034072990480276', // {String} - 广告位id - 必填
  // type: 'interstitial', // {String} - 原生广告类型 - 必填
  type: 'native',
  display_type: 'interstitial', // 播放类型：插屏
  // muid_type: '1', // {String} - 移动终端标识类型，1：imei，2：idfa，3：mac号 - 选填
  // muid: '******', // {String} - 加密终端标识，详细加密算法见API说明 -  选填
  count: 3, // {Number} - 拉取广告的数量，默认是3，最高支持10 - 选填
  onComplete: function (res) {
    if (res && res.ret === 0) {
      // 原生模板广告位调用 window.TencentGDT.NATIVE.renderAd(res[0], 'containerId') 进行模板广告的渲染
      // res[0] 代表取广告数组第一个数据
      TencentGDT.NATIVE.renderAd(res.data[0]);
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
  s.src = 'https://qzs.gdtimg.com/union/res/union_sdk/page/h5_sdk/i.js';
  h && h.insertBefore(s, h.firstChild);
})();
</script>
