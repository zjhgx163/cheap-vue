<template>
  <q-layout view="hHh lpR fFf" class="bg-primary" style="min-height: 100vh">
    <q-dialog auto-close v-model="dialog">
      <q-card class="bg-light-green-5 text-white">
        <q-card-section class="row items-center q-pb-none q-pt-xs">
          <div class="text-h6">返利提醒</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section v-if="isWeixin()">
          &#9996;&#9996;
          此页面京东，拼多多商品<strong>均有返利</strong>，购买前请先点击<strong>公众号个人中心菜单</strong>阅读注意事项。购买后请在<strong>个人中心菜单</strong>下面的<strong>商品订单</strong>里查看订单。
        </q-card-section>
        <q-card-section v-else>
          京东，拼多多商品均有返利，购买前请先点击用户名登陆进入用户中心查阅注意事项，购买后在用户中心下面的<strong>商品订单</strong>里查看订单
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-header class="bg-primary text-grey-8 q-pb-xs YL__1200w">
      <q-toolbar class="bg-secondary justify-around q-mb-xs" v-bind:class="[itemPadding]">
        <div class="col-auto col-sm-auto q-pa-xs">
          <router-link :to="{ path: '/' }">
            <q-img src="hjd.png" spinner-color="white" :width="logoWidth" :height="logoHeight" />
          </router-link>
        </div>
        <!-- <div
              class="col-2 lt-sm col-sm-auto text-overline text-italic items-center self-center text-bold YL__coupon_text_effect"
              v-bind:class="{ hidden: isCouponHidden }"
            >
              <router-link :to="{ path: '/coupon' }" class="text-deep-purple-10">
                外卖红包
              </router-link>
            </div> -->
        <div class="col col-sm-5 justify-center" v-bind:class="{ hidden: isSearchHidden }">
          <form @submit.prevent="search">
            <q-input
              ref="searchInput"
              item-aligned
              clearable
              dense
              filled
              standout="text-white"
              square
              v-model="searchKey"
              placeholder="搜索"
              type="search"
              v-on:keyup.enter="search"
            >
              <template v-slot:after>
                <q-btn
                  name="search"
                  icon="search"
                  :loading="isSearching"
                  type="submit"
                  unelevated
                  @click="onClick"
                >
                  <template v-slot:loading>
                    <q-spinner-facebook color="accent" />
                  </template>
                </q-btn>
              </template>
            </q-input>

            <!-- <q-btn name="search" icon="search" type="submit" unelevated> </q-btn> -->
          </form>
        </div>

        <!-- <q-toolbar-title shrink class="text-weight-bold"> 好价党 </q-toolbar-title> -->

        <!-- <q-space /> -->

        <!-- <div class="bg-white YL__toolbar-input-container"> -->

        <div class="col-sm-4 gt-sm row flex-center">
          <q-btn-dropdown unelevated flat :label="userName" @click="clickUser">
            <!-- <a class="text-grey-9 text-weight-bold text-subtitle2"> {{ userName }}</a> -->
          </q-btn-dropdown>

          <q-avatar size="2.5em">
            <img :src="avatar" />
          </q-avatar>

          <q-btn unelevated flat v-bind:class="{ hidden: !isLogin }" @click="logout">
            <a class="text-grey-9 text-weight-bold text-subtitle2"> 登出</a>
          </q-btn>
        </div>
      </q-toolbar>

      <!-- <div class="col-4"></div>
      </div> -->
    </q-header>
    <!-- <q-drawer show-if-above :width="300" content-class="bg-primary text-white"> </q-drawer> -->

    <q-page-container class="bg-primary">
      <div class="row YL__1200w">
        <div class="col">
          <div class="bg-secondary row justify-between q-pa-sm" v-if="$route.meta.isGoodsList">
            <q-tabs
              v-model="selectedTab"
              dense
              align="left"
              active-color="accent"
              indicator-color="accent"
              content-class="text-grey-10"
            >
              <q-route-tab to="/" label="首页" name="main" />
              <q-route-tab to="/cheap" label="白菜" name="cheap" />
              <q-route-tab to="/rank" label="排行榜" name="rank" />
            </q-tabs>
            <!-- <q-space /> -->
            <q-btn-dropdown color="secondary" text-color="grey" flat dense :label="sort">
              <q-list>
                <q-item clickable v-close-popup @click="sortClick" tabindex="2">
                  <q-item-section>
                    <q-item-label caption>时间排序</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable v-close-popup @click="sortClick" tabindex="1">
                  <q-item-section>
                    <q-item-label caption>推荐排序</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </div>
          <!--  -->

          <router-view v-slot="{ Component }">
            <KeepAlive>
              <component
                @logined="logined"
                @searchDone="searchDone"
                :is="Component"
                :key="$route.fullPath"
                :sort="sortIndex"
                ref="goods-list"
              />
            </KeepAlive>
          </router-view>
        </div>
        <div v-if="$q.platform.is.desktop || isBigScreen" class="col-4">
          <router-view name="hot"></router-view>
        </div>
      </div>

      <!-- <router-view /> -->
      <!-- <router-view v-slot="{ Component }">
        <keep-alive exclude="DetailLayout">
          <component :is="Component" />
        </keep-alive>
      </router-view> -->
    </q-page-container>

    <!-- <q-drawer side="right" :width="300" show-if-above content-class="bg-primary text-white">
    </q-drawer> -->

    <!-- <div class="row justify-center">
      <div class="col-8"></div>
      <div class="col">

      </div>
    </div> -->
    <div id="banner_2_0"></div>

    <q-footer bordered reveal class="bg-dark text-white">
      <div v-if="$q.platform.is.desktop" class="YL__footer row justify-evenly YL__1200w q-pt-md">
        <div class="col-2 flex-center q-py-sm">
          <q-img
            src="/laohuweinifuwu.jpeg"
            class="items-center justify-center"
            width="100px"
            height="100px"
          />
        </div>
        <div class="col flex-center q-py-sm">
          <div class="text-h6">关于</div>
          <div class="row">
            <div class="col-6 flex-center">
              <div>宇宙第一性价比之王导购平台</div>
              <div>请<strong>左边</strong>扫码关注公众号享受返利和其他服务</div>
              <div>email: 82955503@qq.com</div>
            </div>
            <div class="col flex-center">
              <div>Copyright © 2020 Hjdang.com All rights reserved.</div>
              <div class="row q-gutter-md">
                <a target="_blank" href="https://beian.miit.gov.cn">浙ICP备2020040769号-1</a>
                <a
                  target="_blank"
                  href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33012702000426"
                  ><img src="备案图标.png" style="width: 12px; height: 12px" />

                  浙公网安备 33012702000426号
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="flex-center YL__notice">
        <div class="text-grey-5 q-px-sm text-caption row flex-center">
          请关注微信公众号<strong>老胡为你服务</strong>享受返利和云盘资源服务
        </div>
      </div>
    </q-footer>

    <q-dialog v-model="loginCard" @hide="dialogHide">
      <q-card class="YL__login_card">
        <q-card-section class="column flex-center q-pt-lg q-pb-sm">
          <div class="text-subtitle1">微信扫码登陆</div>
        </q-card-section>
        <q-card-section class="q-pt-none column flex-center">
          <div class="column flex-center" style="width: 150px; height: 150px">
            <q-spinner-facebook color="accent" size="2em" v-bind:class="{ hidden: !isLoadingQr }" />
            <q-img
              :src="wechatQr"
              position="50% 50%"
              class="flex-center"
              v-bind:class="{ hidden: isLoadingQr }"
              width="150px"
              height="150px"
              fit="cover"
            />
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none q-pb-lg column flex-center">
          <div class="text-caption text-grey">打开微信扫一扫</div>
          <div class="text-caption text-grey">关注公众号完成登陆</div>
        </q-card-section>

        <q-separator />
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script>
// import { fabYoutube } from '@quasar/extras/fontawesome-v5';
// import { Screen } from 'quasar';
import 'src/config';

