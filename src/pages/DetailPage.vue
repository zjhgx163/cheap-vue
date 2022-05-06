<template>
  <q-page>
    <q-tooltip
      anchor="bottom middle"
      self="top middle"
      target="#intro"
      :offset="[10, 40]"
      max-height="8rem"
      max-width="9rem"
      v-model="showing"
      no-parent-event
      >{{ alertText }}
    </q-tooltip>

    <!-- 面包栏 -->
    <div class="column">
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
                <q-img :src="detail.mainImageUrl" width="250px" height="250px" />
              </div>
              <!-- 主图旁边介绍，响应式 -->
              <div class="column col-md q-pa-xs col-sm-12 justify-between">
                <div
                  id="intro"
                  class="col-md-auto col-sm-auto text-h6 text-dark text-weight-medium"
                >
                  {{ detail.title }}
                </div>
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
                    @click="buyClick(detail.urlCode)"
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
                    @click="buyClick(detail.urlCode)"
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
                      @click="takeCouponClick(detail.urlCode, coupon.index)"
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
                      @click="takeCouponClick(detail.urlCode, coupon.index)"
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
                      @click="takeCouponClick(detail.urlCode, coupon.index)"
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
                      @click="takeCouponClick(detail.urlCode, coupon.index)"
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
                  >
                  </q-img>

                  <q-img
                    v-if="bigImages.length == 0"
                    :src="detail.mainImageUrl"
                    width="60%"
                    height="60%"
                  >
                  </q-img>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 右边栏 -->
      <div class="col-3 gt-md">
        <HotList />
      </div>
    </div>
  </q-page>
</template>

