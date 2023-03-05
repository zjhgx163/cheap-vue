<template>
  <q-layout>
    <q-banner inline-actions class="text-white bg-brown">
      <div class="row q-pa-xs items-center">
        <div class="col-3">
          <q-avatar size="4.0em">
            <img :src="avatar" />
          </q-avatar>
        </div>

        <div class="col">
          <div class="text-secondary text-overline text-bold">{{ user }}</div>
          <div class="row justify-between items-center">
            <div>
              <div class="text-secondary YL__user_draw_text text-weight-thin YL__user_money">
                可提现金额
              </div>

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

    <q-page-container class="bg-primary">
      <router-view :key="$route.fullPath" :userInfo="this.userInfo"> </router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import 'src/config';

export default {
  data() {
    return {
      user: '登陆/注册',
      avatar: 'https://cheap-david.oss-cn-hangzhou.aliyuncs.com/static/not_login_user.png',
      userInfo: {},
    };
  },

  props: ['code', 'state'],

  mounted() {
    //解决iphone移动端的延迟
    // FastClick.attach(document.body);

    this.wechatLogin(this.code, this.state);
  },

  methods: {
    wechatLogin(code, state) {
      this.$q.loading.show({
        delay: 400, // ms
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
    goWithdraw() {
      console.log('go withdraw');
      this.$router.push({ path: 'withdraw', name: 'withdraw' });
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
