<template>
  <div class="column items-center bg-primary">
    <div class="q-px-sm q-py-lg YL__750w bg-dark">
      <div class="row q-px-sm items-center">
        <div class="col-3">
          <q-avatar size="3.5em">
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
              <div class="text-amber-11 YL__user_money text-bold">¥ 0.00</div>
            </div>
            <div>
              <q-chip
                color="accent text-bold"
                text-color="white"
                icon="account_balance_wallet"
                size="0.75rem"
              >
                去提现</q-chip
              >
            </div>
          </div>
        </div>

        <!-- <div class="column justify-center"></div> -->
      </div>
    </div>
    <div class="YL__750w">
      <q-list class="q-px-sm q-my-sm bg-secondary" dense>
        <q-item>
          <q-item-section class="q-py-sm">
            <div class="column items-center YL__menu_text text-caption">
              <q-item-label>¥{{ this.userInfo.todayEstimateCommissionAmount }}</q-item-label>
              <q-item-label caption>今日预估</q-item-label>
            </div>
          </q-item-section>
          <q-item-section class="q-py-sm">
            <div class="column items-center YL__menu_text">
              <q-item-label>¥{{ this.userInfo.monthEstimateCommissionAmount }}</q-item-label>
              <q-item-label caption>本月预估</q-item-label>
            </div>
          </q-item-section>
          <q-item-section class="q-py-sm">
            <div class="column items-center YL__menu_text">
              <q-item-label>¥{{ this.userInfo.accumulativeActualCommissionAmount }}</q-item-label>
              <q-item-label caption>累计收入</q-item-label>
            </div>
          </q-item-section>
        </q-item>
        <q-separator />
        <q-item>
          <q-item-section class="q-py-sm">
            <div class="column items-center YL__menu_text">
              <q-item-label>¥{{ this.userInfo.waitEstimateCommissionAmount }}</q-item-label>
              <q-item-label caption>待结算</q-item-label>
            </div>
          </q-item-section>
          <q-item-section class="q-py-sm">
            <div class="column items-center YL__menu_text">
              <q-item-label>¥{{ this.userInfo.waitActualCommissionAmount }}</q-item-label>
              <q-item-label caption>待审批</q-item-label>
            </div>
          </q-item-section>
          <q-item-section class="q-py-sm">
            <div class="column items-center YL__menu_text">
              <q-item-label>¥{{ this.userInfo.withdrawedAmount }}</q-item-label>
              <q-item-label caption>已提现</q-item-label>
            </div>
          </q-item-section>
        </q-item>
      </q-list>

      <q-list class="q-px-sm q-mb-sm bg-secondary" dense>
        <q-item dense>
          <q-item-section avatar top class="q-py-sm">
            <q-avatar icon="shopping_bag" color="accent" text-color="white" size="2em" />
          </q-item-section>
          <q-item-section>
            <q-item-label lines="1" class="YL__menu_text">商品订单</q-item-label>
          </q-item-section>
          <q-item-section side>
            <router-link
              :to="{
                path: '/my/orderlist/all',
                query: { userId: '1520479950736478209', status: 0 },
              }"
              ><q-icon name="chevron_right" />
            </router-link>
          </q-item-section>
        </q-item>

        <q-separator />

        <q-item dense>
          <q-item-section avatar top class="q-py-sm">
            <q-avatar icon="delivery_dining" color="accent" text-color="white" size="2em" />
          </q-item-section>
          <q-item-section>
            <q-item-label lines="1" class="YL__menu_text"> 外卖订单</q-item-label>
          </q-item-section>
          <q-item-section side>
            <router-link
              :to="{
                path: '/my/orderlist/all',
                query: { userId: 11, status: 0 },
              }"
              ><q-icon name="chevron_right" />
            </router-link>
          </q-item-section>
        </q-item>

        <q-separator />

        <q-item dense>
          <q-item-section avatar top class="q-py-sm">
            <q-avatar icon="favorite" color="accent" text-color="white" size="2em" />
          </q-item-section>
          <q-item-section>
            <q-item-label lines="1" class="YL__menu_text">我的收藏</q-item-label>
          </q-item-section>
          <q-item-section side>
            <router-link
              :to="{
                path: '/my/orderlist/all',
                query: { userId: 11, status: 0 },
              }"
              ><q-icon name="chevron_right" />
            </router-link>
          </q-item-section>
        </q-item>

        <q-separator />

        <q-item dense>
          <q-item-section avatar top class="q-py-sm">
            <q-avatar icon="support_agent" color="accent" text-color="white" size="2em" />
          </q-item-section>
          <q-item-section>
            <q-item-label lines="1" class="YL__menu_text">联系客服</q-item-label>
          </q-item-section>
          <q-item-section side>
            <router-link
              :to="{
                path: '/my/orderlist/all',
                query: { userId: 11, status: 0 },
              }"
              ><q-icon name="chevron_right" />
            </router-link>
          </q-item-section>
        </q-item>
      </q-list>

      <q-list class="q-px-sm bg-secondary">
        <q-item-label header>提现方式</q-item-label>

        <q-item>
          <q-item-section>
            <q-item-label caption> 请上传微信收款码，审批后会尽快打款 </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
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
          this.$q.loading.hide();

          // console.log(this.isBigSc = reen);
        });
    },
  },
};
</script>

<style lang="sass">
.YL
  &__750w
    width: 100%;
    max-width: 750px;
    min-width: 320px;
  &__user
    &_money
      line-height: 1.8em !important
      font-size: 1.2em
    &_draw_text
      font-size: 0.7em
  &__menu_text
    font-size: 0.9em
</style>
