<template>
  <q-page>
    <q-tooltip
      anchor="bottom middle"
      self="top middle"
      target="#intro"
      :offset="[10, 10]"
      max-height="8rem"
      max-width="9rem"
      v-model="showing"
      no-parent-event
      >{{ alertText }}
    </q-tooltip>

    <q-dialog v-model="isShowCopyTaobaopwd" @hide="copyPwd" persistent>
      <q-card>
        <q-card-section class="column q-pt-sm q-pb-none items-center bg-brown-8 text-white">
          <span class="">{{ this.taobaoPwd }}</span>
        </q-card-section>
        <q-card-section class="column q-pa-sm items-center bg-brown-8 text-white">
          <span class="text-caption">请点击复制，打开手机淘宝</span>
        </q-card-section>

        <q-card-actions align="center" class="q-pa-xs">
          <q-btn
            rounded
            outline
            ripple
            label="复制"
            class="text-bold"
            color="accent"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- 面包栏 -->
    <div class="column gt-sm">
      <q-breadcrumbs
        active-color="black"
        separator="---"
        class="text-grey text-subtitle2 col-auto q-pa-md"
      >
        <template v-slot:separator>
          <q-icon size="1.5em" name="chevron_right" color="grey" />
        </template>
        <q-breadcrumbs-el v-for="category in categoryInfo" :label="category" :key="category" />
        <!-- <q-breadcrumbs-el icon="home" />
        <q-breadcrumbs-el label="Components" icon="widgets" />
        <q-breadcrumbs-el label="详情" icon="navigation" /> -->
      </q-breadcrumbs>
    </div>
    <div class="row">
      <!-- 详情页 -->
      <div class="col row">
        <div class="col-1 column items-center gt-sm">
          <div class="col-4"></div>
          <div class="column items-center bg-secondary" style="width: 40px">
            <div class="col-auto">
              <q-btn
                size="11px"
                class="bg-secondary"
                color="grey"
                flat
                round
                :icon="turnInOrNot"
                @click="turnInOrNotClick"
              >
              </q-btn>
            </div>
            <div class="col-auto"><q-badge text-color="grey">0</q-badge></div>
            <div class="col-auto">
              <q-btn size="11px" color="grey" flat round :icon="comment" @click="commentClick" />
            </div>
            <div class="col-auto"><q-badge text-color="grey">0</q-badge></div>
          </div>
        </div>
        <div class="col column">
          <div class="col q-pa-lg bg-secondary">
            <!-- 介绍 -->
            <div class="row col q-gutter-md">
              <!-- 主图 -->
              <div class="row col-auto justify-center" v-bind:class="[imagefullwidth]">
                <q-img
                  :src="detail.mainImageUrl"
                  width="250px"
                  height="250px"
                  :alt="detail.title"
                />
              </div>
              <!-- 主图旁边介绍，响应式 -->
              <div class="column col-md q-pa-xs col-sm-12 justify-between">
                <header>
                  <h1
                    id="intro"
                    class="col-md-auto col-sm-auto text-h6 text-dark text-bold q-mt-none"
                  >
                    {{ detail.title }}
                  </h1>
                </header>
                <div
                  class="col-md-2 col-sm-2 text-accent text-h6 text-weight-bold YL__title_font_family"
                >
                  {{ detail.priceText }}
                </div>
                <div class="col-md-1 col-sm-2"></div>
                <div class="col-md col-sm">
                  <q-btn
                    v-if="isTaoPwd === false"
                    class="text-weight-bold"
                    target="_blank"
                    color="accent"
                    text-color="white"
                    :size="buttonSize"
                    unelevated
                    @click="buyClick(detail.urlCode, detail.mall)"
                  >
                    去购买
                  </q-btn>
                  <q-btn
                    v-if="isTaoPwd === true"
                    class="text-weight-bold"
                    target="_blank"
                    color="accent"
                    text-color="white"
                    :size="buttonSize"
                    unelevated
                    @click="buyClick(detail.urlCode, detail.mall)"
                  >
                    复制淘口令
                  </q-btn>
                </div>
              </div>
            </div>

            <!-- 详情 -->
            <div class="column col-auto no-wrap q-pa-xs">
              <div class="col-auto column">
                <!-- 优惠券 -->
                <div v-if="couponInfo.length" class="col column text-weight-bold">
                  <div class="col-auto">
                    <span>优惠领取</span>
                  </div>
                  <div class="row col q-mt-md" v-for="coupon in couponInfo" :key="coupon.index">
                    <!-- :href="`${host}/goods/coupon-url/${detail.urlCode}?path=${coupon.actual_coupon_link}`" -->
                    <!-- :href="coupon.actual_coupon_link" -->
                    <!-- :href="`${host}/goods/coupon-url/${detail.urlCode}?index=${coupon.index}`" -->

                    <q-btn
                      v-if="!isCouponTaobaoPwd(coupon)"
                      color="white"
                      text-color="accent"
                      :size="buttonSize"
                      unelevated
                      outline
                      align="left"
                      style="width: 14em"
                      @click="takeCouponClick(detail.urlCode, coupon.index, detail.mall)"
                    >
                      {{ coupon.coupon_info }}
                      <!-- <a
                        target="_blank"
                        class="text-white text-weight-bold"
                        :href="coupon.actual_coupon_link"
                        style="width: 230px"
                      >
                        {{ coupon.coupon_info }}</a
                      > -->
                    </q-btn>
                    <q-btn
                      v-if="!isCouponTaobaoPwd(coupon)"
                      target="_blank"
                      color="accent"
                      text-color="white"
                      :size="buttonSize"
                      unelevated
                      class="text-weight-bold"
                      @click="takeCouponClick(detail.urlCode, coupon.index, detail.mall)"
                    >
                      领取
                    </q-btn>
                    <q-btn
                      v-if="isCouponTaobaoPwd(coupon)"
                      color="white"
                      text-color="accent"
                      :size="buttonSize"
                      unelevated
                      outline
                      align="left"
                      style="width: 14em"
                      @click="takeCouponClick(detail.urlCode, coupon.index, detail.mall)"
                    >
                      {{ coupon.coupon_info }}
                      <!-- <a
                        target="_blank"
                        class="text-white text-weight-bold"
                        :href="coupon.actual_coupon_link"
                        style="width: 230px"
                      >
                        {{ coupon.coupon_info }}</a
                      > -->
                    </q-btn>
                    <q-btn
                      v-if="isCouponTaobaoPwd(coupon)"
                      target="_blank"
                      color="accent"
                      text-color="white"
                      :size="buttonSize"
                      unelevated
                      class="text-weight-bold"
                      @click="takeCouponClick(detail.urlCode, coupon.index, detail.mall)"
                    >
                      复制淘口令
                    </q-btn>
                  </div>
                </div>
                <!-- 详细文字 -->
                <div class="col-auto q-mt-lg">
                  <span class="text-weight-bold text-grey-9 col" v-if="detail.emphsis != 'null'">
                    {{ detail.emphsis }}</span
                  >
                  <div
                    class="col-auto text-grey-9"
                    v-html="part"
                    v-for="part in detailParts"
                    :key="part"
                  ></div>
                </div>
              </div>
              <!-- 大图 -->
              <div class="col">
                <div class="column items-center q-pb-lg">
                  <q-img
                    v-for="bigImage in bigImages"
                    :key="bigImage"
                    :src="bigImage"
                    width="60%"
                    height="60%"
                    :alt="detail.title"
                  >
                  </q-img>

                  <q-img
                    v-if="bigImages.length == 0"
                    :src="detail.mainImageUrl"
                    width="60%"
                    height="60%"
                    :alt="detail.title"
                  >
                  </q-img>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 右边栏 -->
      <div v-if="isBigScreen" class="col-4 gt-md">
        <ResoureSideList />
      </div>
    </div>
  </q-page>
