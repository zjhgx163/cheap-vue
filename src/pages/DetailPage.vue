<template>
  <q-page>
    <!-- 面包栏 -->
    <div class="column">
      <q-breadcrumbs
        active-color="black"
        separator="---"
        class="text-grey text-subtitle2 col-auto q-py-md"
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
        <div class="col-1 column items-center gt-sm" style="height: 1650px">
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
            <div class="row col-3 q-gutter-md justify-center">
              <!-- 主图 -->
              <div class="col-md-auto col-sm-12">
                <q-img :src="detail.mainImageUrl" width="250px" height="250px" />
              </div>
              <!-- 主图旁边介绍，响应式 -->
              <div class="column col-md q-pa-sm col-sm-12">
                <div class="col-auto text-h6">{{ detail.title }}</div>
                <div class="col-2 text-accent text-h6 text-weight-bold YL__title_font_family">
                  {{ detail.priceText }}
                </div>
                <div class="col-2"></div>
                <div class="col">
                  <q-btn color="accent" size="13px" unelevated>
                    <a
                      target="_blank"
                      class="text-white text-weight-bold"
                      :href="detail.actualBuyLink"
                    >
                      去购买</a
                    >
                  </q-btn>
                </div>
              </div>
            </div>
            <!-- 优惠券 -->
            <div v-if="couponInfo.length" class="text-weight-bold">
              <span>优惠领取</span>
            </div>
            <div
              class="row col-auto q-mt-md"
              v-for="coupon in couponInfo"
              :key="coupon.coupon_link"
            >
              <q-btn color="accent" size="13px" unelevated>
                <a
                  target="_blank"
                  class="text-white text-weight-bold"
                  :href="coupon.actual_coupon_link"
                >
                  {{ coupon.coupon_info }}</a
                >
              </q-btn>
            </div>
            <!-- 详情 -->
            <div class="col-auto q-mt-lg column col-sm-12">
              <div class="text-weight-bold">
                <span>{{ detail.emphsis }}</span>
              </div>
              <div v-html="part" v-for="part in detailParts" :key="part">
                <!-- {{ part }} -->
              </div>
            </div>
            <!-- 大图 -->
            <div class="col column items-center">
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
    };
  },
  props: ['id'],

  components: {
    HotList,
  },
  mounted() {
    this.getItemDetail(this.id);
  },
  methods: {
    getItemDetail(id) {
      this.$axios.post(`${global.config.domain}/goods/detail`, { id: id }).then((res) => {
        this.detail = res.data.data;
        this.detailParts = JSON.parse(this.detail.detail);
        if (this.detail.bigImageUrls) {
          this.bigImages = JSON.parse(this.detail.bigImageUrls);
        }
        if (this.detail.couponInfo) {
          this.couponInfo = JSON.parse(this.detail.couponInfo);
        }
        this.categoryInfo = JSON.parse(this.detail.categoryText);
        console.log(this.detail);
      });
    },
    turnInOrNotClick() {},
    commentClick() {},
  },
};
</script>