<script>
import 'src/config';
import HotList from '../components/HotList.vue';
import { Screen } from 'quasar';
import FastClick from 'fastclick';
// import clipboard from 'src/clipboard';
// import Clipboard from 'clipboard';
import $ from 'jquery';

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
      buttonSize: Screen.gt.sm ? '13px' : '9px',
      host: global.config.domain,
      isTaoPwd: false,
      showing: false,
      taobaoPwd: '',
      alertText: '淘口令已复制\n请打开手淘',
    };
  },
  computed: {
    imagefullwidth: function () {
      return {
        'full-width': Screen.gt.sm ? false : true,
      };
    },
  },
  props: ['taobaoCode'], // 微信auth code

  components: {
    HotList,
  },

  mounted() {
    //解决iphone移动端的延迟
    FastClick.attach(document.body);
    console.log('DetailPage mounted');

    this.$q.loading.show({
      delay: 400, // ms
    });

    this.getItemDetail(this.$route.params.urlCode);
    let that = this;
    if (this.taobaoCode !== '') {
      setTimeout(() => {
        {
          //用户登陆后传过来的淘宝码
          this.$copyText(that.taobaoCode).then(
            function (e) {
              console.log('this.taobaoCode = ' + that.taobaoCode);

              that.showing = true;
              let t = setTimeout(() => {
                that.showing = false;
              }, 1500);
            },
            function (e) {
              alert('Can not copy');
              console.log(e);
            },
          );
        }
      }, 1500);
    }

    console.log('urlCode = ' + this.$route.params.urlCode);
  },
  methods: {
    getItemDetail(str) {
      this.$axios.post(`${global.config.domain}/goods/detail`, { code: str }).then((res) => {
        this.detail = res.data.data;
        console.log(this.detail);
        if (this.detail == null) {
          this.$router.push({ path: '/error' });
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
        console.log('taobaoPwd = ' + this.detail.taobaoPwd);
        if (this.isTaobaoPwd()) {
          this.isTaoPwd = true;
          // this.taobaoPwd = this.detail.taobaoPwd;
        }
        if (typeof this.code == 'undefined' || this.code == null || this.code == '') {
        } else {
          // code有值说明是微信网页授权的redirect过来的，此时要根据state执行是去购买还是领券的操作
          if (this.state == 'buy') {
            //代表购买商品
            this.buyClick(this.$route.params.urlCode);
          } else {
            //领券操作
            this.takeCouponClick(this.$route.params.urlCode, this.state.slice(6));
          }
        }
        this.$q.loading.hide();
      });
    },
    turnInOrNotClick() {},
    commentClick() {},
    buyClick(urlCode) {
      this.$q.loading.show({
        delay: 100, // ms
      });
      // this.$axios
      //   .post(`${global.config.domain}/user/event`, { type: '进入推广链接', remark: url })
      //   .then((res) => {
      //     console.log(res.data.data);
      //   });
      if (this.isTaoPwd) {
        //淘口令要从后台取
        // 这里必须用同步的ajax，否则ios的浏览器无法copy成功，this.$copyText不能放在异步方法里面\
        console.log('code = ' + this.code);
        $.ajaxSettings.async = false;
        let that = this;
        $.ajax({
          type: 'POST',
          async: false,
          data: JSON.stringify({ code: (this.code = undefined ? '' : this.code) }),
          contentType: 'application/json;charset=UTF-8',
          url: `${this.host}/goods/go/${urlCode}`,
          success: function (res) {
            console.log('res = ' + res);
            if (/(http|https):\S*/.test(res)) {
              window.location.href = res;
            } else if (/redirect:\S*/.test(res)) {
              //redirect其他页面
              let redirectPath = res.slice(9);
              that.$router.push({ path: redirectPath });
            } else {
              that.taobaoPwd = res;
              console.log('taobaoPwd = ' + res);
            }
            that.$q.loading.hide();
          },
        });

        if (this.taobaoPwd != '')
          this.$copyText(this.taobaoPwd).then(
            function (e) {
              console.log('this.taobaoPwd = ' + that.taobaoPwd);

              that.showing = true;
              let t = setTimeout(() => {
                that.showing = false;
              }, 1500);
            },
            function (e) {
              alert('Can not copy');
              console.log(e);
            },
          );
      } else {
        //因为每个用户的链接不同，需要每次从后台取链接
        console.log('this.code = ' + this.code);
        let that = this;
        this.$axios
          .post(`${this.host}/goods/go/${urlCode}`, {
            code: this.code,
          })
          .then((res) => {
            console.log(res.data);
            if (/(http|https):\S*/.test(res.data)) {
              window.location.href = res.data;
              // window.open(res.data, '_blank');
            } else if (/redirect:\S*/.test(res.data)) {
              //redirect其他页面
              let redirectPath = res.data.slice(9);
              that.$router.push({ path: redirectPath });
            }
            // window.open(res.data, '_blank');
            this.$q.loading.hide();
          });
      }
    },

    takeCouponClick(code, index) {
      // this.$axios
      //   .post(`${global.config.domain}/user/event`, { type: '商品领券', remark: url })
      //   .then((res) => {
      //     console.log(res.data.data);
      //   });

      if (this.isTaoPwd) {
        let that = this;
        $.ajax({
          type: 'POST',
          async: false,
          data: JSON.stringify({ code: (this.code = undefined ? '' : this.code) }),
          contentType: 'application/json;charset=UTF-8',
          url: `${this.host}/goods/coupon-url/${code}?index=${index}`,
          success: function (res) {
            console.log('res = ' + res);
            if (/(http|https):\S*/.test(res)) {
              window.location.href = res;
            } else if (/redirect:\S*/.test(res)) {
              //redirect其他页面
              let redirectPath = res.slice(9);
              that.$router.push({ path: redirectPath });
            } else {
              that.taobaoPwd = res;
              console.log('coupon taobaoPwd = ' + res);
            }
            that.$q.loading.hide();
          },
        });

        if (this.taobaoPwd != '') {
          this.$copyText(this.taobaoPwd).then(
            function (e) {
              console.log('coupon this.taobaoPwd = ' + that.taobaoPwd);

              that.showing = true;
              let t = setTimeout(() => {
                that.showing = false;
              }, 1500);
            },
            function (e) {
              alert('Can not copy');
              console.log(e);
            },
          );
        }
      } else {
        //因为每个用户的链接不同，需要每次从后台取链接
        console.log('coupon this.code = ' + this.code);
        let that = this;
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
              that.$router.push({ path: redirectPath });
            }
            // window.open(res.data, '_blank');
            this.$q.loading.hide();
          });
      }
    },

    isTaobaoPwd() {
      var ua = window.navigator.userAgent.toLowerCase();
      // console.log(ua);
      if (
        ua.match(/MicroMessenger/i) == 'micromessenger' &&
        /(淘宝|天猫|聚划算)\W*/g.test(this.detail.mall)
      ) {
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
