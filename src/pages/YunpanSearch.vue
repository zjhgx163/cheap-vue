<template>
  <q-page :style-fn="myTweak">
    <div id="flowAdverYunpanId"></div>

    <div v-if="listData.length === 0" class="column items-center justify-center">
      <div class="column YL__no_data flex-center">
        <q-img src="/static/no-data.png" spinner-color="white" alt="空空如也～"> </q-img>

        <div class="text-subtitle2 text-center text-grey">~空空如也~</div>
      </div>

      <!-- <div class="col-3"></div> -->
    </div>

    <div v-else ref="scrollTargetRef">
      <!--   当使用:scroll-target 时，被指定的container必须要有 style="overflow: auto; max-height: 3000px" -->

      <q-infinite-scroll @load="onLoad" :offset="250" :initial-index="1" :disable="disable">
        <q-pull-to-refresh @refresh="refresh" no-mouse>
          <q-list dense class="q-pt-md">
            <div
              v-bind:key="item._formatted.id"
              v-for="item in listData"
              v-bind:class="{ 'q-pb-xs q-pl-md': $q.platform.is.mobile }"
            >
              <q-item
                v-ripple
                :to="{
                  name: 'yunpanDetail',
                  params: { id: item._formatted.id },
                }"
              >
                <q-item-section thumbnail top v-if="$q.platform.is.mobile">
                  <img :src="getThumbnail(item)" style="max-width: 48px; height: 72px" />
                </q-item-section>

                <q-item-section class="q-pb-xs">
                  <q-item-label v-bind:class="[fontFamily, lineHeight]">
                    <span :class="['text-weight-thin', getTagColorClass(item.tag)]"
                      >[{{ item.tag }}]
                    </span>
                    <span v-html="item._formatted.title"></span>
                  </q-item-label>

                  <q-item-label :lines="3">
                    <div
                      class="text-caption"
                      v-html="item._formatted.content"
                      style="color: rgba(0, 0, 0, 0.54)"
                    ></div>
                  </q-item-label>

                  <q-item-label class="row justify-between items-center q-py-xs q-pr-xs YL__auther">
                    <div class="col-auto row flex-center q-gutter-sm">
                      <q-icon name="calendar_month" />
                      <div class="row flex-center">
                        {{ getTimeStr(item._formatted.releasDateTimestamp) }}
                      </div>
                    </div>
                    <div class="row col q-gutter-sm justify-end items-center">
                      <q-chip
                        outline
                        :size="chipSize"
                        :color="getTagColor(item.tag)"
                        v-bind:key="k"
                        v-for="k in item.keywords"
                        >{{ getPanName(k) }}</q-chip
                      >
                    </div>
                  </q-item-label>
                </q-item-section>

                <q-item-section thumbnail top v-if="$q.platform.is.desktop">
                  <img :src="getThumbnail(item)" style="max-width: 48px; height: 72px" />
                </q-item-section>
              </q-item>
              <q-separator spaced inset="item" />
            </div>
          </q-list>
        </q-pull-to-refresh>

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
  &__title_height
    @media(max-width: $breakpoint-xs-max)
      height: 2.9em
    @media(min-width: $breakpoint-xs-max)
      height: 3.2em
  &__list_line_height
    line-height: 1.6em !important
  &__no_data
    min-height: 500px
    @media(max-width: $breakpoint-xs-max)
      width: 6em
    @media(min-width: $breakpoint-xs-max)
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
  name: 'YunpanSearch',
  data() {
    return {
      sort: 1,
      listData: [],
      current: 1,
      max: 6,
      isBigScreen: false,
      isNormal: true,
      fontFamily: 'YL__title_font_family',
      lineHeight: 'YL__list_line_height',
      textAccent: 'text-accent',
      titleHeight: 'YL__title_height',
      isListEnd: false,
      pageNavigateHidden: true,
      stopLoading: false,
      loadTimes: 0,
      gapIndex: 0, //refersh之前的load次数
      pageParams: null,
    };
  },
  props: ['keyword', 'page', 'x'],
  emits: ['need-login', 'logined'],

  computed: {
    ...mapWritableState(useYunpanStore, {
      _listData: 'items',
      _isListEnd: 'isListEnd',
      _pageNavigateHidden: 'pageNavigateHidden',
      _stopLoading: 'stopLoading',
      _max: 'max',
      _userAgent: 'userAgent',
    }),

    paginationSize() {
      return this.$q.platform.is.desktop ? '18px' : '15px';
    },
    maxPage() {
      return this.$q.platform.is.desktop ? 6 : 4;
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

    getTagColorClass: function () {
      return (parameter) => {
        if (parameter == '影视') {
          return 'text-pink-4';
        } else if (parameter == '动漫') {
          return 'text-blue-5';
        } else if (parameter == '图片') {
          return 'text-deep-orange-4';
        } else if (parameter == '游戏/软件') {
          return 'text-purple-4';
        } else if (parameter == '学习') {
          return 'text-lime-9';
        } else if (parameter == '音乐/音频') {
          return 'text-indigo-5';
        } else if (parameter == '日常') {
          return 'text-light-green-6';
        } else if (parameter == '求资源') {
          return 'text-blue-grey-6';
        } else if (parameter == '书籍') {
          return 'text-brown-5';
        } else {
          return 'text-teal-5';
        }
      };
    },

    getTagColor: function () {
      return (parameter) => {
        if (parameter == '影视') {
          return 'pink-4';
        } else if (parameter == '动漫') {
          return 'blue-5';
        } else if (parameter == '图片') {
          return 'deep-orange-4';
        } else if (parameter == '游戏/软件') {
          return 'purple-4';
        } else if (parameter == '学习') {
          return 'lime-9';
        } else if (parameter == '音乐/音频') {
          return 'indigo-5';
        } else if (parameter == '日常') {
          return 'light-green-6';
        } else if (parameter == '求资源') {
          return 'blue-grey-6';
        } else if (parameter == '书籍') {
          return 'brown-5';
        } else {
          return 'teal-5';
        }
      };
    },

    getTimeStr: function () {
      return (parameter) => {
        const date = new Date(parameter * 1000);
        const time =
          date.getFullYear() +
          '-' +
          String(date.getMonth() + 1).padStart(2, '0') +
          '-' +
          String(date.getDate()).padStart(2, '0') +
          ' ' +
          String(date.getHours()).padStart(2, '0') +
          ':' +
          String(date.getMinutes()).padStart(2, '0') +
          ':' +
          String(date.getSeconds()).padStart(2, '0');
        return time;
      };
    },

    getThumbnail: function () {
      return (parameter) => {
        if (parameter.thumbnaiImgs) {
          return parameter.thumbnaiImgs[0];
        } else if (parameter.imgs) {
          return parameter.imgs[0];
        } else {
          return '/no_pic.png';
        }
      };
    },

    getPanName: function (parameter) {
      return (parameter) => {
        if (parameter === '百度网盘') {
          return '百度';
        } else if (parameter === '夸克网盘') {
          return '夸克';
        } else if (parameter === 'UC网盘') {
          return 'UC';
        } else if (parameter === '迅雷云盘') {
          return '迅雷';
        } else if (parameter === '阿里云盘') {
          return '阿里';
        } else {
          return '网盘';
        }
      };
    },

    thumbnailSize: function () {
      return this.$q.platform.is.desktop ? '3em' : '2em';
    },
    chipSize: function () {
      return this.$q.platform.is.desktop ? 'sm' : '0.65em';
    },
  },
  setup() {
    console.log('YunpanSearch setup');
    const $q = useQuasar();
    let platform = '';
    if ($q.platform.is.mobile) {
      platform = 'mobile';
    } else {
      platform = 'pc';
    }
    const title = ref('好家当资源搜索-最新网盘资源下载');
    const meta = reactive({
      description: {
        name: 'description',
        content:
          '好家当-最新百度网盘、夸克网盘、阿里云盘、UC网盘、迅雷云盘资源发布-4k、1080p高清影视、动漫、综艺节目、游戏、软件、音乐、学习资料、电子书、图片，网盘资源搜索，每天更新最新资源',
      },
      keywords: {
        name: 'keywords',
        content:
          '好家当,百度网盘资源下载,夸克网盘资源下载,阿里云盘资源下载,UC网盘资源下载,迅雷云盘资源下载,网盘资源搜索,最新网盘资源发布,4k,1080p',
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
        content: 'https://www.hjdang.com',
      },
      ogtitle: {
        property: 'og:title',
        content: '好家当-最新网盘资源下载',
      },
      ogdescription: {
        property: 'og:description',
        content:
          '好家当-最新百度网盘、夸克网盘、阿里云盘、UC网盘、迅雷云盘资源发布-4k、1080p高清影视、动漫、综艺节目、游戏、软件、音乐、学习资料、电子书、图片，网盘资源搜索，每天更新最新资源',
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
      title,
    };
  },
  // our hook here
  preFetch({ store, currentRoute, previousRoute, redirect, ssrContext, urlPath, publicPath }) {
    console.log('YunpanSearch prefetch');
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

      return myStore.search(
        currentRoute.params.page === undefined ? currentRoute.query.page : currentRoute.params.page,
        currentRoute.query.q,
        currentRoute.query.x,
        redirect
      );
    }
  },

  created() {
    console.log('YunpanSearch created');
    const yunpanStore = useYunpanStore();

    if (yunpanStore.prefetchFlag == 1) {
      this.listData = this._listData;
      this.isListEnd = this._isListEnd;
      this.max = this._max;
      this.pageNavigateHidden = this._pageNavigateHidden;
      this.stopLoading = this._stopLoading;
    }

    this.setAnotherTitle(this.keyword + '-' + this.title);
    this.meta.keywords.content = this.keyword + '搜索,' + this.meta.keywords.content;
    this.meta.description.content = this.keyword + '资源搜索' + '-' + this.meta.description.content;
    this.meta.ogtitle.content = this.keyword + '-' + this.title;
    this.meta.ogdescription.content = this.meta.description.content;
  },

  mounted() {
    console.log('YunpanSearch mounted');
    console.log(this.keyword);
    console.log('xxxxxxxxxxxxxxx');
    let windowWidth = window.screen.width;
    if (windowWidth > 1023.99) {
      this.isBigScreen = true;
      this.pageNavigateHidden = false;
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

    const yunpanStore = useYunpanStore();
    if (yunpanStore.prefetchFlag === 0 || this.listData.length === 0) {
      this.doSearch();
    } else {
      yunpanStore.prefetchFlag = 0; //还原是否call到prefetch标志
    }
  },
  activated() {
    console.log('YunpanSearch activated ');
    console.log('this.isListEnd =' + this.isListEnd);

    this.isListEnd = false;
  },
  deactivated() {
    console.log('YunpanSearch deactivated');
  },

  unmounted() {
    console.log('YunpanSearch unmounted');
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

    doSearch() {
      this.$q.loading.show({
        delay: 100, // ms
      });

      this.$axios
        .post(`${global.config.domain}/yunpan/search`, {
          page: this.current,
          query: this.keyword,
        })
        .then((res) => {
          console.log(res.data.data.hits);
          if (res.data.code < 0) {
            redirect({ path: '/error/404' }, 301);
          } else {
            this.listData = res.data.data.hits;
            this.max = res.data.data.totalPages;
            if (this.listData.length < 30 || this.$route.params.page >= this.max) {
              this.isListEnd = true;
              this.pageNavigateHidden = false;
              this.stopLoading = true;
            }

            //只有点击‘搜索’才记录关键词
            if (this.x !== undefined && this.x != null) {
              this.$axios
                .post(`${global.config.domain}/yunpan/search/log`, {
                  searchKeyword: this.keyword,
                  total: res.data.data.total,
                  x: this.x,
                })
                .then((res) => {
                  console.log(res.data.data);
                });
            }
            this.$emit('searchDone');
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
            .post(`${global.config.domain}/yunpan/search`, {
              page: this.current,
              query: this.keyword,
            })
            .then((res) => {
              // console.log(res.data.data.records);
              if (res.data.data.hits.length < 30) {
                this.isListEnd = true;
                this.pageNavigateHidden = false;
              }

              //过滤页面上重复的
              const filters = res.data.data.hits.filter((item) => {
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

        this.doSearch();
        done();
      }, 1000);
    },
    //桌面端的分页
    pageNavigate() {
      this.$q.loading.show({
        delay: 100, // ms
      });

      this.$axios
        .post(`${global.config.domain}/yunpan/search`, {
          page: this.current,
          query: this.keyword,
        })
        .then((res) => {
          console.log(res.data.data.hits);
          if (res.data.code < 0) {
            redirect({ path: '/error/404' }, 301);
          } else {
            this.listData = res.data.data.hits;
            this.max = res.data.data.totalPages;
            if (this.listData.length < 30 || this.$route.params.page >= this.max) {
              this.isListEnd = true;
              this.pageNavigateHidden = false;
              this.stopLoading = true;
            }
          }

          this.$q.loading.hide();
        });
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
