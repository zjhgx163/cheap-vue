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
                    v-if="isTaoPwd == false"
                    class="text-weight-bold"
                    target="_blank"
                    color="accent"
                    text-color="white"
                    :size="buttonSize"
                    type="a"
                    :href="`${host}/goods/go/${detail.urlCode}`"
                    unelevated
                    @click="buyClick(detail.urlCode, detail.goodsInfoUrl)"
                  >
                    去购买
                  </q-btn>
                  <q-btn
                    v-if="isTaoPwd == true"
                    class="text-weight-bold"
                    target="_blank"
                    color="accent"
                    text-color="white"
                    :size="buttonSize"
                    unelevated
                    @click="buyClick(detail.urlCode, detail.goodsInfoUrl)"
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
                  <div
                    class="row col q-mt-md"
                    v-for="coupon in couponInfo"
                    :key="coupon.coupon_link"
                  >
                    <!-- :href="`${host}/goods/coupon-url/${detail.urlCode}?path=${coupon.actual_coupon_link}`" -->

                    <q-btn
                      color="white"
                      text-color="accent"
                      :size="buttonSize"
                      target="_blank"
                      unelevated
                      outline
                      align="left"
                      type="a"
                      :href="coupon.actual_coupon_link"
                      style="width: 14em"
                      @click="takeCouponClick(detail.goodsInfoUrl)"
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
                      target="_blank"
                      color="accent"
                      text-color="white"
                      :size="buttonSize"
                      unelevated
                      type="a"
                      :href="coupon.actual_coupon_link"
                      class="text-weight-bold"
                      @click="takeCouponClick(detail.goodsInfoUrl)"
                    >
                      领取
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
      buttonSize: Screen.gt.sm ? '13px' : '10px',
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
  props: ['id'],

  components: {
    HotList,
  },

  mounted() {
    console.log('DetailPage mounted');
    this.$q.loading.show({
      delay: 400, // ms
    });
    this.getItemDetail(this.id);
  },
  methods: {
    getItemDetail(id) {
      this.$axios.post(`${global.config.domain}/goods/detail`, { id: id }).then((res) => {
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

        if (this.isTaobaoPwd() && this.detail.taobaoPwd != '') {
          this.isTaoPwd = true;
          this.taobaoPwd = this.detail.taobaoPwd;
        }
        this.$q.loading.hide();
      });
    },
    turnInOrNotClick() {},
    commentClick() {},
    buyClick(code, url) {
      // this.$q.loading.show({
      //   delay: 100, // ms
      // });
      this.$axios
        .post(`${global.config.domain}/user/event`, { type: '进入推广链接', remark: url })
        .then((res) => {
          console.log(res.data.data);
        });
      if (this.isTaoPwd) {
        let that = this;
        this.$copyText(this.taobaoPwd).then(
          function (e) {
            console.log(e);

            that.showing = true;
            // this.$q.loading.hide();
            let t = setTimeout(() => {
              that.showing = false;
            }, 1500);
          },
          function (e) {
            alert('Can not copy');
            console.log(e);
            // this.$q.loading.hide();
          },
        );
        // this.$axios.get(`${this.host}/goods/go/${code}`).then((res) => {
        //   console.log('res = ' + res.data);
        //   this.taobaoPwd = res.data;
        //   console.log('taobaoPwd = ' + res.data);
        //   this.$q.loading.show({
        //     delay: 200, // ms
        //   });

        //   hidethis.$q.loading.();

        //   let t = setTimeout(() => {
        //     this.showing = false;
        //   }, 1500);

        //   // clearTimeout(t);
        // });
      }
    },

    // onCopy: function (e) {
    //   this.showing = true;
    //   let t = setTimeout(() => {
    //     this.showing = false;
    //   }, 1500);
    // },
    // onError: function (e) {
    //   alert('Failed to copy texts');
    // },

    takeCouponClick(url) {
      this.$axios
        .post(`${global.config.domain}/user/event`, { type: '商品领券', remark: url })
        .then((res) => {
          console.log(res.data.data);
        });
    },

    isTaobaoPwd() {
      var ua = window.navigator.userAgent.toLowerCase();
      console.log(ua);
      if (
        ua.match(/MicroMessenger/i) == 'micromessenger' &&
        /(淘宝|天猫|聚划算)\W*/g.test(this.detail.mall)
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>
