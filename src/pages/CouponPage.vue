<template>
  <q-page>
    <div class="row justify-start">
      <div
        v-for="item in _topCoupons"
        v-bind:key="item.id"
        class="q-pa-lg column q-gutter-sm flex-center"
      >
        <div v-if="item.hasCommission === 1">
          <q-btn round flat @click="onClick(item.actId)">
            <q-avatar size="4.0em">
              <img :src="item.picSmall" :alt="item.name" />
            </q-avatar>
          </q-btn>
        </div>
        <div v-else>
          <q-btn round flat>
            <q-avatar size="4.0em" @click="miniCodeImg = item.url">
              <img :src="item.picSmall" :alt="item.name" />
            </q-avatar>
          </q-btn>
        </div>
        <div class="column items-center">
          <q-item-label>{{ item.name }}</q-item-label>
          <q-item-label caption
            >{{ item.description }}

            <q-badge v-if="item.hasCommission === 1" transparent align="middle" color="pink-4">
              返利
            </q-badge></q-item-label
          >
        </div>
      </div>
    </div>
    <div v-if="miniCodeImg != ''" class="column items-center q-mt-lg">
      <q-img :src="miniCodeImg" spinner-color="white" width="200px"> </q-img>
      <div v-if="isWeixin()" class="q-mt-md text-subtitle1 text-center text-bold">长按二维码</div>
      <div v-else class="q-mt-md text-subtitle1 text-center text-bold">微信扫码</div>
    </div>
  </q-page>
</template>
<script>
import 'src/config';
import { mapState } from 'pinia';
import { useCouponStore } from 'src/stores/coupon';
import { useQuasar } from 'quasar';
import { Loading } from 'quasar';
import { useMeta } from 'quasar';
import { ref } from 'vue';
import { reactive } from 'vue';

export default {
  name: 'CouponPage',
  props: ['userInfo', 'actId'],
  data() {
    return {
      uid: 0,
      miniCodeImg: '',
      // topCoupons: [],
      // coupons: [],
    };
  },
  computed: {
    ...mapState(useCouponStore, {
      _topCoupons: 'topCoupons',
      _coupons: 'coupons',
      _userAgent: 'userAgent',
    }),
  },

  setup() {
    console.log('coupon page setup');
    const $q = useQuasar();
    let platform = '';
    if ($q.platform.is.mobile) {
      platform = 'mobile';
    } else {
      platform = 'pc';
    }
    const title = ref('领大额外卖券，边看电影边吃 —— 好家当');
    const meta = reactive({
      description: {
        name: 'description',
        content: '领大额美团，饿了么大额外卖红包，还有各种线下福利。让你足不出户变看电影边吃外卖。',
      },
      keywords: {
        name: 'keywords',
        content: '美团外卖券,饿了么外卖团,买菜优惠券,线下优惠券',
      },
      applicationdevice: {
        name: 'applicable-device',
        content: platform,
      },
      ogtype: {
        property: 'og:type',
        content: 'article',
      },
      ogurl: {
        property: 'og:url',
        content: 'https://www.hjdang.com/coupon',
      },
      ogtitle: {
        property: 'og:title',
        content: '领大额外卖券，边看电影边吃 —— 好家当',
      },
      ogdescription: {
        property: 'og:description',
        content:
          '领大额美团，饿了么大额外卖优惠券，还有各种线下福利。让你足不出户变看电影边吃外卖。',
      },
      ogimage: {
        property: 'og:image',
        content: 'https://www.hjdang.com/hjd.png',
      },
      weibocreate: {
        name: 'weibo:webpage:create_at',
        content: '',
      },
      weiboupdate: {
        name: 'weibo:webpage:update_at',
        content: '',
      },
    });
    useMeta(() => {
      return {
        // whenever "title" from above changes, your meta will automatically update
        title: title,
        titleTemplate: (title) => `${title.value}`,

        meta: meta,
      };
    });

    function setAnotherTitle(value) {
      title.value = value; // will automatically trigger a Meta update due to the binding
    }

    return {
      setAnotherTitle,
      meta,
    };
  },
  // our hook here
  preFetch({ store, currentRoute, previousRoute, redirect, ssrContext, urlPath, publicPath }) {
    console.log('coupon page prefetch');
    // 先把旧数据重置
    const myStore = useCouponStore();

    if (process.env.SERVER) {
      Loading.show();
      // ssrContext is available only server-side in SSR mode

      // No access to "this" here

      // Return a Promise if you are running an async job
      // Example:
      myStore.userAgent = ssrContext.req.headers['user-agent'];

      return myStore.getTopCoupons();
    }
    // const $q = useQuasar();
    // fetch data, validate route and optionally redirect to some other route...
  },
  created() {
    console.log('coupon page created');
    // this.topCoupons = this._topCoupons;
    // this.coupons = this._coupons;
    // this.max = this._replyMax;
  },
  mounted() {
    console.log('coupon page mounted');

    let windowWidth = window.screen.width;
    if (windowWidth > 1023.99) {
      this.isBigScreen = true;
    }

    if (Object.keys(this._topCoupons).length === 0) {
      this.$q.loading.show({
        delay: 400, // ms
      });
      const myStore = useCouponStore();
      myStore.getTopCoupons();
    }

    console.log('actId = ', this.actId);
    if (this.actId > 0) {
      this.onClick(this.actId);
    }
  },
  methods: {
    onClick(actId) {
      // if (!this.userInfo || this.userInfo.id == undefined || this.userInfo.id == null) {
      //   if (this.isWeixin()) {
      //     window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa249d330e183eb43&redirect_uri=https://www.hjdang.com/auth//${this.actId}&response_type=code&scope=snsapi_userinfo&state=waimai#wechat_redirect`;
      //   } else {
      //     this.$emit('need-login');
      //     return;
      //   }
      // }
      this.uid = this.userInfo.userId;
      if (this.uid == undefined || this.uid == null) {
        if (this.isWeixin()) {
          window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa249d330e183eb43&redirect_uri=https://${global.config.domainPro}/auth/${actId}&response_type=code&scope=snsapi_userinfo&state=waimai#wechat_redirect`;
        } else {
          this.$emit('need-login');
          return;
        }
      }
      // let linkType = 1;
      // if (this.isWeixin()) {
      //   linkType = 3;
      // } else if (this.$q.platform.is.mobile) {
      //   linkType = 3;
      // } else {
      //   linkType = 1;
      // }
      this.$q.loading.show({
        delay: 200, // ms
      });
      this.$axios
        .post(`${global.config.domain}/coupon/meituan/minicode`, {
          actId: actId,
          sid: this.uid,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.code < 0) {
            // 未登陆
            if (res.data.code == -102) {
              if (this.isWeixin()) {
                window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa249d330e183eb43&redirect_uri=https://${global.config.domainPro}/auth/${actId}&response_type=code&scope=snsapi_userinfo&state=waimai#wechat_redirect`;
              } else {
                this.$emit('need-login');
              }
            } else {
              this.$q.notify({
                type: 'negative',
                icon: 'warning',
                message: `${res.data.msg}`,
              });
            }
          } else {
            console.log(res.data.data.data);
            // window.location.href = res.data.data.data;
            this.miniCodeImg = res.data.data.data;
          }

          this.$q.loading.hide();
        });
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
