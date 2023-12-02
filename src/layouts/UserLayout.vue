<template>
  <q-layout>
    <div class="flex-center bg-primary row">
      <q-banner inline-actions class="text-white bg-brown YL__750w">
        <div class="row q-pa-xs items-center">
          <div class="col-2">
            <q-avatar size="4.0em">
              <img :src="avatar" />
            </q-avatar>
          </div>

          <div class="col">
            <!-- <div class="text-secondary text-overline text-bold">{{ user }}</div> -->
            <div class="row justify-between items-center">
              <div>
                <div class="text-secondary YL__user_draw_text">可提现金额</div>

                <div class="text-amber-11 YL__user_money text-bold">
                  {{
                    userInfo.withdrawableAmount != undefined
                      ? userInfo.withdrawableAmount.toFixed(2)
                      : userInfo.withdrawableAmount
                  }}
                </div>
              </div>

              <div v-if="$route.name == 'account'">
                <q-chip
                  color="accent text-bold"
                  text-color="white"
                  icon="account_balance_wallet"
                  size="0.75rem"
                  clickable
                  @click="goWithdraw"
                >
                  去提现
                </q-chip>
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
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component
            :is="Component"
            @need-login="needLogin"
            ref="order-list"
            :key="$route.fullPath"
            :userInfo="this.userInfo"
          />
        </keep-alive>
      </router-view>
      <!-- <router-view :key="$route.fullPath" :userInfo="this.userInfo"> </router-view> -->
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
      avatar: 'https://cheap-david.oss-cn-hangzhou.aliyuncs.com/static/not_login_user.png',
      userInfo: {}, //传给子组件的对象
      isLoadingQr: false,
      loginCard: false,
      wechatQr: '',
    };
  },

  props: ['code', 'state'],

  mounted() {
    //解决iphone移动端的延迟
    // FastClick.attach(document.body);
    if (this.code) {
      this.wechatLogin(this.code, this.state);
    } else {
      if (this.$q.localStorage.has('userInfo')) {
        let userInfo = this.$q.localStorage.getItem('userInfo');
        console.log('userInfo  ', userInfo);
        if (userInfo !== undefined && userInfo !== null) {
          this.userName = userInfo.nickname;
          this.isLogin = true;
          if (userInfo.avatar != null && userInfo.avatar != '') {
            this.avatar = userInfo.avatar;
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
        console.log(res.data);
        this.userInfo = res.data.data;
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
  },
};
</script>

<style lang="sass">
.YL
  &__750w
    width: 100%
    max-width: 750px
    min-width: 320px
  &__user
    &_money
      line-height: 1.8em !important
      font-size: 1.4em
    &_draw_text
      font-size: 0.8em
  &__menu_text
    font-size: 0.9em
</style>
