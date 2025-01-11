<template>
  <q-page class="bg-primary" :style-fn="myTweak">
    <div v-if="listData.length === 0" class="column items-center justify-center absolute-full">
      <div class="clo-4 YL__no_data">
        <q-img src="/static/no-data.png" spinner-color="white" alt="空空如也～"> </q-img>

        <div class="text-subtitle2 text-center text-grey">~空空如也~</div>
      </div>

      <div class="col-3"></div>
    </div>

    <div v-else ref="scrollTargetRef">
      <!--   当使用:scroll-target 时，被指定的container必须要有 style="overflow: auto; max-height: 3000px" -->

      <q-infinite-scroll @load="onLoad" :offset="250" :initial-index="1" :disable="disable">
        <q-pull-to-refresh @refresh="refresh" no-mouse>
          <q-list separator dense class="bg-secondary" id="scroll-target-id">
            <div
              id="containerId"
              v-bind:key="item.id"
              v-for="item in listData"
              class="bg-primary"
              v-bind:class="{ 'q-pb-sm': !isBigScreen }"
            >
              <!-- 这里q-item 不加to，因为加上to会导致pc端整个变成可点击 -->

              <q-item
                v-ripple
                v-bind:class="[itemPadding]"
                :clickable="clickable"
                @click="itemClick(item.urlCode)"
                class="bg-secondary"
                dense
              >
                <q-item-section side no-wrap>
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

                      params: { urlCode: item.urlCode },
                    }"
                  >
                    <img v-bind:src="item.thumbUrl" class="YL__index_img" :alt="item.title" />
                  </router-link>
                </q-item-section>

                <q-item-section class="q-pb-xs">
                  <q-item-label
                    :lines="lines"
                    v-bind:class="[textSize, fontFamily, lineHeight, titleHeight]"
                    class="text-grey-9 text-bold"
                  >
                    {{ item.title }}
                  </q-item-label>

                  <q-item-label
                    :lines="1"
                    v-bind:class="[textSize, textAccent, fontFamily, pricePading]"
                  >
                    {{ item.priceText }}
                  </q-item-label>

                  <q-item-label :lines="1" class="text-weight-medium">
                    <span v-if="item.label != ''" style="text-align: left">
                      <li
                        v-for="a in transferLabel(item.label)"
                        v-bind:key="a"
                        style="text-align: left"
                        class="YL__label q-py-none"
                      >
                        {{ a }}
                      </li>
                    </span>

                    <span v-else> &nbsp; &nbsp; &nbsp;</span>
                  </q-item-label>

                  <q-item-label
                    :lines="2"
                    class="gt-sm YL__list_line_height q-py-sm YL__list_font_size text-grey-9 YL__content_height"
                  >
                    <span v-if="item.emphsis != 'null'" class="text-grey-9 text-weight-bold">
                      {{ item.emphsis }}
                    </span>
                    {{ item.detailBrief }}
                    <router-link
                      :to="{
                        path: 'item',
                        name: 'detail',
                        params: { urlCode: item.urlCode },
                      }"
                    >
                      ...阅读全文
                    </router-link>
                  </q-item-label>

                  <q-item-label :lines="1" class="row items-center justify-between YL__mall lt-sm">
                    <div class="col-auto text-weight-medium">
                      {{ item.mall }} | {{ item.dateStr }}
                    </div>

                    <div class="col-5 row">
                      <div class="row items-center">
                        <q-btn
                          size="7px"
                          color="grey"
                          flat
                          round
                          :icon="thumbUpIcon"
                          @click="thumbUpClick"
                        >
                        </q-btn>

                        <div>{{ item.zhiCount }}</div>
                      </div>

                      <div class="row items-center">
                        <q-btn
                          size="7px"
                          color="grey"
                          flat
                          round
                          :icon="thumbDownIcon"
                          @click="thumbDownClick"
                        >
                        </q-btn>

                        <div>{{ item.buzhiCount }}</div>
                      </div>
                    </div>
                  </q-item-label>

                  <q-item-label
                    :lines="1"
                    class="row justify-between items-end gt-sm YL__mall y-pt-xs"
                  >
                    <div class="col-5 row justify-between flex-center">
                      <div class="row flex-center">
                        <q-btn
                          size="0.7em"
                          color="grey"
                          flat
                          round
                          :icon="thumbUpIcon"
                          @click="thumbUpClick"
                        >
                        </q-btn>

                        <div>{{ item.zhiCount }}</div>
                      </div>

                      <div class="row flex-center">
                        <q-btn
                          size="0.7em"
                          color="grey"
                          flat
                          round
                          :icon="thumbDownIcon"
                          @click="thumbDownClick"
                        >
                        </q-btn>

                        <div>{{ item.buzhiCount }}</div>
                      </div>

                      <div class="row flex-center">
                        <q-btn
                          size="0.7em"
                          color="grey"
                          flat
                          round
                          :icon="turnInOrNot"
                          @click="turnInOrNotClick"
                        >
                        </q-btn>

                        <div>{{ item.starCount }}</div>
                      </div>

                      <div class="row flex-center">
                        <q-btn
                          size="0.7em"
                          color="grey"
                          flat
                          round
                          :icon="comment"
                          @click="commentClick"
                        >
                        </q-btn>

                        <div>{{ item.commentsCount }}</div>
                      </div>
                    </div>

                    <div class="col-5 justify-end row">
                      <div class="col"></div>

                      <div class="col-auto flex-center row">
                        {{ item.mall }} | {{ item.dateStr }}
                      </div>

                      <div class="col-1"></div>

                      <q-btn
                        class="col-3"
                        color="accent"
                        :size="buyButtonSize"
                        unelevated
                        @click.stop="buyClick(item.urlCode, item.mall)"
                      >
                        <a class="text-white text-weight-bold"> 去购买</a>
                      </q-btn>
                    </div>
                  </q-item-label>
                </q-item-section>
              </q-item>

              <q-separator color="primary" class="gt-sm" />
            </div>
          </q-list>
        </q-pull-to-refresh>
        <template v-slot:loading>
          <div class="row justify-center q-my-md">
            <q-spinner-dots color="accent" size="40px"></q-spinner-dots>
          </div>
        </template>
      </q-infinite-scroll>
      <div class="YL__list_end q-mb-sm" v-bind:class="{ hidden: !isListEnd }">
        <span class="YL__endline">我是有底线的</span>
      </div>
      <div class="q-my-xs q-pa-lg flex flex-center bg-secondary gt-sm">
        <q-pagination
          gutter="md"
          v-model="current"
          :size="paginationSize"
          color="dark"
          :max="max"
          :max-pages="maxPage"
          :boundary-numbers="false"
          :direction-links="true"
          @update:model-value="pageNavigate"
        >
        </q-pagination>
      </div>
    </div>
  </q-page>
