<template>
  <q-layout view="hHh lpR fFf">
    <q-header reveal class="bg-primary text-grey-8 YL__750w q-pb-xs">
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

      <q-toolbar
        v-if="$route.meta.isList"
        class="q-mb-xs bg-secondary"
        v-bind:class="[itemPadding]"
      >
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
      <router-view v-slot="{ Component }">
        <keep-alive include="YunpanList">
          <component :is="Component" @need-login="needLogin" ref="child" :key="$route.fullPath" />
        </keep-alive>
      </router-view>
    </q-page-container>

    <q-footer class="bg-secondary q-pt-none q-pb-xs">
      <q-toolbar class="items-center justify-between q-px-lg q-py-xs" v-if="$route.meta.isList">
        <q-btn
          flat
          size="0.8em"
          color="pink-4"
          label="今日好价"
          stack
          dense
          icon="o_shopping_cart"
          to="/"
        />
        <q-btn
          color="pink-4"
          rounded
          size="0.8em"
          dense
          icon="o_add"
          @click="addYunpanItem"
          class="absolute-center"
        />
        <q-btn flat size="0.8em" icon="shop" text-color="white" dense />
      </q-toolbar>
      <q-item v-if="!$route.meta.isList">
        <q-item-section top side class="text-bold"> 声明：</q-item-section>
        <q-item-section>
          <q-item-label caption>
            本站所有资源均由网友自发提供，本站不缓存、储存、下载、播放等，所列内容仅做学习和带宽测试，请于保存后24小时内自行删除。
            如有侵权请根据内容页信息自行联系 阿里云盘官方 网站 进行处理。
          </q-item-label>
        </q-item-section>
      </q-item>
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
      isBigScreen: false,
      // itemPadding: Screen.gt.sm ? 'q-py-lg' : 'q-py-xs',
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
  computed: {
    itemPadding() {
      return this.isBigScreen ? 'q-py-lg' : 'q-py-xs';
    },
    // categoryTab: function () {
    //   return this.$refs.child.category;
    // },
  },
  created() {
    console.log('YunpanLayout created');
  },
  activated() {
    console.log('YunpanLayout activated');
  },
  mounted() {
    console.log('YunpanLayout mounted');
    let windowWidth = window.screen.width;
    if (windowWidth > 1023.99) {
      this.isBigScreen = true;
    }
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
  beforeUnmount() {
    console.log('beforeUnmount');
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
      //只有点击‘搜索’才展现插屏广告
      setTimeout(function () {
        window.TencentGDT.NATIVE.loadAd('4034072990480276');
      }, 100);
      window.AdverInterstitial = true;

      // if (window.AdverInterstitial != undefined && window.AdverInterstitial != null) {
      //   TencentGDT.NATIVE.renderAd(window.AdverInterstitial);
      //   setTimeout(function () {
      //     TencentGDT.NATIVE.loadAd('4034072990480276');
      //   }, 3000);
      // } else {
      //   setTimeout(() => {
      //     if (window.AdverInterstitial != undefined && window.AdverInterstitial != null) {
      //       TencentGDT.NATIVE.renderAd(window.AdverInterstitial);
      //       setTimeout(function () {
      //         TencentGDT.NATIVE.loadAd('4034072990480276');
      //       }, 1000);
      //     }
      //     console.log('wait 1s AdverInterstitial');
      //   }, 1000);
      // }
      //搜素停顿500ms后展现
      let that = this;
      setTimeout(function () {
        let randomNum = Math.random();
        that.$router
          .push({
            path: '/yunpan/list',
            query: { q: that.searchKey, x: randomNum },
          })
          .catch((err) => {
            err;
          });
      }, 1000);
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
