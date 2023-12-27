<template>
  <q-layout>
    <div class="flex-center bg-primary row">
      <q-banner inline-actions class="text-white bg-brown YL__750w">
        <div class="row q-pa-xs items-center justify-between">
          <div :class="avatarCol" class="row justify-around">
            <q-avatar size="3.2em">
              <img :src="avatar" />
            </q-avatar>
            <div>
              <div class="text-secondary text-bold YL__user_draw_text">{{ userInfo.username }}</div>
              <div
                class="text-secondary text-bold YL__user_draw_text"
                style="line-height: 2.4em !important"
              >
                ID: {{ userInfo.inviteCode }}
              </div>
            </div>
          </div>
          <div :class="blankCol"></div>

          <div class="col">
            <!-- <div class="text-secondary text-overline text-bold">{{ user }}</div> -->
            <div>
              <div class="text-secondary text-bold YL__user_draw_text">可提现金额</div>

              <div class="row justify-between q-gutter-sm">
                <div class="text-amber-11 col-auto YL__user_money text-bold">
                  {{
                    userInfo.withdrawableAmount != undefined
                      ? userInfo.withdrawableAmount.toFixed(2)
                      : userInfo.withdrawableAmount
                  }}
                </div>
                <div class="col q-mr-sm column items-center" v-if="$route.name == 'account'">
                  <q-chip
                    color="accent text-bold"
                    text-color="white"
                    icon="account_balance_wallet"
                    size="0.65rem"
                    clickable
                    @click="goWithdraw"
                  >
                    去提现
                  </q-chip>
                </div>
              </div>
            </div>
          </div>

          <!-- <div class="column justify-center"></div> -->
        </div>

        <!-- <div class="YL__user_draw_text text-weight-thin YL__user_money">可提现金额(元)</div>
      <div class="text-amber-11 YL__user_money text-bold">¥ 0.00</div> -->
      </q-banner>
    </div>
    <q-page-container class="bg-primary flex-center">
      <!-- <router-view v-slot="{ Component }">
        <keep-alive>
          <component
            :is="Component"
            @need-login="needLogin"
            ref="order-list"
            :key="$route.fullPath"
            :userInfo="this.userInfo"
          />
        </keep-alive>
      </router-view> -->
      <router-view :key="$route.fullPath" @need-login="needLogin" :userInfo="userInfo" ref="child">
      </router-view>
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
      user: '登陆/注册',
      avatar: '/static/not_login_user.png',
      userInfo: {}, //传给子组件的对象
      isLoadingQr: false,
      loginCard: false,
      wechatQr: '',
      isBigScreen: false,
    };
  },
  computed: {
    avatarCol: function () {
      return this.isBigScreen ? 'col-3' : 'col-5';
    },
    blankCol: function () {
      return this.isBigScreen ? 'col-5' : 'col-2';
    },
  },
  props: ['code', 'state'],

  mounted() {
    //解决iphone移动端的延迟
    // FastClick.attach(document.body);
    let windowWidth = window.screen.width;
    if (windowWidth > 1023.99) {
      this.isBigScreen = true;
    }
    if (this.code) {
      this.wechatLogin(this.code, this.state);
    } else {
      if (this.$q.localStorage.has('userInfo')) {
        let userInfo = this.$q.localStorage.getItem('userInfo');
        console.log('userInfo  ', userInfo);
        if (userInfo !== undefined && userInfo !== null) {
          this.userName = userInfo.nickname;
          this.isLogin = true;
          if (userInfo.headimgurl != null && userInfo.headimgurl != '') {
            this.avatar = userInfo.headimgurl;
            this.user = userInfo.nickname;
          }
          // 设置给传给子组件的对象
          // this.userInfo = userInfo;
        }
      }
      this.getUserAccountInfo();
    }
  },

  methods: {
    getUserAccountInfo() {
      this.$q.loading.show({
        delay: 200, // ms
      });
      this.$axios.post(`${global.config.domain}/user/account/get`, {}).then((res) => {
        if (res.data.code < 0) {
          // 未登陆
          if (res.data.code == -102) {
            if (this.isWeixin()) {
              window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa249d330e183eb43&redirect_uri=https://${global.config.domainPro}/user&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`;
            } else {
              console.log('emit need-login');
              this.$refs.child.$emit('need-login');
            }
          } else {
            this.$q.notify({
              type: 'negative',
              icon: 'warning',
              message: `${res.data.msg}`,
            });
          }
        } else {
          this.userInfo = res.data.data;
        }
        //登陆成功

        this.$q.loading.hide();

        // console.log(this.isBigSc = reen);
      });
    },
    wechatLogin(code, state) {
      this.$q.loading.show({
        delay: 200, // ms
      });
      this.$axios
        .post(`${global.config.domain}/wechat/accesstokenlogin`, {
          code: this.code,
          state: this.state,
        })
        .then((res) => {
          console.log(res.data);
          this.avatar = res.data.headimgurl;
          this.user = res.data.nickname;
          this.userInfo = res.data;
          //登陆成功
          this.$q.localStorage.set('userInfo', res.data);

          this.$q.loading.hide();

          // console.log(this.isBigSc = reen);
        });
    },
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
                    this.getUserAccountInfo();
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
    goWithdraw() {
      console.log('go withdraw');
      this.$router.push({ path: 'withdraw', name: 'withdraw' });
    },
    loginCardChange(value) {
      this.loginCard = value;
      this.isLoadingQr = false;
      this.wechatQr = '';
      clearInterval(this.timer);
    },
    isWeixin() {
      let ua;
      if (process.env.CLIENT) {
        ua = window.navigator.userAgent.toLowerCase();
      } else {
        ua = this._userAgent.toLowerCase();
      }
      console.log(ua);
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style lang="sass">
.YL
  &__750w
    @media(min-width: $breakpoint-sm-min)
      width: 750px
      margin: 0px auto
      font-size: 14px
    @media(max-width: $breakpoint-xs-max)
      width: 100%
  &__user
    &_money
      line-height: 1.4em !important
      font-size: 1.4em
    &_draw_text
      font-size: 0.8em
  &__menu_text
    font-size: 0.9em
</style>