</template>

<style lang="sass">
.YL
  &__index_img
    @media(max-width: $breakpoint-xs-max)
      width: 120px
      height: 120px
    @media(min-width: $breakpoint-xs-max)
      width: 170px
      height: 170px
  &__label
    @media(max-width: $breakpoint-xs-max)
      font-size: 0.7em
      height: 1.5em
    @media(min-width: $breakpoint-xs-max)
      font-size: 0.87em
    color: rgba(0, 0, 0, 0.54)
    background: #f5f5f5
    display: inline-block
    margin-right: 7px
    text-align: center
    letter-spacing: 0.03333em
    list-type: none
    -webkit-font-smoothing: antialiased
    line-height: 1.2em
  &__mall
    @media(max-width: $breakpoint-xs-max)
      font-size: 0.7em
      height: 1.4em
    @media(min-width: $breakpoint-xs-max)
      font-size: 0.9em
      height: 2.6em
    color: rgba(0, 0, 0, 0.54)
    line-height: 1.2em
  &__title_height
    @media(max-width: $breakpoint-xs-max)
      height: 3.0em
    @media(min-width: $breakpoint-xs-max)
      height: 1.6em
  &__content_height
      height: 3.8em
  &__badgeSize
    @media(max-width: $breakpoint-xs-max)
      font-size: 0.7em
    @media(min-width: $breakpoint-xs-max)
      font-size: 0.9em
  &__no_data
    @media(max-width: $breakpoint-xs-max)
      height: 5em
      width: 6em
    @media(min-width: $breakpoint-xs-max)
      width: 10em
      width: 12em
  &__list_end
    display: flex
    align-items: center
    justify-content: center
    justify-items: center
    white-space: nowrap
    &::before
      left:10px
      content: ''
      display: block
      width: 50%
      height: 1px
      flex-grow: 1
      flex-shrink: 1
      background: linear-gradient(270deg, transparent 0%, #e6e6e6 10%)
    &::after
      right:10px
      content: ''
      display: block
      width: 50%
      height: 1px
      flex-grow: 1
      flex-shrink: 1
      background: linear-gradient(270deg, transparent 0%, #e6e6e6 10%)
  &__endline
    color: #999999
    padding: 0 0.5em
    font-size: 0.8em
</style>

<script>
import { matTurnedInNot } from '@quasar/extras/material-icons';
import { mapState, mapWritableState } from 'pinia';
// import { Screen } from 'quasar';
// import FastClick from 'fastclick';
import { useGoodsStore } from 'stores/goods';
// import { useQuasar } from 'quasar';
import { Loading } from 'quasar';
import { useMeta } from 'quasar';
import { ref } from 'vue';
import { reactive } from 'vue';

// import { createMetaMixin } from 'quasar';

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
      isBigScreen: false,
      isNormal: true,
      fontFamily: 'YL__title_font_family',
      lineHeight: 'YL__list_line_height',
      textAccent: 'text-accent',
      titleHeight: 'YL__title_height',
      isListEnd: false,
      path: '',
      // to: false,
    };
  },
  props: ['query', 'sort', 'page', 'x'],
  computed: {
    ...mapWritableState(useGoodsStore, {
      _listData: 'items',
      _isListEnd: 'isListEnd',
      _max: 'maxPage',
      _userAgent: 'userAgent',
    }),

    paginationSize: function () {
      return this.$q.platform.is.desktop || this.isBigScreen ? '12px' : '9px';
    },

    maxPage: function () {
      return this.$q.platform.is.desktop || this.isBigScreen ? 6 : 4;
    },

    pricePading: function () {
      return this.$q.platform.is.desktop || this.isBigScreen ? 'q-pt-xs q-pb-sm' : 'q-pt-xs';
      // isListEnd: false,
    },

    itemPadding: function () {
      return this.$q.platform.is.desktop || this.isBigScreen ? 'q-py-md' : 'q-py-sm';
    },
    textSize: function () {
      return this.$q.platform.is.desktop || this.isBigScreen ? 'text-h7' : 'text-subtitle1';
    },

    lines: function () {
      return this.$q.platform.is.desktop || this.isBigScreen ? 1 : 2;
    },
    buyButtonSize: function () {
      return this.$q.platform.is.desktop || this.isBigScreen ? '11px' : '8px';
    },
    host: function () {
      return global.config.domain;
    },
    clickable: function () {
      return this.$q.platform.is.desktop || this.isBigScreen ? false : true;
    },
    disable: function () {
      return this.$q.platform.is.desktop || this.isBigScreen || this.isListEnd ? true : false;
    },
    iconGutter: function () {
      return this.$q.platform.is.desktop || this.isBigScreen ? 'q-gutter-md' : 'q-gutter-none';
    },
  },
  // watch: {
  //   $route(to, from) {
  //     this.getItemList();
  //   },
  // },

  // beforeRouteEnter(to, from, next) {
  //   console.log('beforeRouteEnter');
  // if (from.name == 'search' && to.name == 'search') {
  //   console.log('dsd');
  //   this.getItemList();
  //   next();
  // } else {
  //   log.info('ffff');
  //   next();
  // }
  // console.log(vm);
  // console.log(document.documentElement.scrollTop || document.body.scrollTop);
  // next();
  // },

  // beforeCreate() {
  //   this.$q.loading.show({
  //     delay: 400, // ms
  //   });
  // },
  setup() {
    console.log('Index setup');
    const title = ref(
      '好家当 汇聚互联网今日特价 京东，淘宝，天猫，唯品会，支付宝，小米，京喜百元生活费，折扣，优惠券，手慢无，秒杀，低价，优惠信息'
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
        content: 'article',
      },
      ogurl: {
        property: 'og:url',
        content: 'https://mall.hjdang.com/',
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
        content: 'https://mall.hjdang.com/hjd.png',
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
        title: title.value,
        meta: meta,
      };
    });
    // function setAnotherTitle() {
    //   title.value = 'Another title'; // will automatically trigger a Meta update due to the binding
    // }

    // return {
    //   setAnotherTitle,
    // };
  },
  // mixins: [
  //   createMetaMixin(function () {
  //     // "this" here refers to your component
  //     return {
  //       // assuming `this.myTitle` exists in your mixed in component
  //       title: 'xxxxxxxx',
  //     };
  //   }),
  // ],
  // our hook here
  preFetch({ store, currentRoute, previousRoute, redirect, ssrContext, urlPath, publicPath }) {
    console.log('Index prefetch');
    // fetch data, validate route and optionally redirect to some other route...
    if (process.env.SERVER) {
      Loading.show();

      // ssrContext is available only server-side in SSR mode

      // No access to "this" here

      // Return a Promise if you are running an async job
      // Example:
      const myStore = useGoodsStore();
      myStore.userAgent = ssrContext.req.headers['user-agent'];

      console.log(myStore.prefetchFlag);

      myStore.prefetchFlag = 1;

      return myStore.getItemList(
        currentRoute.params.page === undefined ? currentRoute.query.page : currentRoute.params.page,
        currentRoute.params.path,
        currentRoute.query.q,
        currentRoute.query.sort === undefined ? 2 : currentRoute.query.sort
      );
    }

    // return new Promise((resolve) => {
    //   resolve();
    // }).then(() => {
    //   console.log('66666666');

    //   Loading.hide();
    // });

    // return store.dispatch('fetchItem', currentRoute.params.id);
  },
  created() {
    console.log('Index created' + this.$route.fullPath);
    this.listData = this._listData;
    this.max = this._max;
    this.listEnd = this._listEnd;
  },
  mounted() {
    console.log('Index mounted' + this.$route.fullPath);
    const myStore = useGoodsStore();
    console.log('prefetchFlag' + myStore.prefetchFlag);
    let windowWidth = window.screen.width;
    if (windowWidth > 1023.99) {
      this.isBigScreen = true;
    }
    this.path = this.$route.fullPath;
    if (this.$route.params.page != undefined && this.$route.params.page != null) {
      this.current = parseInt(this.$route.params.page);
    }
    if (this.page != null && this.page != undefined) {
      console.log('this page = ' + this.page);
      this.current = parseInt(this.page);
    }
    console.log('this query is' + this.query);
    console.log('this sort is' + this.sort);
    //未执行过prefetch则重新取值
    if (myStore.prefetchFlag === 0) {
      this.getItemList();
    } else {
      myStore.prefetchFlag = 0; //还原是否call到prefetch标志
      console.log(myStore.prefetchFlag);
    }

    // console.log(this.$router.options.scrollBehavior);

    // this.windowWidth = window.innerWidth;
    // window.onresize = () => {
    //   this.windowWidth = window.innerWidth;
    // };
  },
  activated() {
    console.log('Index activated' + this.$route.fullPath);
    console.log('this.isListEnd =' + this.isListEnd);
    this.isListEnd = false;
  },
  deactivated() {
    console.log('Index deactivated' + this.path);
  },
  unmounted() {
    console.log('Index unmounted' + this.path);
    const myStore = useGoodsStore();
    myStore.prefetchFlag = 0; //还原是否call到prefetch标志
    console.log(myStore.prefetchFlag);
  },
  // beforeRouteUpdate(to, from, next) {
  //   console.log('beforeRouteUpdate');

  //   next();
  // },
  methods: {
    myTweak(offset) {
      // "offset" is a Number (pixels) that refers to the total
      // height of header + footer that occupies on screen,
      // based on the QLayout "view" prop configuration

      // this is actually what the default style-fn does in Quasar
      return { minHeight: offset ? `calc(100vh - ${offset}px)` : '100vh' };
    },
    getItemList(sortIndex) {
      // console.log('$$$$$$' + this.query);
      this.$q.loading.show({
        delay: 200, // ms
      });
      this.$axios
        .post(`${global.config.domain}/goods/list`, {
          page: this.current,
          path: this.$route.params.path,
          query: this.$route.query.q,
          sort: sortIndex != null ? sortIndex : this.sort,
        })
        .then((res) => {
          // console.log(res.data.data);
          console.log('index list return');

          this.listData = res.data.data.records;
          if (res.data.data.records.length < 20) {
            this.isListEnd = true;
          }
          this.max = Math.ceil(res.data.data.total / res.data.data.size);

          this.$q.loading.hide();
          if (this.$route.query.x) {
            this.$emit('searchDone');
          }
        });
    },
    //向下划动load页面
    onLoad(index, done) {
      if (this.isBigScreen) {
        return;
      }
      setTimeout(() => {
        console.log('index = .....' + index);
        this.$axios
          .post(`${global.config.domain}/goods/list`, {
            page: index,
            path: this.$route.path,
            query: this.$route.query.q,
            sort: this.sort,
          })
          .then((res) => {
            console.log(res.data.data.records);
            if (res.data.data.records.length < 20) {
              this.isListEnd = true;
            }
            //过滤页面上重复的
            const filters = res.data.data.records.filter((item) => {
              let isDupliate = false;
              for (let key in this.listData) {
                if (this.listData[key].id == item.id) {
                  console.log('this id is duplicate,' + item.id);
                  isDupliate = true;
                  break;
                }
              }
              if (isDupliate) {
                return false;
              } else {
                return true;
              }
            });
            filters.forEach((item) => {
              this.listData.push(item);
            });

            console.log(this.listData);
            done();
          });
      }, 1000);
    },
    //列表下拉刷新
    refresh(done) {
      setTimeout(() => {
        this.getItemList();
        done();
      }, 1000);
    },
    //桌面端的分页
    pageNavigate() {
      console.log('page is ' + this.current);
      if (this.$route.params.path != undefined && this.$route.params.path != null) {
        this.$router.push({
          path: this.$route.path,
          query: { q: this.query, page: this.current },
        });
      } else {
        this.$router.push({
          path: '/list/' + this.current,
          query: { q: this.query },
        });
      }
      // this.$axios
      //   .post(`${global.config.domain}/goods/list`, {
      //     page: this.current,
      //     path: this.$route.path,
      //     query: this.$route.query.q,
      //     sort: this.sort,
      //   })
      //   .then((res) => {
      //     console.log(res.data.data.records);
      //     this.listData = res.data.data.records;
      //     this.max = Math.ceil(res.data.data.total / res.data.data.size);
      //   });
    },
    thumbUpClick() {
      this.thumbUpIcon = 'thumb_up';
    },
    thumbDownClick() {
      this.thumbDownIcon = 'thumb_down';
    },
    turnInOrNotClick() {},
    commentClick() {},
    itemClick(urlCode) {
      console.log('urlCode = ' + urlCode);
      this.$router.push({ path: 'item', name: 'detail', params: { urlCode: urlCode } });
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
    buyClick(code, mall) {
      if (/(京东|淘宝|天猫|聚划算)\W*/g.test(mall) && !this.$q.localStorage.has('userInfo')) {
        this.$q
          .dialog({
            title: '提醒',
            message: '未登陆将以非返利形势购买，继续吗？',
            ok: {
              color: 'accent',
              label: '继续',
            },
            cancel: {
              color: 'accent',
              label: '取消',
            },
            persistent: true,
          })
          .onOk(() => {
            console.log('>>>> OK');
            this.$q.loading.show({
              delay: 100, // ms
            });

            this.$axios
              .post(`${this.host}/goods/go/${code}`, {
                code: '',
              })
              .then((res) => {
                console.log(res.data);
                if (/(http|https):\S*/.test(res.data)) {
                  // window.location.href = res.data;
                  window.open(res.data, '_blank');
                } else if (/redirect:\S*/.test(res.data)) {
                  //redirect其他页面
                  let redirectPath = res.data.slice(9);
                  this.$router.push({ path: redirectPath });
                }
                this.$q.loading.hide();
              });
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

        this.$axios
          .post(`${this.host}/goods/go/${code}`, {
            code: '',
          })
          .then((res) => {
            console.log(res.data);
            if (/(http|https):\S*/.test(res.data)) {
              // window.location.href = res.data;
              window.open(res.data, '_blank');
            } else if (/redirect:\S*/.test(res.data)) {
              //redirect其他页面
              let redirectPath = res.data.slice(9);
              this.$router.push({ path: redirectPath });
            }
            this.$q.loading.hide();
          });
      }
    },
    isWeixin() {
      let ua;
      if (process.env.CLIENT) {
        ua = window.navigator.userAgent.toLowerCase();
      } else {
        ua = this._userAgent.toLowerCase();
      }
      console.log('userAgent = ' + ua);
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
      } else {
        return false;
      }
    },
    transferLabel(label) {
      if (label != '' && label != undefined) {
        // console.log('label = ' + label);
        let labelsArray = JSON.parse(label);
        return labelsArray;
      } else {
        return '';
      }
    },
  },
};
</script>
