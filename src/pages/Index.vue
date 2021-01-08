<template>
  <q-page class="bg-primary">
    <q-separator />

    <q-list v-for="item in listData" v-bind:key="item.id" class="bg-secondary">
      <q-item v-ripple class="q-py-md" :clickable="clickable" @click="itemClick(item.id)">
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
              target="_blank"
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
        <q-item-section class="column justify-between">
          <q-item-label
            :lines="lines"
            v-bind:class="[textSize, textColResponsive, fontFamily, lineHeight]"
          >
            {{ item.title }}</q-item-label
          >
          <q-item-label lines="1" v-bind:class="[textSize, textCol2, textAccent, fontFamily]">
            {{ item.priceText }}</q-item-label
          >

          <q-item-label lines="2" class="col-auto gt-sm YL__list_line_height YL__list_font_size">
            <span v-if="item.emphsis != 'null'" class="text-weight-bold">{{ item.emphsis }}</span
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
          <q-item-label lines="1" class="col-2 row items-center justify-even" caption>
            <div class="col-3">{{ item.mall }} | {{ item.dateStr }}</div>

            <!-- <router-link
              :to="{
                path: 'item',
                name: 'detail',
                params: { id: item.id },
              }"
            >
              查看详情
            </router-link> -->
          </q-item-label>

          <q-item-label class="col row justify-between items-center">
            <div class="col" v-bind:class="iconGutter">
              <q-btn size="11px" color="grey" flat round :icon="thumbUpIcon" @click="thumbUpClick">
                <q-badge color="secondary" align="middle" text-color="grey">{{
                  item.zhiCount
                }}</q-badge>
              </q-btn>
              <q-btn
                size="11px"
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
                size="11px"
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
              <q-btn
                size="11px"
                color="grey"
                class="gt-sm"
                flat
                round
                :icon="comment"
                @click="commentClick"
              >
                <q-badge color="secondary" align="middle" text-color="grey">{{
                  item.commentsCount
                }}</q-badge>
              </q-btn>
            </div>
            <div class="col-auto justify-end row">
              <q-btn color="accent" :size="buyButtonSize" unelevated @click="buyClick">
                <a
                  target="_blank"
                  class="text-white text-weight-bold"
                  :href="`${host}/goods/go/${item.urlCode}`"
                  @click.stop
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
      textCol2: 'col-2',
      paginationSize: Screen.gt.sm ? '12px' : '9px',
      maxPage: Screen.gt.sm ? 6 : 4,
      // to: false,
    };
  },
  props: ['query'],
  computed: {
    textSize: function () {
      return this.isBigScreen ? 'text-h7' : 'text-subtitle2';
    },

    textColResponsive: function () {
      return this.isBigScreen ? 'col-2' : 'col-5';
    },
    lines: function () {
      return Screen.gt.sm ? 1 : 2;
    },
    buyButtonSize: function () {
      return this.isBigScreen ? '13px' : '10px';
    },
    host: function () {
      return global.config.domain;
    },
    clickable: function () {
      return this.isBigScreen ? false : true;
    },
    iconGutter: function () {
      return this.isBigScreen ? 'q-gutter-md' : 'q-gutter-sm';
    },
  },
  watch: {
    $route(to, from) {
      this.getItemList();
    },
  },
  mounted() {
    this.selectedTab = 'main';
    this.getItemList();

    // this.windowWidth = window.innerWidth;
    // window.onresize = () => {
    //   this.windowWidth = window.innerWidth;
    // };
  },
  methods: {
    getItemList(sort) {
      console.log('$$$$$$' + this.query);
      this.$axios
        .post(`${global.config.domain}/goods/list`, {
          page: this.current,
          path: this.$route.path,
          query: this.$route.query.q,
          sort: sort,
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
      // this.$router.push({ path: 'item', name: 'detail', params: { id: id } });
      const { href } = this.$router.resolve({
        path: 'item',
        name: 'detail',
        params: {
          id: id,
        },
      });
      window.open(href, '_blank');

      // window.location.href = `${global.config.domain}/goods/detail?id=` + id;
    },
    buyClick() {
      this.$axios
        .post(`${global.config.domain}/user/event`, { type: '进入推广链接' })
        .then((res) => {
          console.log(res.data.data);
        });
    },
  },
};
</script>
