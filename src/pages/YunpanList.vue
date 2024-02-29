<template>
  <q-page :style-fn="myTweak">
    <div id="flowAdverYunpanId"></div>
    <q-list separator class="q-pb-lg q-pt-sm">
      <div v-bind:key="item.id" v-for="item in topArticleList" class="q-py-sm">
        <q-item
          dense
          v-ripple
          :to="{
            name: 'articleDetail',
            params: { id: item.id },
          }"
          class="q-py-sm"
        >
          <q-item-section avatar top>
            <q-avatar size="2.0em">
              <img src="david_avatar.png" alt="站长" width="2.0em" height="2.0em" />
            </q-avatar>
          </q-item-section>

          <q-item-section class="q-pb-xs">
            <q-item-label
              :lines="2"
              class="text-black text-bold text-overline"
              v-bind:class="[lineHeight]"
            >
              {{ item.title }}
            </q-item-label>
            <div class="row q-mt-sm" v-if="$q.platform.is.desktop">
              <q-badge color="pink-4" transparent label="置顶" class="col-auto" />
              <div class="col"></div>
            </div>
          </q-item-section>
          <q-item-section class="q-pb-xs" side>
            <q-item-label
              v-if="$q.platform.is.desktop"
              class="row q-pt-sm q-pb-xs q-pr-xs YL__auther"
            >
              <q-btn outline class="text-black" label="点击查看" />
            </q-item-label>
            <div v-else class="row">
              <q-badge color="pink-4" label="置顶" class="col-auto" />
              <div class="col"></div>
            </div>
          </q-item-section>

          <!-- <q-item-section side top> </q-item-section> -->
        </q-item>

        <q-separator inset />
      </div>
    </q-list>

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
          <q-list dense separator>
            <div
              v-bind:key="item.id"
              v-for="item in listData"
              v-bind:class="{ 'q-pb-xs': $q.platform.is.mobile }"
            >
              <!--               
                clickable
                @click="itemClick(item.id)"
              }" -->

              <q-item
                dense
                v-ripple
                :to="{
                  name: 'yunpanDetail',
                  params: { id: item.id },
                }"
                class="q-py-sm"
              >
                <q-item-section avatar top>
                  <q-avatar v-if="item.avatar != '' && item.avatar != null">
                    <img :src="item.avatar" alt="头像" :width="avatarSize" :height="avatarSize" />
                  </q-avatar>

                  <q-avatar :style="getAvatarColor(item.auther)" text-color="white" v-else>
                    {{ getAvatarText(item.auther) }}
                  </q-avatar>
                </q-item-section>

                <q-item-section class="q-pb-xs">
                  <q-item-label
                    :lines="2"
                    v-bind:class="[fontFamily, lineHeight, titleHeight]"
                    class="text-black text-subtitle2 text-weight-bold"
                  >
                    {{ item.title }}
                  </q-item-label>

                  <q-item-label
                    class="row justify-between items-center q-pt-sm q-pb-xs q-pr-xs YL__auther"
                  >
                    <div class="col-auto row flex-center q-gutter-sm">
                      <div class="row flex-center">
                        <strong>{{ item.auther }}</strong>

                        <q-icon name="reply" />
                      </div>

                      <div class="row flex-center">发表于 {{ item.itemCreateDateStr }}</div>

                      <!-- <div class="row flex-center">
                        {{ item.lastPostDateStr }}
                      </div>

                      <div class="row flex-center">
                        <div>{{ item.viewCount }}</div>
                      </div> -->
                    </div>

                    <div class="col items-center justify-end row">
                      <q-chip
                        outline
                        :size="chipSize"
                        :color="getTagColor(item.tag)"
                        :icon="getTagIcon(item.tag)"
                        text-color="white"
                        class="text-bold"
                      >
                        {{ item.tag }}
                      </q-chip>
                    </div>
                  </q-item-label>
                </q-item-section>

                <!-- <q-item-section side top> </q-item-section> -->
              </q-item>

              <q-separator spaced />
            </div>
          </q-list>
        </q-pull-to-refresh>
        <!-- <div class="adsenseunitlist">
          <ins
            class="adsbygoogle"
            style="display: block"
            data-ad-format="fluid"
            data-ad-layout-key="-ho-l+13-3s+9g"
            data-ad-client="ca-pub-3935005489954231"
            data-ad-slot="2761528811"
          ></ins>
        </div> -->

        <template v-slot:loading>
          <div v-bind:class="{ hidden: !pageNavigateHidden }" class="row justify-center q-my-md">
            <q-spinner-dots color="accent" size="40px"></q-spinner-dots>
          </div>
        </template>
      </q-infinite-scroll>
      <div class="YL__list_end q-mb-sm" v-bind:class="{ hidden: !isListEnd }">
        <span class="YL__endline">我是有底线的</span>
      </div>
      <div
        v-bind:class="{ hidden: pageNavigateHidden }"
        class="q-my-xs q-pa-md flex flex-center bg-light-green-1"
      >
        <q-tooltip> 输入页码跳转</q-tooltip>

        <q-pagination
          gutter="sm"
          input
          :input-class="'text-dark'"
          v-model="current"
          :size="paginationSize"
          color="purple"
          :max="max"
          glossy
          :max-pages="maxPage"
          boundary-numbers
          @update:model-value="pageNavigate"
        >
        </q-pagination>
      </div>
    </div>
  </q-page>
