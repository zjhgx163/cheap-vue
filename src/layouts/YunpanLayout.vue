<template>
  <q-layout view="hHh lpR fFf">
    <q-header reveal height-hint="120" class="bg-primary text-grey-8 YL__1000w q-pb-xs">
      <q-toolbar class="bg-secondary justify-around" v-bind:class="[itemPadding]">
        <div class="col-auto col-sm-auto q-pa-xs">
          <router-link :to="{ path: '/' }">
            <img
              src="hjd.png"
              spinner-color="white"
              :width="logoWidth"
              :height="logoHeight"
              alt="logo"
            />
          </router-link>
        </div>
        <div class="col col-sm-5 justify-center">
          <q-input
            ref="searchInput"
            dense
            clearable
            filled
            standout="text-white"
            square
            v-model="searchKey"
            placeholder="搜索"
            type="search"
            v-on:keyup.enter="search"
            hide-bottom-space
          >
            <template v-slot:after>
              <q-btn
                name="search"
                icon="search"
                :loading="isSearching"
                type="submit"
                unelevated
                @click="search"
              >
                <template v-slot:loading>
                  <q-spinner-facebook color="pink-4" />
                </template>
              </q-btn>
            </template>
          </q-input>
        </div>
        <div class="col-sm-4 gt-sm row flex-center">
          <q-btn-dropdown unelevated flat :label="userName" @click="clickUser"> </q-btn-dropdown>
          <q-avatar size="2.5em">
            <img :src="avatar" alt="avatar" width="35px" height="35px" />
          </q-avatar>

          <q-btn unelevated flat v-bind:class="{ hidden: !isLogin }" @click="logout">
            <a class="text-grey-9 text-weight-bold text-subtitle2"> 登出</a>
          </q-btn>
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
          <q-route-tab :to="{ path: '/list', query: { q: searchKey } }" label="全部" name="all" />
          <q-route-tab
            :to="{ path: '/category/影视', query: { q: searchKey } }"
            label="影视"
            name="movie"
          />
          <q-route-tab
            :to="{ path: '/category/动漫', query: { q: searchKey } }"
            label="动漫"
            name="anime"
          />
          <q-route-tab
            :to="{ path: '/category/学习', query: { q: searchKey } }"
            label="学习"
            name="learn"
          />
          <q-route-tab
            :to="{ path: '/category/游戏%2F软件', query: { q: searchKey } }"
            label="游戏/软件"
            name="game/software"
          />
          <q-route-tab
            :to="{ path: '/category/音乐%2F音频', query: { q: searchKey } }"
            label="音乐/音频"
            name="music"
          />
          <q-route-tab
            :to="{ path: '/category/图片', query: { q: searchKey } }"
            label="图片"
            name="picture"
          />
          <q-route-tab
            :to="{ path: '/category/书籍', query: { q: searchKey } }"
            label="书籍"
            name="books"
          />
          <q-route-tab
            :to="{ path: '/category/求资源', query: { q: searchKey } }"
            label="求资源"
            name="help"
          />
          <q-route-tab
            :to="{ path: '/category/other', query: { q: searchKey } }"
            label="其他"
            name="other"
          />
        </q-tabs>
      </q-toolbar>
      <div v-if="$route.meta.isList" class="q-mt-sm">
        <a
          href="https://cloud.tencent.com/act/cps/redirect?redirect=2446&cps_key=bf392d7b57b18de6b92053e1c62293b2&from=console"
          target="_blank"
        >
          <q-img
            v-if="$q.platform.is.desktop"
            src="/advertisment/tencent_cloud_1200X90.jpg"
            height="42px"
            width="1000px"
            alt="tentent_adver"
          />
          <q-img
            v-else
            src="/advertisment/tencent_cloud_1040X100.jpg"
            height="40.38px"
            width="100%"
            alt="tentent_adver"
          />
        </a>
      </div>
    </q-header>

    <q-page-container class="bg-primary">
      <div class="row YL__1000w justify-between q-mr-sm">
        <div class="YL__750w">
          <router-view v-slot="{ Component }">
            <keep-alive include="YunpanList">
              <component
                :is="Component"
                @searchDone="searchDone"
                @need-login="needLogin"
                ref="child"
                :key="$route.fullPath"
              />
            </keep-alive>
          </router-view>
        </div>
        <div v-if="$q.platform.is.desktop" dark class="col bg-secondary q-pl-lg">
          <div>
            <q-card flat class="column bg-secondary items-center q-pl-sm q-pt-md">
              <q-card-section horizontal>
                <q-btn
                  class="text-bold"
                  flat
                  outline
                  color="pink-4"
                  size="1.3em"
                  label="发布资源"
                  icon="o_article"
                  @click="addYunpanItem"
              /></q-card-section>
            </q-card>
            <q-card flat class="column bg-secondary items-center q-pt-none q-pl-lg">
              <q-card-section horizontal>
                <q-card-actions vertical align="left" class="justify-between">
                  <q-btn
                    class="text-bold"
                    flat
                    outline
                    color="blue-5"
                    :size="addButtonSize"
                    label="外卖红包"
                    icon="o_delivery_dining"
                    to="/coupon"
                  >
                    <q-badge transparent rounded align="top" color="pink-4"> 返利 </q-badge></q-btn
                  >
                  <q-btn
                    class="text-bold"
                    outline
                    color="blue-5"
                    :size="addButtonSize"
                    flat
                    label="手慢无"
                    icon="o_shopping_cart"
                    href="https://shop.hjdang.com"
                  >
                    <q-badge transparent rounded align="top" color="pink-4"> 返利 </q-badge></q-btn
                  >
                  <q-btn
                    class="text-bold"
                    outline
                    color="orange-5"
                    :size="addButtonSize"
                    label="购物查券/返利"
                    flat
                    icon="o_savings"
                    @click="goGetReward"
                  />
                </q-card-actions>
              </q-card-section>

              <q-separator inset />
            </q-card>
          </div>
          <div class="q-mt-md q-mx-sm" style="min-height: 600px">
            <div class="adsenseunitlayout">
              <ins
                class="adsbygoogle"
                style="display: block"
                data-ad-client="ca-pub-3935005489954231"
                data-ad-slot="4387276146"
                data-ad-format="auto"
                data-full-width-responsive="true"
              ></ins>
            </div>
          </div>
          <div style="height: 300px"></div>

          <div class="q-mt-md q-pr-sm">
            <a href="https://www.aliyun.com/minisite/goods?userCode=sga9o0uh" target="_blank">
              <q-img
                src="/advertisment/aliyun.jpeg"
                spinner-color="white"
                width="226px"
                height="188.3px"
              />
            </a>
          </div>
        </div>
      </div>
    </q-page-container>

    <q-footer reveal class="bg-secondary q-pt-none q-pb-xs YL__1000w">
      <q-toolbar
        class="items-center justify-between q-px-lg q-py-xs"
        v-if="$route.meta.isList && $q.platform.is.mobile"
      >
        <q-btn
          flat
          v-bind:size="shopButtionSize"
          color="blue-5"
          label="外卖红包"
          dense
          icon="o_delivery_dining"
          to="/coupon"
        >
          <q-badge transparent rounded align="top" color="pink-4"> 返利 </q-badge></q-btn
        >
        <q-btn
          flat
          color="pink-4"
          rounded
          :size="addButtonSize"
          label="发布"
          dense
          outline
          icon="o_add"
          @click="addYunpanItem"
          class="absolute-center"
        />
        <q-btn
          flat
          :size="shopButtionSize"
          color="orange-5"
          dense
          label="购物返利"
          icon="o_savings"
          outline
          to="/article/1000"
        />
      </q-toolbar>
      <q-item v-if="!$route.meta.isList" class="q-pb-xs">
        <q-item-section top side class="text-bold"> 声明：</q-item-section>
        <q-item-section>
          <q-item-label caption class="YL__notice">
            本站所有资源均由网友自发提供，本站不缓存、储存、下载、播放等，所列内容仅做学习和带宽测试，请于保存后24小时内自行删除。
            如有侵权请根据内容页信息自行联系 阿里云盘官方网站 进行处理。
          </q-item-label>
        </q-item-section>
      </q-item>
      <div v-if="$q.platform.is.desktop" class="row flex-center YL__notice">
        <a target="_blank" class="text-grey-6 q-px-sm text-caption" href="https://beian.miit.gov.cn"
          >浙ICP备2020040769号-1</a
        >

        <!-- <a
          class="text-grey-5 q-px-sm text-caption"
          target="_blank"
          href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33012702000426"
          ><img src="备案图标.png" style="width: 12px; height: 12px" />

          浙公网安备 33012702000426号
        </a> -->
      </div>
    </q-footer>
    <login-qr
      :is-loading-qr="isLoadingQr"
      @login-card-changed="loginCardChange"
      :login-card="loginCard"
      :wechat-qr="wechatQr"
      :is-persistent="false"
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
  &__1000w
    @media(min-width: $breakpoint-sm-min)
      width: 1000px
      margin: 0px auto
      font-size: 14px
    @media(max-width: $breakpoint-xs-max)
      width: 100%
  &__toolbar-input-container
    @media(max-width: $breakpoint-xs-max)
      width: 98%
    @media(min-width: $breakpoint-xs-max)
      width: 90%
  &__notice
    @media(max-width: $breakpoint-xs-max)
      font-size: 0.65rem
    @media(min-width: $breakpoint-xs-max)
      font-size: 0.75rem
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
      isSearching: false,
      host: global.config.domain,
      isBigScreen: false,
      // itemPadding: Screen.gt.sm ? 'q-py-lg' : 'q-py-xs',
      userName: '注册/登陆',
      isLogin: false,
      isLoadingQr: false,
      loginCard: false,
      wechatQr: '',
      timer: null,
      avatar: '/static/not_login_user.png',
      isEditorShowing: false,
    };
  },
  computed: {
    itemPadding() {
      return this.$q.platform.is.desktop ? 'q-py-xs' : 'q-py-xs';
    },
    logoWidth() {
      return this.$q.platform.is.desktop ? '110px' : '90px';
    },
    logoHeight() {
      return this.$q.platform.is.desktop ? '46.3px' : '37.9px';
    },
    shopButtionSize() {
      return this.$q.platform.is.desktop ? '1.0em' : '0.7em';
    },
    addButtonSize() {
      return this.$q.platform.is.desktop ? '1.0em' : '0.8em';
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
    console.log('isProEnv = ' + global.config.isProEnv);

    let script = document.createElement('script');
    script.src =
      'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3935005489954231';
    script.setAttribute('async', '');
    script.setAttribute('crossorigin', 'anonymous');
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(script, s);

    // if (global.config.isProEnv) {
    //   // 优量汇 H5 SDK 在线文档地址：http://developers.adnet.qq.com/doc/web/js_develop
    //   // 优量汇 全局命名空间申明TencentGDT对象
    //   // 腾讯广告全局申明只需运行一次
    //   window.TencentGDT = window.TencentGDT || [];
    //   console.log(' window.TencentGDT = window.TencentGDT');

    //   // 检索插屏广告初始化
    //   window.TencentGDT.push({
    //     app_id: '1201538404', // {String} - appid - 必填
    //     placement_id: '4034072990480276', // {String} - 广告位id - 必填
    //     // type: 'interstitial', // {String} - 原生广告类型 - 必填
    //     type: 'native',
    //     display_type: 'interstitial', // 播放类型：插屏
    //     // muid_type: '1', // {String} - 移动终端标识类型，1：imei，2：idfa，3：mac号 - 选填
    //     // muid: '******', // {String} - 加密终端标识，详细加密算法见API说明 -  选填
    //     count: 1, // {Number} - 拉取广告的数量，默认是3，最高支持10 - 选填
    //     onComplete: function (res) {
    //       console.log('插屏广告返回');
    //       if (res && res.ret === 0) {
    //         // 原生模板广告位调用 window.TencentGDT.NATIVE.renderAd(res[0], 'containerId') 进行模板广告的渲染
    //         // res[0] 代表取广告数组第一个数据
    //         console.log(JSON.stringify(res.data[0]));
    //         if (window.AdverInterstitial === true) {
    //           TencentGDT.NATIVE.renderAd(res.data[0]);
    //           window.AdverInterstitial = false;
    //         }
    //         // window.AdverInterstitial = res.data[0];
    //       } else {
    //         // 加载广告API，如广告回调无广告，可使用loadAd再次拉取广告
    //         // 注意：拉取广告频率每分钟不要超过20次，否则会被广告接口过滤，影响广告位填充率
    //         setTimeout(function () {
    //           window.TencentGDT.NATIVE.loadAd('4034072990480276');
    //         }, 3000);
    //       }
    //     },
    //   });

    //   // 云盘列表页信息流广告初始化
    //   window.TencentGDT.push({
    //     app_id: '1201538404', // {String} - appid - 必填
    //     placement_id: '5004894439792983', // {String} - 广告位id - 必填
    //     type: 'native', // {String} - 原生广告类型 - 必填
    //     // muid_type: '1', // {String} - 移动终端标识类型，1：imei，2：idfa，3：mac号 - 选填
    //     // muid: '******', // {String} - 加密终端标识，详细加密算法见API说明 -  选填
    //     count: 3, // {Number} - 拉取广告的数量，默认是3，最高支持10 - 选填
    //     onComplete: function (res) {
    //       console.log('信息流广告返回');
    //       console.log(JSON.stringify(res));
    //       if (res && res.constructor === Array) {
    //         // 原生模板广告位调用 window.TencentGDT.NATIVE.renderAd(res[0], 'containerId') 进行模板广告的渲染
    //         // res[0] 代表取广告数组第一个数据
    //         // containerId：广告容器ID
    //         // window.TencentGDT.NATIVE.renderAd(res[0], 'flowAdverYunpanId');
    //         // window.AdverNativeTemplate = res[0];
    //         console.log(JSON.stringify(res[0]));
    //         if (window.AdverNativeTemplate === true) {
    //           let container = document.getElementById('flowAdverYunpanId');
    //           if (container != undefined) {
    //             window.TencentGDT.NATIVE.renderAd(res[0], 'flowAdverYunpanId');
    //           } else {
    //             console.log('flowAdverYunpanId is not ready');
    //             setTimeout(function () {
    //               container = document.getElementById('flowAdverYunpanId');
    //               if (container != undefined) {
    //                 window.TencentGDT.NATIVE.renderAd(res[0], 'flowAdverYunpanId');
    //               }
    //             }, 1000);
    //           }
    //           window.AdverNativeTemplate = false;
    //         }
    //         // this.$emit('adverNativeTemplateEvent');
    //         console.log('信息流广告-2');
    //       } else {
    //         // 加载广告API，如广告回调无广告，可使用loadAd再次拉取广告
    //         // 注意：拉取广告频率每分钟不要超过20次，否则会被广告接口过滤，影响广告位填充率
    //         setTimeout(function () {
    //           window.TencentGDT.NATIVE.loadAd('9094884362628825');
    //         }, 3000);
    //       }
    //     },
    //   });

    //   // 详情页插入广告
    //   window.TencentGDT.push({
    //     app_id: '1201538404', // {String} - appid - 必填
    //     placement_id: '4054888219125381', // {String} - 广告位id - 必填
    //     type: 'native', // {String} - 原生广告类型 - 必填
    //     // muid_type: '1', // {String} - 移动终端标识类型，1：imei，2：idfa，3：mac号 - 选填
    //     // muid: '******', // {String} - 加密终端标识，详细加密算法见API说明 -  选填
    //     count: 1, // {Number} - 拉取广告的数量，默认是3，最高支持10 - 选填
    //     onComplete: function (res) {
    //       console.log('详情页插入广告返回');

    //       if (res && res.constructor === Array) {
    //         // 原生模板广告位调用 window.TencentGDT.NATIVE.renderAd(res[0], 'containerId') 进行模板广告的渲染
    //         // res[0] 代表取广告数组第一个数据
    //         // containerId：广告容器ID
    //         console.log(JSON.stringify(res[0]));

    //         if (window.AdverDetailInsert === true) {
    //           let container = document.getElementById('yunpanDetailAdvert');
    //           if (container != undefined) {
    //             window.TencentGDT.NATIVE.renderAd(res[0], 'yunpanDetailAdvert');
    //           } else {
    //             console.log('yunpanDetailAdvert is not ready');
    //             setTimeout(function () {
    //               container = document.getElementById('yunpanDetailAdvert');
    //               if (container != undefined) {
    //                 window.TencentGDT.NATIVE.renderAd(res[0], 'yunpanDetailAdvert');
    //               }
    //             }, 1000);
    //           }
    //           window.AdverDetailInsert = false;
    //         }

    //         // window.AdverDetailInsert = res[0];
    //       } else {
    //         // 加载广告API，如广告回调无广告，可使用loadAd再次拉取广告
    //         // 注意：拉取广告频率每分钟不要超过20次，否则会被广告接口过滤，影响广告位填充率
    //         setTimeout(function () {
    //           window.TencentGDT.NATIVE.loadAd('4054888219125381');
    //         }, 3000);
    //       }
    //     },
    //   });

    //   // H5 SDK接入全局只需运行一次
    //   (function () {
    //     var doc = document,
    //       h = doc.getElementsByTagName('head')[0],
    //       s = doc.createElement('script');
    //     s.async = true;
    //     s.src = 'https://qzs.gdtimg.com/union/res/union_sdk/page/h5_sdk/i.js';
    //     h && h.insertBefore(s, h.firstChild);
    //   })();
    // }
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
        if (userInfo.headimgurl != null && userInfo.headimgurl != '') {
          this.avatar = userInfo.headimgurl;
        }
      }
    }
    //启动谷歌unit广告
    if (window.adsbygoogle == undefined) {
      this.timer = window.setInterval(() => {
        console.log('adsbygoogle delay 400ms - layout');

        if (window.adsbygoogle) {
          window.clearInterval(this.timer); //清除定时器
          let adsenseUnitLength = document.getElementsByClassName('adsenseunitlayout');
          for (let i = 0; i < adsenseUnitLength.length; i++) {
            (adsbygoogle = window.adsbygoogle || []).push({});
          }
          console.log('layout adsense loaded');
        }
      }, 400);
    } else {
      let adsenseUnitLength = document.getElementsByClassName('adsenseunitlayout');

      for (let i = 0; i < adsenseUnitLength.length; i++) {
        (adsbygoogle = window.adsbygoogle || []).push({});
      }
      console.log('layout adsense loaded');
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
    logined(avatar, userName) {
      this.userName = userName;
      this.avatar = avatar;
      this.isLogin = true;
    },
    search() {
      //只有点击‘搜索’才展现插屏广告
      // setTimeout(function () {
      //   window.TencentGDT.NATIVE.loadAd('4034072990480276');
      // }, 100);
      // window.AdverInterstitial = true;

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
      this.isSearching = true;
      let that = this;
      setTimeout(function () {
        let randomNum = Math.random();
        that.$router
          .push({
            path: '/list',
            query: { q: that.searchKey, x: randomNum },
          })
          .catch((err) => {
            err;
          });
      }, 200);
    },
    clickUser() {
      if (this.isLogin) {
        this.$router.push({ path: '/user' });
      } else {
        this.needLogin();
      }
    },
    searchDone() {
      this.isSearching = false;
    },
    goGetReward() {
      this.$axios.post(`${global.config.domain}/user/islogin`, {}).then((res) => {
        console.log(res.data.data);
        if (res.data.data == true) {
          this.$router.push({ name: 'converturl' });
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
    logout() {
      this.$axios.post(`${global.config.domain}/user/logout`, {}).then((res) => {
        if (res.data.code == 0) {
          if (this.$q.localStorage.has('userInfo')) {
            this.$q.localStorage.remove('userInfo');
            this.userName = '注册/登陆';
            this.avatar = '/static/not_login_user.png';
            this.isLogin = false;
          }
        } else {
          this.$q.notify({
            type: 'negative',
            message: res.data.msg,
          });
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
        path: '/list/1',
        query: { q: '' },
      });
    },
  },
};
</script>