export default {
  name: 'MainLayout',

  data() {
    return {
      searchKey: '',
      isSearching: false,
      drawer: false,
      host: global.config.domain,
      isBigScreen: false,
      isSearchHidden: false,
      isCouponHidden: false,
      loginCard: false,
      wechatQr: '',
      userName: '注册/登陆',
      timer: null,
      isLoadingQr: false,
      isLogin: false,
      avatar: '/static/not_login_user.png',
      selectedTab: 'main',
      sort: '时间排序',
      sortIndex: 2,
      dialog: false,
    };
  },
  computed: {
    itemPadding: function () {
      return this.$q.platform.is.desktop || this.isBigScreen ? 'q-py-none' : 'q-py-xs';
    },
    logoWidth() {
      return this.$q.platform.is.desktop ? '110px' : '90px';
    },
    logoHeight() {
      return this.$q.platform.is.desktop ? '46.3px' : '37.9px';
    },
  },
  created() {
    console.log('MainLayout created');
    // const $q = useQuasar();
    // console.log('v-if ' + this.$q.screen.gt.sm);
    // this.fabYoutube = fabYoutube;
  },
  beforeMount() {
    console.log('MainLayout before mounted');

    // console.log('window.screen.width = ' + window.screen.width);
    let windowWidth = window.screen.width;
    if (windowWidth > 1023.99) {
      this.isBigScreen = true;
    }
  },

  mounted() {
    console.log('MainLayout mounted');
    this.dialog = true;

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
  },

  watch: {
    /** 控制search，优惠券的展现 */
    $route(to, from) {
      console.log('to = ' + to.path);
      console.log('from = ' + from.path);
      if (to.path.indexOf('coupon') > -1) {
        this.isSearchHidden = true;
        this.isCouponHidden = true;
      } else if (to.path.indexOf('detail') > -1) {
        this.isSearchHidden = false;
        this.isCouponHidden = true;
      } else {
        this.isSearchHidden = false;
        this.isCouponHidden = false;
      }
    },
  },

  // beforeRouteUpdate(to, from, next) {
  //   console.log('beforeRouteUpdate');
  //   next();
  // },
  methods: {
    logined(avatar, userName) {
      this.userName = userName;
      this.avatar = avatar;
      this.isLogin = true;
    },
    clickUser() {
      if (this.isLogin) {
        this.$router.push({ path: '/user' });
      } else {
        this.createWechatQr();
      }
    },
    onClick() {
      // this.$refs.searchInput.validate();
      // if (this.$refs.searchInput.hasError) {
      //   return;
      // }
      this.search();
    },
    search() {
      this.isSearching = true;
      let randomNum = Math.random();
      this.$router
        .push({ path: 'search', name: 'search', query: { q: this.searchKey, x: randomNum } })
        .catch((err) => {
          err;
        });
    },
    searchDone() {
      this.isSearching = false;
    },

    createWechatQr() {
      // this.$q.loading.show({
      //   delay: 400, // ms
      // });
      this.loginCard = true;
      this.isLoadingQr = true;
      this.$axios.post(`${global.config.domain}/wechat/createQr`, {}).then((res) => {
        this.isLoadingQr = false;
        if (res.data.code == 0) {
          this.wechatQr = res.data.data.qrUrl;
          let beginTime = new Date();
          this.timer = setInterval(() => {
            this.$axios
              .post(`${global.config.domain}/user/getScanLoginInfo/${res.data.data.sceneStr}`, {})
              .then((res) => {
                if (res.data.code == 0) {
                  if (res.data.data.loginFlag) {
                    this.userName = res.data.data.nickname;
                    this.avatar = res.data.data.avatar;
                    this.isLogin = true;
                    this.$q.localStorage.set('userInfo', res.data.data);
                    clearInterval(this.timer); //清除定时器
                    this.loginCard = false;
                  } else {
                    let now = new Date();
                    if (now.getTime() - beginTime.getTime() > 10 * 60 * 1000) {
                      //如果五分钟了还未登陆则二维码过期
                      console.log('二维码过期');
                      clearInterval(this.timer); //清除定时器
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
                  clearInterval(this.timer); //清除定时器
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

    dialogHide() {
      clearInterval(this.timer);
      this.isLoadingQr = false;
    },
    // searchShowChange(data) {
    //   this.isSearchHidden = data;
    //   this.isCouponHidden = data;
    // },

    sortClick(event) {
      this.sort = event.currentTarget.getAttribute('tabindex') == 2 ? '时间排序' : '推荐排序';
      this.sortIndex = event.currentTarget.getAttribute('tabindex');
      // 用$refs是非reactive,sortIndex变了但：sort="sortIndex"这里不会改变getItemList里的参数sort的值，所以只能加一个参数this.sortIndex传过去
      this.$refs['goods-list'].getItemList(this.sortIndex);
    },
    isWeixin() {
      return this.$refs['goods-list'].isWeixin();
    },
  },
};
</script>

<style lang="sass">
.YL
  &__1200w
    @media(min-width: $breakpoint-sm-min)
      width: 1200px
      margin: 0px auto
      font-size: 14px
    @media(max-width: $breakpoint-xs-max)
      width: 100%

  &__toolbar-input-container
    @media(min-width: $breakpoint-xs-max)
      width: 60%
      // border: 2px solid #f44336
  &__login_card
    width: 300px
  &__footer
    color: inherit
    text-decoration: none
    font-weight: 500
    font-size: .80rem
    &:hover
      color: #000
  &__title_font_family
    font-family: PingFangSC-Medium,Dosis,Open Sans,helvetica neue,-apple-system,arial,hiragino sans gb,microsoft yahei ui,microsoft yahei,simsun,sans-serif

  &__list_line_height
    line-height: 1.5em !important
  &__list_font_size
    font-size: 14px
  &__coupon_text_effect
    text-decoration: underline black from-font
    text-transform: uppercase
    display: inline-block
    position: relative
    font-family: 'Merriweather', serif
    font-weight: bold
    -webkit-mask-image: linear-gradient(-75deg, rgba(0,0,0,.6) 30%, #000 50%, rgba(0,0,0,.6) 70%)
    -webkit-mask-size: 200%
    animation: shine 2s linear infinite
  &__notice
    @media(max-width: $breakpoint-xs-max)
      font-size: 0.65rem
    @media(min-width: $breakpoint-xs-max)
      font-size: 0.75rem

  &__return
    @media(max-width: $breakpoint-xs-max)
      font-size: 0.7em
      height: 0.8em
    @media(min-width: $breakpoint-xs-max)
      font-size: 1.1em
      height: 0.8em

@keyframes shine
  from
    -webkit-mask-position: 150%
  to
    -webkit-mask-position: -50%

.q-tab__label
  @media(max-width: $breakpoint-xs-max)
   font-size: 0.9em
   font-weight: 600
  @media(min-width: $breakpoint-xs-max)
   font-size: 1.0em
   font-weight: 700
</style>
