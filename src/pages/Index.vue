<template>
  <q-page class="bg-primary">
    <q-separator />

    <q-list v-for="item in listData" v-bind:key="item.id" class="bg-secondary">
      <q-item
        v-ripple
        v-bind:class="[itemPadding]"
        :clickable="clickable"
        @click="itemClick(item.id)"
      >
        <q-item-section side>
          <div>
            <!-- 这里用router-link代替a -->

            <!-- <router-link :to="`/item/${item.id}`"> -->
            <!-- <router-link
              :to="{
                path: 'item',
                name: 'detail',
                query: { title: `${item.title}`, detail: `${item.detail}` },
              }"
            >
              <img v-bind:src="item.thumbUrl" />
            </router-link> -->

            <router-link
              :to="{
                path: 'item',
                name: 'detail',

                params: { id: item.id },
              }"
            >
              <img v-bind:src="item.thumbUrl" class="YL__index_img" />
            </router-link>
          </div>
        </q-item-section>
        <q-item-section class="q-pb-xs">
          <q-item-label
            :lines="lines"
            v-bind:class="[textSize, fontFamily, lineHeight]"
            class="text-grey-9 q-pb-xs"
          >
            {{ item.title }}</q-item-label
          >
          <q-item-label
            :lines="1"
            v-bind:class="[textSize, textAccent, fontFamily]"
            class="q-pb-xs"
          >
            {{ item.priceText }}
          </q-item-label>
          <q-item-label :lines="1">
            <span v-if="item.label != ''" style="text-align: left">
              <li
                v-for="a in transferLabel(item.label)"
                v-bind:key="a"
                style="text-align: left"
                class="YL__label YL__title_font_family"
              >
                {{ a }}
              </li>
            </span>
            <span v-else> &nbsp; &nbsp; &nbsp;</span>
          </q-item-label>

          <q-item-label
            :lines="2"
            class="gt-sm YL__list_line_height q-pb-xs YL__list_font_size text-grey-9 YL__title_font_family"
          >
            <span v-if="item.emphsis != 'null'" class="text-grey-9 text-weight-bold">{{
              item.emphsis
            }}</span
            >{{ item.detailBrief }}
            <router-link
              :to="{
                path: 'item',
                name: 'detail',
                params: { id: item.id },
              }"
              >...阅读全文
            </router-link>
          </q-item-label>
          <q-item-label
            :lines="1"
            class="row items-center justify-between YL__title_font_family YL__mall"
          >
            <div class="col-8">{{ item.mall }} | {{ item.dateStr }}</div>

            <div class="col-4 lt-sm" v-bind:class="iconGutter">
              <q-btn size="6px" color="grey" flat round :icon="thumbUpIcon" @click="thumbUpClick">
                <q-badge color="secondary" align="middle" text-color="grey" class="YL__badgeSize">{{
                  item.zhiCount
                }}</q-badge>
              </q-btn>
              <q-btn
                size="6px"
                color="grey"
                flat
                round
                :icon="thumbDownIcon"
                @click="thumbDownClick"
              >
                <q-badge color="secondary" align="middle" text-color="grey" class="YL__badgeSize">{{
                  item.buzhiCount
                }}</q-badge>
              </q-btn>
            </div>
          </q-item-label>

          <q-item-label
            :lines="1"
            class="row justify-between items-center YL__title_font_family gt-sm"
          >
            <div class="col-auto" v-bind:class="iconGutter">
              <q-btn size="9px" color="grey" flat round :icon="thumbUpIcon" @click="thumbUpClick">
                <q-badge color="secondary" align="middle" text-color="grey">{{
                  item.zhiCount
                }}</q-badge>
              </q-btn>
              <q-btn
                size="9px"
                color="grey"
                flat
                round
                :icon="thumbDownIcon"
                @click="thumbDownClick"
              >
                <q-badge color="secondary" align="middle" text-color="grey">{{
                  item.buzhiCount
                }}</q-badge>
              </q-btn>
              <q-btn
                size="9px"
                color="grey"
                flat
                round
                :icon="turnInOrNot"
                @click="turnInOrNotClick"
              >
                <q-badge color="secondary" align="middle" text-color="grey">{{
                  item.starCount
                }}</q-badge>
              </q-btn>
              <q-btn size="9px" color="grey" flat round :icon="comment" @click="commentClick">
                <q-badge color="secondary" align="middle" text-color="grey">{{
                  item.commentsCount
                }}</q-badge>
              </q-btn>
            </div>
            <div class="col justify-end row">
              <q-btn
                color="accent"
                :size="buyButtonSize"
                unelevated
                @click="buyClick(item.goodsInfoUrl)"
                @click.stop
              >
                <a
                  target="_blank"
                  class="text-white text-weight-bold"
                  :href="`${host}/goods/go/${item.urlCode}`"
                >
                  去购买</a
                >
              </q-btn>
            </div>
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-separator />

      <!-- <q-separator /> -->
    </q-list>

    <div class="q-my-xs q-pa-lg flex flex-center bg-secondary">
      <q-pagination
        v-model="current"
        :size="paginationSize"
        color="dark"
        :max="max"
        :max-pages="maxPage"
        :boundary-numbers="false"
        :direction-links="true"
        @input="pageNavigate"
      >
      </q-pagination>
    </div>
  </q-page>