</template>

<style lang="sass">
.YL
  &__auther
    @media(max-width: $breakpoint-xs-max)
      font-size: 0.75em
      height: 2.1em
    @media(min-width: $breakpoint-xs-max)
      font-size: 0.9em
      height: 2.6em
    color: rgba(0, 0, 0, 0.54)
    line-height: 1.2em
  &__title_height
    @media(max-width: $breakpoint-xs-max)
      height: 2.9em
    @media(min-width: $breakpoint-xs-max)
      height: 3.2em
  &__list_line_height
    line-height: 1.6em !important
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
  &__title_font_family
    font-family: PingFangSC-Medium,Dosis,Open Sans,helvetica neue,-apple-system,arial,hiragino sans gb,microsoft yahei ui,microsoft yahei,simsun,sans-serif
ins.adsbygoogle[data-ad-status="unfilled"]
  display: none !important
</style>

<script>
// import { Screen } from 'quasar';
// import 'src/config';
import { useYunpanStore } from 'stores/yunpan.js';
import { mapWritableState } from 'pinia';
import { Loading } from 'quasar';
import { useMeta } from 'quasar';
import { ref } from 'vue';
import { reactive } from 'vue';
import { useQuasar } from 'quasar';

export default {
  name: 'YunpanList',
  data() {
    return {
      sort: 1,
      listData: [],
      topArticleList: [],
      current: 1,
      max: 6,
      isBigScreen: false,
      isNormal: true,
      fontFamily: 'YL__title_font_family',
      lineHeight: 'YL__list_line_height',
      textAccent: 'text-accent',
      // paginationSize: Screen.gt.sm ? '18px' : '15px',
      // maxPage: Screen.gt.sm ? 6 : 4,
      titleHeight: 'YL__title_height',
      // pricePading: Screen.gt.sm ? 'q-pt-xs q-pb-sm' : 'q-pt-xs',
      isListEnd: false,
      pageNavigateHidden: true,
      stopLoading: false,
      loadTimes: 0,
      gapIndex: 0, //refersh之前的load次数
      pageParams: null,
      adverPlay: null, //防止信息流广告重复播放
      category: this.$route.params.category,
      timer: null,
      // category: '',
      // to: false,
    };
  },
  props: ['query', 'page', 'x', 'idForLogin'],
  emits: ['need-login', 'logined'],

  computed: {
    ...mapWritableState(useYunpanStore, {
      _listData: 'items',
      _topArticleList: 'topArticleList',
      _isListEnd: 'isListEnd',
      _pageNavigateHidden: 'pageNavigateHidden',
      _stopLoading: 'stopLoading',
      _max: 'max',
      _userAgent: 'userAgent',
    }),
    detailPageName() {
      if (!this.isBigScreen && !this.isWeixin()) {
        return 'yunpanDetailShare';
      } else {
        return 'yunpanDetail';
      }
    },
    paginationSize() {
      return this.$q.platform.is.desktop ? '18px' : '15px';
    },
    maxPage() {
      return this.$q.platform.is.desktop ? 6 : 4;
    },
    pricePading() {
      return this.$q.platform.is.desktop ? 'q-pt-xs q-pb-sm' : 'q-pt-xs';
    },
    // pageNavigateHidden() {
    //   return !this.isBigScreen;
    // },
    itemPadding: function () {
      return this.$q.platform.is.desktop ? 'q-py-md' : 'q-py-sm';
    },
    textSize: function () {
      return this.$q.platform.is.desktop ? 'text-subtitle2' : 'text-subtitle2';
    },
    topArticleSize: function () {
      return this.$q.platform.is.desktop ? 'text-body2' : 'text-overline';
    },

    host: function () {
      return global.config.domain;
    },
    // clickable: function () {
    //   return this.isBigScreen ? false : true;
    // },
    disable: function () {
      return this.$q.platform.is.desktop || this.isListEnd || this.stopLoading;
    },

    getTagColor: function () {
      return (parameter) => {
        if (parameter == '影视') {
          return 'pink-4';
        } else if (parameter == '动漫') {
          return 'blue-5';
        } else if (parameter == '图片') {
          return 'orange-5';
        } else if (parameter == '游戏/软件') {
          return 'purple-4';
        } else if (parameter == '学习') {
          return 'teal-5';
        } else if (parameter == '音乐/音频') {
          return 'indigo-5';
        } else if (parameter == '日常') {
          return 'light-green-6';
        } else if (parameter == '求资源') {
          return 'blue-grey-6';
        } else if (parameter == '书籍') {
          return 'brown-5';
        } else {
          return 'lime-8';
        }
      };
    },

    getTagIcon: function () {
      return (parameter) => {
        if (parameter == '影视') {
          return 'movie';
        } else if (parameter == '动漫') {
          return 'tv';
        } else if (parameter == '图片') {
          return 'image';
        } else if (parameter == '游戏/软件') {
          return 'sports_esports';
        } else if (parameter == '学习') {
          return 'book';
        } else if (parameter == '音乐/音频') {
          return 'music_note';
        } else if (parameter == '日常') {
          return 'nightlife';
        } else if (parameter == '求资源') {
          return 'help';
        } else if (parameter == '书籍') {
          return 'book';
        } else {
          return 'eco';
        }
      };
    },

    getAvatarColor: function () {
      return (parameter) => {
        return 'background-color:#' + this.getHashCode(parameter, true).toString(16).substr(0, 6);
      };
    },
    getAvatarText: function () {
      return (parameter) => {
        return parameter.slice(0, 1);
      };
    },
    avatarSize: function () {
      return this.$q.platform.is.desktop ? '2.7em' : '2.3em';
    },
    chipSize: function () {
      return this.$q.platform.is.desktop ? 'sm' : '0.70em';
    },
  },
  setup() {
    console.log('Yunpan List setup');
    const $q = useQuasar();
    let platform = '';
    if ($q.platform.is.mobile) {
      platform = 'mobile';
    } else {
      platform = 'pc';
    }
    const title = ref('好家当 - 最新阿里云盘,夸克网盘资源发布');
    const meta = reactive({
      description: {
        name: 'description',
        content:
          '最新阿里云盘,夸克网盘,迅雷云盘资源发布,4k,1080p高清影视,动漫,综艺节目,游戏,软件,音乐,学习资料,电子书,图片等应有尽有,实现你的网盘自由',
      },
      keywords: {
        name: 'keywords',
        content: '阿里云盘,夸克网盘,迅雷云盘,资源下载,4k,1080p,高清影视,动漫,学习资源',
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
        content: 'https://www.hjdang.com/list?q=',
      },
      ogtitle: {
        property: 'og:title',
        content: '好家当 - 最新阿里云盘,夸克网盘资源发布',
      },
      ogdescription: {
        property: 'og:description',
        content:
          '最新阿里云盘,夸克网盘,迅雷云盘资源发布.4k,1080p高清影视,动漫,综艺节目,游戏,软件,音乐,学习资料,电子书,图片等应有尽有,实现你的网盘自由',
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

    useMeta({
      title: title.value,
      meta: meta,
    });
  },
  // our hook here
  preFetch({ store, currentRoute, previousRoute, redirect, ssrContext, urlPath, publicPath }) {
    console.log('YunpanList prefetch');
    // fetch data, validate route and optionally redirect to some other route...
    if (process.env.SERVER) {
      Loading.show();

      // ssrContext is available only server-side in SSR mode

      // No access to "this" here

      // Return a Promise if you are running an async job
      // Example:
      const myStore = useYunpanStore();
      console.log(myStore.prefetchFlag);

      myStore.prefetchFlag = 1;
      myStore.userAgent = ssrContext.req.headers['user-agent'];

      return myStore.getItemList(
        currentRoute.params.page === undefined ? currentRoute.query.page : currentRoute.params.page,
        currentRoute.query.q,
        currentRoute.params.category,
        currentRoute.query.x,
        redirect
      );
    }
  },

  created() {
    console.log('YunpanList created');
    this.listData = this._listData;
    this.isListEnd = this._isListEnd;
    this.topArticleList = this._topArticleList;
    this.max = this._max;
    this.pageNavigateHidden = this._pageNavigateHidden;
    this.stopLoading = this._stopLoading;
  },

  mounted() {
    console.log('YunpanList mounted' + this.category);
    let windowWidth = window.screen.width;
    if (windowWidth > 1023.99) {
      this.isBigScreen = true;
      this.pageNavigateHidden = false;
    }
    this.$bus.on('logined', function (itemId) {
      console.log('我是子组件方法' + itemId);
      this.$router.push({
        path: '/d/' + itemId,
      });
    });
    //在yunpanDetail页面上需要登陆
    if (this.idForLogin) {
      //通知父组件
      this.$emit('need-login', this.idForLogin);
    }
    console.log(' this.$route.path ' + this.$route.path);
    if (this.$route.params.page != undefined && this.$route.params.page != null) {
      console.log('page = ' + this.$route.params.page);
      this.pageParams = parseInt(this.$route.params.page);
      this.current = parseInt(this.$route.params.page);
    }

    if (this.page != null && this.page != undefined) {
      console.log('this page = ' + this.page);
      this.pageParams = parseInt(this.page);
      this.current = parseInt(this.page);
    }

    // if (this.$route.params.category != undefined && this.$route.params.category != null) {
    //   this.category = this.$route.params.category;
    //   console.log('category = ' + this.$route.params.category);
    // }
    // if (this.tag != undefined && this.tag != null) {
    //   console.log('tag =' + this.tag);
    //   this.category = this.tag;
    //   // console.log('parent =' + this.$parent.name);
    //   // this.$parent.$parent.categoryTab = this.tag;
    // }
    const yunpanStore = useYunpanStore();
    if (yunpanStore.prefetchFlag === 0 || this.listData.length === 0) {
      this.getItemList();
    } else {
      yunpanStore.prefetchFlag = 0; //还原是否call到prefetch标志
    }

    // if (this.topArticleList.length === 0) {
    //   this.getTopArticleList();
    // }

    //启动谷歌unit广告
    // if (window.adsbygoogle == undefined) {
    //   this.timer = window.setInterval(() => {
    //     console.log('adsbygoogle delay 400ms - list');

    //     if (window.adsbygoogle) {
    //       window.clearInterval(this.timer); //清除定时器
    //       let adsenseUnitLength = document.getElementsByClassName('adsenseunitlist');
    //       for (let i = 0; i < adsenseUnitLength.length; i++) {
    //         (adsbygoogle = window.adsbygoogle || []).push({});
    //       }
    //       console.log('list adsense loaded');
    //     }
    //   }, 400);
    // } else {
    //   let adsenseUnitLength = document.getElementsByClassName('adsenseunitlist');

    //   for (let i = 0; i < adsenseUnitLength.length; i++) {
    //     (adsbygoogle = window.adsbygoogle || []).push({});
    //   }
    //   console.log('list adsense loaded');
    // }
    // let container = document.getElementById('flowAdverYunpanId');
    // console.log('container = ' + container);
    // 如果不是搜索结果播放模版广告
    // if (this.x == undefined || this.x == null) {
    //   if (process.env.PROD) {
    //     if (this.adverPlay == null) {
    //       window.AdverNativeTemplate = true;
    //       setTimeout(function () {
    //         window.TencentGDT.NATIVE.loadAd('5004894439792983');
    //       }, 1500);
    //       this.adverPlay = true;
    //     }

    // if (window.AdverNativeTemplate != undefined && window.AdverNativeTemplate != null) {
    //   window.TencentGDT.NATIVE.renderAd(window.AdverNativeTemplate, 'flowAdverYunpanId');
    //   TencentGDT.NATIVE.loadAd('9094884362628825');

    //   this.adverPlay = true;
    // } else {
    //   setTimeout(() => {
    //     if (window.AdverNativeTemplate != undefined && window.AdverNativeTemplate != null) {
    //       window.TencentGDT.NATIVE.renderAd(window.AdverNativeTemplate, 'flowAdverYunpanId');
    //       TencentGDT.NATIVE.loadAd('9094884362628825');

    //       this.adverPlay = true;
    //     } else {
    //       console.log('AdverNativeTemplate not init after wait 1.5s');
    //     }
    //     console.log('wait 1.5s AdverNativeTemplate');
    //   }, 1500);
    // }
    // }
    // }
  },
  activated() {
    console.log('YunpanList activated ' + this.category);
    console.log('this.isListEnd =' + this.isListEnd);
    // if (this.x === undefined || this.x === null) {
    //   if (process.env.PROD) {
    //     if (this.adverPlay == null) {
    //       window.AdverNativeTemplate = true;
    //       setTimeout(function () {
    //         window.TencentGDT.NATIVE.loadAd('5004894439792983');
    //       }, 1500);
    //       this.adverPlay = true;
    //     }

    //     // if (window.AdverNativeTemplate != undefined && window.AdverNativeTemplate != null) {
    //     //   window.TencentGDT.NATIVE.renderAd(window.AdverNativeTemplate, 'flowAdverYunpanId');
    //     //   TencentGDT.NATIVE.loadAd('9094884362628825');

    //     //   this.adverPlay = true;
    //     // }
    //   }
    // }

    this.isListEnd = false;
  },
  deactivated() {
    console.log('YunpanList deactivated' + this.category);
    this.adverPlay = null;
  },

  unmounted() {
    console.log('YunpanList unmounted' + this.category);
    const yunpanStore = useYunpanStore();
    yunpanStore.prefetchFlag = 0; //还原是否call到prefetch标志
  },

  methods: {
    myTweak(offset) {
      // "offset" is a Number (pixels) that refers to the total
      // height of header + footer that occupies on screen,
      // based on the QLayout "view" prop configuration

      // this is actually what the default style-fn does in Quasar
      return { minHeight: offset ? `calc(100vh - ${offset}px)` : '100vh' };
    },
    getTopArticleList() {
      // 取top article
      this.$axios.post(`${global.config.domain}/yunpan/top/article/list`, {}).then((res) => {
        this.topArticleList = res.data.data;
      });
    },
    getItemList() {
      // console.log('$$$$$$' + this.query);
      this.$q.loading.show({
        delay: 400, // ms
      });

      this.$axios
        .post(`${global.config.domain}/yunpan/resource/list`, {
          page: this.current,
          tag: this.$route.params.category,
          query: this.query,
          sort: this.sort,
        })
        .then((res) => {
          // console.log(res.data.data);
          if (res.data.code < 0) {
            redirect({ path: '/error/404' }, 301);
          } else {
            this.listData = res.data.data.records;
            this.topArticleList = res.data.data.yunpanTopArticleList;
            this.max = Math.ceil(res.data.data.total / res.data.data.size);
            if (res.data.data.records.length < 30 || this.$route.params.page >= this.max) {
              this.isListEnd = true;
              this.pageNavigateHidden = false;
              this.stopLoading = true;
            }
            this.$axios.post(`${global.config.domain}/yunpan/top/article/list`, {}).then((res) => {
              this.topArticleList = res.data.data;
            });
            //只有点击‘搜索’才记录关键词
            if (this.x !== undefined && this.x != null) {
              this.$axios
                .post(`${global.config.domain}/yunpan/search/log`, {
                  searchKeyword: this.query,
                  total: res.data.data.total,
                  x: this.x,
                })
                .then((res) => {
                  console.log(res.data.data);
                });
            }
            if (this.$route.query.x) {
              this.$emit('searchDone');
            }
          }

          console.log('hidden = ' + this.pageNavigateHidden);
          console.log('this.current  = ' + this.current);
          console.log('this.isListEnd  = ' + this.isListEnd);
          this.$q.loading.hide();
        });
    },
    //向下划动load页面
    onLoad(index, done) {
      console.log('index = .....' + index);
      console.log('gap = .....' + this.gapIndex);
      this.loadTimes = index - 1;

      if (this.pageParams == null) {
        this.current = index - this.gapIndex;
      } else {
        this.current = this.pageParams + this.loadTimes - this.gapIndex; //需要减去refersh之前的load次数
      }
      console.log(' this.current is ' + this.current);

      if (this.isBigScreen) {
        return;
      }
      if (parseInt(this.loadTimes - this.gapIndex) % 3 == 0) {
        this.pageNavigateHidden = false;
        this.stopLoading = true;
        done();
      } else {
        this.pageNavigateHidden = true;
        this.stopLoading = false;
        setTimeout(() => {
          this.$axios
            .post(`${global.config.domain}/yunpan/resource/list`, {
              page: this.current,
              tag: this.$route.params.category,
              query: this.query,
              sort: this.sort,
            })
            .then((res) => {
              // console.log(res.data.data.records);
              if (res.data.data.records.length < 30) {
                this.isListEnd = true;
                this.pageNavigateHidden = false;
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
              if (this.current >= this.max) {
                this.isListEnd = true;
                this.pageNavigateHidden = false;
                this.stopLoading = true;
              }
              // console.log(this.listData);
              done();
            });
        }, 1000);
      }
    },
    //列表下拉刷新
    refresh(done) {
      setTimeout(() => {
        this.gapIndex = this.loadTimes;
        this.pageNavigateHidden = true;
        this.stopLoading = false;
        if (this.$route.params.page != undefined && this.$route.params.page != null) {
          this.current = parseInt(this.$route.params.page);
        } else {
          this.current = 1;
        }

        this.getItemList();
        done();
      }, 1000);
    },
    //桌面端的分页
    pageNavigate() {
      // if (this.isBigScreen) {
      //   this.$axios
      //     .post(`${global.config.domain}/yunpan/resource/list`, {
      //       page: this.current,
      //       tag: this.$route.params.category,
      //       query: this.query,
      //       sort: this.sort,
      //     })
      //     .then((res) => {
      //       // console.log(res.data.data.records);
      //       this.listData = res.data.data.records;
      //       this.max = Math.ceil(res.data.data.total / res.data.data.size);
      //     });
      // } else {
      if (this.$route.params.category != undefined && this.$route.params.category != null) {
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
      // }
    },

    // itemClick(itemId) {
    //   if (this.isWeixin()) {
    //     this.$router.push({
    //       path: '/yunpan/d/' + itemId,
    //     });
    //   } else {
    //     this.$axios.post(`${global.config.domain}/user/islogin`, {}).then((res) => {
    //       console.log(res.data.data);
    //       if (res.data.data == true) {
    //         this.$router.push({
    //           path: '/yunpan/d/' + itemId,
    //         });
    //       } else {
    //         //通知父组件
    //         this.$emit('need-login', itemId);
    //       }
    //     });
    //   }
    // },
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
    getHashCode(str, caseSensitive) {
      if (str == null || str == undefined) {
        return;
      }
      if (!caseSensitive) {
        str = str.toLowerCase();
      }
      var hash = 1315423911,
        i,
        ch;
      for (i = str.length - 1; i >= 0; i--) {
        ch = str.charCodeAt(i);
        hash ^= (hash << 5) + ch + (hash >> 2);
      }
      return hash & 0x7fffffff;
    },
  },
};
</script>