</template>

<script>
import 'src/config';
import ResoureSideList from '../components/ResourceSideList.vue';
// import { Screen } from 'quasar';
// import FastClick from 'fastclick';
// if (process.env.SerCLIENTver) {
//   import useClipboard from 'vue-clipboard3';
// }
import { useGoodsStore } from 'stores/goods';
import { Loading } from 'quasar';
import { mapState } from 'pinia';
import { useMeta } from 'quasar';
import { ref, nextTick } from 'vue';
import { reactive } from 'vue';

// import $ from 'jquery';

export default {
  name: 'DetailPage',
  data() {
    return {
      detail: {},
      detailParts: [],
      bigImages: [],
      couponInfo: [],
      categoryInfo: [],
      turnInOrNot: 'turned_in_not',
      comment: 'comment',
      isBigScreen: false,
      // buttonSize: Screen.gt.sm ? '12px' : '9px',
      host: global.config.domain,
      isTaoPwd: false,
      showing: false,
      taobaoPwd: '',
      alertText: '淘口令已复制\n请打开手淘',
      isShowCopyTaobaopwd: false,
    };
  },
  computed: {
    ...mapState(useGoodsStore, {
      _detail: 'detail',
      _detailParts: 'detailParts',
      _bigImages: 'bigImages',
      _couponInfo: 'couponInfo',
      _categoryInfo: 'categoryInfo',
      _userAgent: 'userAgent',
    }),
    imagefullwidth: function () {
      return {
        'full-width': this.isBigScreen ? false : true,
      };
    },
    buttonSize: function () {
      return this.isBigScreen ? '12px' : '9px';
    },
  },
  props: ['taobaoCode'], // 微信auth code

  components: {
    ResoureSideList,
  },
  setup() {
    console.log('DetailPage setup');
    const title = ref(
      '好家当 各大电商今日特价 京东，淘宝，天猫，唯品会，支付宝，小米，京喜百元生活费，折扣，优惠券，手慢无，秒杀，低价，优惠信息'
    );
    const meta = reactive({
      description: {
        name: 'description',
        content:
          '好家当 汇聚互联网今日特价 京东，淘宝，天猫，唯品会，支付宝，小米，京喜百元生活费，折扣，手慢无，秒杀，京东低价，优惠信息',
      },
      keywords: {
        name: 'keywords',
        content:
          '好家当 汇聚互联网今日特价 京东，淘宝，天猫，唯品会，支付宝，小米，京喜百元生活费，折扣，优惠券，手慢无，秒杀，低价，优惠信息',
      },
      ogtype: {
        property: 'og:type',
        content: 'product',
      },
      ogurl: {
        property: 'og:url',
        content: '',
      },
      ogtitle: {
        property: 'og:title',
        content:
          '好家当 汇聚互联网今日特价 京东，淘宝，天猫，唯品会，支付宝，小米，京喜百元生活费，折扣，优惠券，手慢无，秒杀，低价，优惠信息',
      },
      ogdescription: {
        property: 'og:description',
        content:
          '汇聚互联网今日特价 京东，淘宝，天猫，唯品会，支付宝，小米，京喜百元生活费，折扣，优惠券，手慢无，秒杀，低价，优惠信息',
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
    // useMeta({
    //   meta: {
    //     myKey: { name: 'description', content: 'Page 1' },
    //   },
    // });

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

    // setAnotherTitle('sdsdssds');
    // console.log('title is' + title.value);

    return {
      setAnotherTitle,
      meta,
    };
  },
  // our hook here
  preFetch({ store, currentRoute, previousRoute, redirect, ssrContext, urlPath, publicPath }) {
    console.log('Detail page prefetch');
    // const $q = useQuasar();
    // fetch data, validate route and optionally redirect to some other route...
    if (process.env.SERVER) {
      Loading.show();

      // ssrContext is available only server-side in SSR mode

      // No access to "this" here

      // Return a Promise if you are running an async job
      // Example:
      const myStore = useGoodsStore(store);
      if (process.env.SERVER) {
        myStore.userAgent = ssrContext.req.headers['user-agent'];
      }
      return myStore.getGoodDetail(currentRoute.params.urlCode, redirect);
    }
  },
  created() {
    console.log('Detail page created');
    // if (process.env.CLIENT) {
    //   console.log('xxxxxxxxxxxx');
    //   console.log(document.getElementsByTagName('title')[0].innerHTML);
    // }

    this.detail = this._detail;

    this.detailParts = this._detailParts;

    this.bigImages = this._bigImages;

    this.couponInfo = this._couponInfo;
    this.setAnotherTitle(this._detail.title);

    this.meta.description.content =
      this._detail.title + this.detail.emphsis + this.detail.detailBrief;
    let keywords = this.detail.mall;
    if (this._categoryInfo) {
      this._categoryInfo.slice(1).forEach((a) => (keywords += ',' + a));
    }
    this.meta.keywords.content = keywords;
    this.meta.ogtitle.content = this._detail.title;
    this.meta.ogurl.content = 'https://www.hjdang.com/item/detail/' + this.$route.params.urlCode;
    this.meta.ogdescription.content = this.detail.emphsis + this.detail.detailBrief;
    this.meta.ogimage.content = this.detail.mainImageUrl;
    this.meta.weibocreate.content = new Date();
    this.meta.weiboupdate.content = new Date();
    // if (process.env.CLIENT) {
    //   console.log('sssssssssssfff');
    //   console.log(document.getElementsByTagName('title')[0].innerHTML);
    //   console.log(document.getElementsByTagName('title')[0]);
    // }

    // await nextTick();
    // this.categoryInfo = this._categoryInfo;
  },

  // async serverPrefetch() {
  //   console.log('Detail page serverPrefetch');
  //   this.setAnotherTitle(this._detail.title + this.detail.detailBrief);
  // },

  mounted() {
    console.log('DetailPage mounted');
    let windowWidth = window.screen.width;
    if (windowWidth > 1023.99) {
      this.isBigScreen = true;
    }
    if (this.isTaobaoPwd()) {
      this.isTaoPwd = true;
      // this.taobaoPwd = this.detail.taobaoPwd;
    }
    if (this.taobaoCode !== '' && this.taobaoCode !== undefined) {
      this.taobaoPwd = this.taobaoCode;
      this.isShowCopyTaobaopwd = true;
    }
    if (Object.keys(this.detail).length === 0) {
      this.$q.loading.show({
        delay: 400, // ms
      });
      this.getItemDetail(this.$route.params.urlCode);
    }
  },
  methods: {
    getItemDetail(str) {
      this.$axios.post(`${global.config.domain}/goods/detail`, { code: str }).then((res) => {
        this.detail = res.data.data;
        console.log(this.detail);
        if (this.detail == null) {
          this.$router.push({ path: '/' });
          this.$q.loading.hide();
        }
        this.detailParts = JSON.parse(this.detail.detail);
        if (this.detail.bigImageUrls) {
          this.bigImages = JSON.parse(this.detail.bigImageUrls);
        }
        if (this.detail.couponInfo) {
          this.couponInfo = JSON.parse(this.detail.couponInfo);
        }
        this.categoryInfo = JSON.parse(this.detail.categoryText);
        // console.log('taobaoPwd = ' + this.taobaoCode);
        // if (this.isTaobaoPwd()) {
        //   this.isTaoPwd = true;
        //   // this.taobaoPwd = this.detail.taobaoPwd;
        // }
        // if (this.taobaoCode !== '' && this.taobaoCode !== undefined) {
        //   this.taobaoPwd = this.taobaoCode;
        //   this.isShowCopyTaobaopwd = true;
        // }

        this.$q.loading.hide();
      });
    },
    async copyPwd() {
      let that = this;
      if (this.taobaoPwd != '') {
        let obj = await import('vue-clipboard3');
        const { toClipboard } = obj.default();
        // const { toClipboard } = useClipboard();
        try {
          toClipboard(this.taobaoPwd);
          console.log('Copied to clipboard');
        } catch (e) {
          console.error(e);
        }
      }
      // this.$copyText(this.taobaoPwd).then(
      //   function (e) {
      //     console.log('this.taobaoPwd = ' + that.taobaoPwd);
      //   },
      //   function (e) {
      //     alert('Can not copy');
      //     console.log(e);
      //   }
      // );
    },
    turnInOrNotClick() {},
    commentClick() {},
    buyClick(urlCode, mall) {
      if (
        !this.isWeixin() && //只有不是微信端才需要提示登录，微信会自动登录
        /(京东|淘宝|天猫|聚划算)\W*/g.test(mall) &&
        !this.$q.localStorage.has('userInfo')
      ) {
        this.$q
          .dialog({
            title: '提醒',
            message: '未登陆将以非返利形势购买，继续吗？',
            ok: {
              color: 'accent',
              label: '继续',
              size: this.buttonSize,
            },
            cancel: {
              color: 'accent',
              label: '取消',
              size: this.buttonSize,
            },
            persistent: true,
          })
          .onOk(() => {
            console.log('>>>> OK');
            this.$q.loading.show({
              delay: 100, // ms
            });
            if (this.isTaoPwd) {
              //淘口令要从后台取
              // 这里必须用同步的ajax，否则ios的浏览器无法copy成功，this.$copyText不能放在异步方法里面\
              this.$axios.post(`${this.host}/goods/go/${urlCode}`, {}).then((res) => {
                console.log('res = ' + res.data);
                if (typeof res.data === 'string') {
                  if (/(http|https):\S*/.test(res.data)) {
                    window.location.href = res.data;
                  } else if (/redirect:\S*/.test(res.data)) {
                    //redirect其他页面
                    let redirectPath = res.slice(9);
                    this.$router.push({ path: redirectPath });
                  } else {
                    this.taobaoPwd = res.data;
                    console.log('taobaoPwd = ' + res.data);
                    this.isShowCopyTaobaopwd = true;
                  }
                  this.$q.loading.hide();
                } else {
                  this.$q.notify({
                    type: 'negative',
                    message: '好物已过期',
                  });
                }
              });
            } else {
              //因为每个用户的链接不同，需要每次从后台取链接
              this.$axios.post(`${this.host}/goods/go/${urlCode}`, {}).then((res) => {
                console.log(res.data);
                if (typeof res.data === 'string') {
                  if (/(http|https):\S*/.test(res.data)) {
                    window.location.href = res.data;
                    // window.open(res.data, '_blank');
                  } else if (/redirect:\S*/.test(res.data)) {
                    //redirect其他页面
                    let redirectPath = res.data.slice(9);
                    this.$router.push({ path: redirectPath });
                  }
                  // window.open(res.data, '_blank');
                  this.$q.loading.hide();
                } else {
                  this.$q.notify({
                    type: 'negative',
                    message: '好物已过期',
                  });
                }
              });
            }
          })
          .onOk(() => {
            console.log('>>>> second OK catcher');
          })
          .onCancel(() => {
            console.log('>>>> Cancel');
          })
          .onDismiss(() => {
            console.log('I am triggered on both OK and Cancel');
          });
      } else {
        //无返利模式
        this.$q.loading.show({
          delay: 100, // ms
        });
        if (this.isTaoPwd) {
          //淘口令要从后台取
          // 这里必须用同步的ajax，否则ios的浏览器无法copy成功，this.$copyText不能放在异步方法里面\
          this.$axios.post(`${this.host}/goods/go/${urlCode}`, {}).then((res) => {
            console.log('res = ' + res.data);
            if (typeof res.data === 'string') {
              if (/(http|https):\S*/.test(res.data)) {
                window.location.href = res.data;
              } else if (/redirect:\S*/.test(res.data)) {
                //redirect其他页面
                let redirectPath = res.slice(9);
                this.$router.push({ path: redirectPath });
              } else {
                this.taobaoPwd = res.data;
                console.log('taobaoPwd = ' + res.data);
                this.isShowCopyTaobaopwd = true;
              }
              this.$q.loading.hide();
            } else {
              this.$q.notify({
                type: 'negative',
                message: '好物已过期',
              });
            }
          });
        } else {
          //因为每个用户的链接不同，需要每次从后台取链接
          this.$axios.post(`${this.host}/goods/go/${urlCode}`, {}).then((res) => {
            console.log(res.data);
            if (typeof res.data === 'string') {
              if (/(http|https):\S*/.test(res.data)) {
                window.location.href = res.data;
                // window.open(res.data, '_blank');
              } else if (/redirect:\S*/.test(res.data)) {
                //redirect其他页面
                let redirectPath = res.data.slice(9);
                this.$router.push({ path: redirectPath });
              }
              // window.open(res.data, '_blank');
              this.$q.loading.hide();
            } else {
              this.$q.notify({
                type: 'negative',
                message: '好物已过期',
              });
            }
          });
        }
      }

      // this.$axios
      //   .post(`${global.config.domain}/user/event`, { type: '进入推广链接', remark: url })
      //   .then((res) => {
      //     console.log(res.data.data);
      //   });
    },

    takeCouponClick(code, index, mall) {
      if (
        !this.isWeixin() && //只有不是微信端才需要提示，微信会自动登录
        /(京东|淘宝|天猫|聚划算)\W*/g.test(mall) &&
        !this.$q.localStorage.has('userInfo')
      ) {
        this.$q
          .dialog({
            title: '提醒',
            message: '未登陆将以非返利形势购买，继续吗？',
            ok: {
              color: 'accent',
              label: '继续',
              size: this.buttonSize,
            },
            cancel: {
              color: 'accent',
              label: '取消',
              size: this.buttonSize,
            },
            persistent: true,
          })
          .onOk(() => {
            console.log('>>>> OK');
            this.$q.loading.show({
              delay: 100, // ms
            });
            if (this.isTaoPwd) {
              this.$axios
                .post(`${this.host}/goods/coupon-url/${code}?index=${index}`, {})
                .then((res) => {
                  console.log('res = ' + res.data);
                  if (/(http|https):\S*/.test(res.data)) {
                    window.location.href = res.data;
                  } else if (/redirect:\S*/.test(res.data)) {
                    //redirect其他页面
                    let redirectPath = res.slice(9);
                    this.$router.push({ path: redirectPath });
                  } else {
                    this.taobaoPwd = res.data;
                    console.log('coupon taobaoPwd = ' + res.data);
                    this.isShowCopyTaobaopwd = true;
                  }
                  this.$q.loading.hide();
                });
            } else {
              //因为每个用户的链接不同，需要每次从后台取链接
              this.$axios
                .post(`${this.host}/goods/coupon-url/${code}?index=${index}`, {
                  code: this.code,
                })
                .then((res) => {
                  console.log(res.data);
                  if (/(http|https):\S*/.test(res.data)) {
                    window.location.href = res.data;
                  } else if (/redirect:\S*/.test(res.data)) {
                    //redirect其他页面
                    let redirectPath = res.data.slice(9);
                    this.$router.push({ path: redirectPath });
                  }
                  // window.open(res.data, '_blank');
                  this.$q.loading.hide();
                });
            }
          })
          .onOk(() => {
            console.log('>>>> second OK catcher');
          })
          .onCancel(() => {
            console.log('>>>> Cancel');
          })
          .onDismiss(() => {
            console.log('I am triggered on both OK and Cancel');
          });
      } else {
        this.$q.loading.show({
          delay: 100, // ms
        });
        if (this.isTaoPwd) {
          this.$axios
            .post(`${this.host}/goods/coupon-url/${code}?index=${index}`, {})
            .then((res) => {
              console.log('res = ' + res.data);
              if (/(http|https):\S*/.test(res.data)) {
                window.location.href = res.data;
              } else if (/redirect:\S*/.test(res.data)) {
                //redirect其他页面
                let redirectPath = res.slice(9);
                this.$router.push({ path: redirectPath });
              } else {
                this.taobaoPwd = res.data;
                console.log('coupon taobaoPwd = ' + res.data);
                this.isShowCopyTaobaopwd = true;
              }
              this.$q.loading.hide();
            });
        } else {
          //因为每个用户的链接不同，需要每次从后台取链接
          this.$axios
            .post(`${this.host}/goods/coupon-url/${code}?index=${index}`, {
              code: this.code,
            })
            .then((res) => {
              console.log(res.data);
              if (/(http|https):\S*/.test(res.data)) {
                window.location.href = res.data;
              } else if (/redirect:\S*/.test(res.data)) {
                //redirect其他页面
                let redirectPath = res.data.slice(9);
                this.$router.push({ path: redirectPath });
              }
              // window.open(res.data, '_blank');
              this.$q.loading.hide();
            });
        }
      }

      // this.$axios
      //   .post(`${global.config.domain}/user/event`, { type: '商品领券', remark: url })
      //   .then((res) => {
      //     console.log(res.data.data);
      //   });
    },

    isTaobaoPwd() {
      if (this.isWeixin() && /(淘宝|天猫|聚划算)\W*/g.test(this.detail.mall)) {
        return true;
      } else {
        return false;
      }
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

    isCouponTaobaoPwd(coupon) {
      let result = this.isTaobaoPwd() && coupon.taobaoPwd;
      return result;
    },
  },
};
</script>

<style scoped lang="sass">
a
  color: #424242
  cursor: none
</style>