</template>

<style lang="sass">
.YL
  &__index_img
    @media(max-width: $breakpoint-xs-max)
      width: 110px
      height: 110px
    @media(min-width: $breakpoint-xs-max)
      width: 180px
      height: 180px
  &__label
    color: rgba(0, 0, 0, 0.54)
    font-size: 0.7em
    background: #f5f5f5
    display: inline-block
    margin-right: 7px;
    text-align: center;
    letter-spacing: 0.03333em
    list-type: none
    -webkit-font-smoothing: antialiased
  &__mall
    color: rgba(0, 0, 0, 0.54)
    font-size: 0.65em

  &__badgeSize
     font-size: 10px
</style>

<script>
import { matTurnedInNot } from '@quasar/extras/material-icons';
import { Screen } from 'quasar';

// console.log('1<<<<<');
// console.log(global);
// console.log('1>>>>>');

export default {
  name: 'PageIndex',
  data() {
    return {
      listData: [],
      current: 1,
      max: 0,
      thumbUpIcon: 'thumb_up',
      thumbDownIcon: 'thumb_down',
      turnInOrNot: 'turned_in_not',
      comment: 'comment',
      isBigScreen: Screen.gt.sm ? true : false,
      isNormal: true,
      fontFamily: 'YL__title_font_family',
      lineHeight: 'YL__list_line_height',
      textAccent: 'text-accent',
      paginationSize: Screen.gt.sm ? '12px' : '9px',
      maxPage: Screen.gt.sm ? 6 : 4,
      // to: false,
    };
  },
  props: ['query', 'sort'],
  computed: {
    itemPadding: function () {
      return this.isBigScreen ? 'q-py-md' : 'q-py-sm';
    },
    textSize: function () {
      return this.isBigScreen ? 'text-h7' : 'text-subtitle2';
    },

    lines: function () {
      return Screen.gt.sm ? 1 : 2;
    },
    buyButtonSize: function () {
      return this.isBigScreen ? '11px' : '8px';
    },
    host: function () {
      return global.config.domain;
    },
    clickable: function () {
      return this.isBigScreen ? false : true;
    },
    iconGutter: function () {
      return this.isBigScreen ? 'q-gutter-md' : 'q-gutter-none';
    },
  },
  // watch: {
  //   $route(to, from) {
  //     this.getItemList();
  //   },
  // },

  // beforeRouteEnter(to, from, next) {
  //   if (from.name == 'search' && to.name == 'search') {
  //     console.log('dsd');
  //     this.getItemList();
  //     next();
  //   } else {
  //     log.info('ffff');

  //     next();
  //   }
  // },
  // beforeCreate() {
  //   this.$q.loading.show({
  //     delay: 400, // ms
  //   });
  // },

  created() {
    console.log('Index created');
  },

  mounted() {
    console.log('Index mounted');
    // this.selectedTab = 'main';
    this.getItemList();

    // this.windowWidth = window.innerWidth;
    // window.onresize = () => {
    //   this.windowWidth = window.innerWidth;
    // };
  },
  methods: {
    getItemList(sortIndex) {
      // console.log('$$$$$$' + this.query);
      this.$q.loading.show({
        delay: 400, // ms
      });
      this.$axios
        .post(`${global.config.domain}/goods/list`, {
          page: this.current,
          path: this.$route.path,
          query: this.$route.query.q,
          sort: sortIndex != null ? sortIndex : this.sort,
        })
        .then((res) => {
          // console.log(res.data.data);
          // console.log(this.isBigScreen);

          this.listData = res.data.data.records;
          this.max = res.data.data.total / res.data.data.size + 1;
          this.$q.loading.hide();
        });
    },
    pageNavigate() {
      this.$axios
        .post(`${global.config.domain}/goods/list`, {
          page: this.current,
          path: this.$route.path,
          query: this.$route.query.q,
          sort: this.sort,
        })
        .then((res) => {
          console.log(res.data.data.records);
          this.listData = res.data.data.records;
          this.max = res.data.data.total / res.data.data.size + 1;
        });
    },
    thumbUpClick() {
      this.thumbUpIcon = 'thumb_up';
    },
    thumbDownClick() {
      this.thumbDownIcon = 'thumb_down';
    },
    turnInOrNotClick() {},
    commentClick() {},
    itemClick(id) {
      this.$router.push({ path: 'item', name: 'detail', params: { id: id } });
      // const { href } = this.$router.resolve({
      //   path: 'item/detail',
      //   name: 'detail',
      //   params: {
      //     id: id,
      //   },
      // });
      // window.open(href, '_blank');

      // window.location.href = `${global.config.domain}/goods/detail?id=` + id;
    },
    buyClick(url) {
      this.$axios
        .post(`${global.config.domain}/user/event`, { type: '进入推广链接', remark: url })
        .then((res) => {
          console.log(res.data.data);
        });
    },
    transferLabel(label) {
      if (label != '') {
        let labelsArray = JSON.parse(label);
        return labelsArray;
      } else {
        return '';
      }
    },
  },
};
</script>
