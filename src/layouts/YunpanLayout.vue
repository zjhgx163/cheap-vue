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

    <q-footer reveal class="bg-secondary q-pt-xs q-pb-md">
      <q-toolbar class="flex-center q-pr-lg">
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
      this.isEditorShowing = true;
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
    loginCardChange(value) {
      this.loginCard = value;
      this.isLoadingQr = false;
      this.wechatQr = '';
      clearInterval(this.timer);
    },
    editorShowChanged(value) {
      this.isEditorShowing = value;
      this.$router.push({
        path: '/yunpan/list',
        query: { q: '' },
      });
    },
  },
};
</script>
