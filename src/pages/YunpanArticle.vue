<template>
  <q-page class="bg-secondary">
    <div class="row">
      <!-- 详情页 -->
      <div class="col row bg-primary">
        <div class="col column">
          <div class="col q-pa-sm bg-secondary">
            <q-item dense class="YL__return q-pt-none q-mt-xs">
              <q-item-label class="flex-center row">
                <q-icon name="keyboard_return" color="pink-4" />
                <span> &nbsp;&nbsp;</span>
                <router-link
                  class="text-pink-4"
                  style="text-decoration: underline"
                  :to="{
                    path: '/',
                  }"
                >
                  返回资源列表
                </router-link>
              </q-item-label>
            </q-item>
            <q-item dense>
              <q-item-section>
                <q-item-label :lines="2">
                  <h1 class="text-h6 text-bold q-mt-none q-mb-sm">
                    <!-- , YL__invalid_item: isInvalid -->
                    {{ item.title }}

                    <q-badge color="pink-4" label="置顶" />
                  </h1>
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item class="items-center">
              <q-item-section avatar style="min-width: 30px">
                <q-avatar size="1.9em">
                  <img src="david_avatar.png" alt="站长" />
                </q-avatar>
              </q-item-section>
              <q-item-section class="YL__auther"> 老胡 本人 </q-item-section>
              <q-item-section class="YL__auther">
                <!-- {{ item.itemCreateDate }} -->
              </q-item-section>
            </q-item>
            <q-item dense>
              <q-item-section>
                <q-item-label>
                  <div class="text-body2 Post-body break-all" v-html="item.content"></div>
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-separator inset />

            <div class="q-pt-sm" ref="scrollYunpanDetailtRef">
              <!--   当使用:scroll-target 时，被指定的container必须要有 style="overflow: auto; max-height: 3000px" -->
              <q-infinite-scroll @load="onLoad" :offset="250" :initial-index="1" :disable="disable">
                <q-pull-to-refresh @refresh="refresh" no-mouse>
                  <q-item>
                    <div class="text-bold text-body2">最新回复</div>
                  </q-item>
                  <q-list dense separator class="bg-secondary">
                    <div v-bind:key="reply.id" v-for="reply in listData" class="bg-primary">
                      <!-- 这里q-item 不加to，因为加上to会导致pc端整个变成可点击 -->
                      <q-item dense v-ripple class="bg-secondary q-py-sm">
                        <q-item-section avatar top>
                          <q-avatar
                            v-if="reply.replyAvatar != '' && reply.replyAvatar != null"
                            size="1.9em"
                          >
                            <img :src="reply.replyAvatar" :alt="reply.replyAuther" />
                          </q-avatar>
                          <q-avatar
                            size="1.9em"
                            :style="getAvatarColor(reply.replyAuther)"
                            text-color="white"
                            v-else
                          >
                            {{ getAvatarText(reply.replyAuther) }}</q-avatar
                          >
                        </q-item-section>
                        <q-item-section>
                          <q-item-label :lines="1" class="row YL__auther q-gutter-sm">
                            <div class="row flex-center">
                              <strong>{{ reply.replyAuther }}</strong>
                            </div>
                            <div class="row flex-center">
                              {{ reply.postDateStr }}
                            </div></q-item-label
                          >

                          <q-item-label
                            class="YL__title_font_family YL__list_line_height text-body2"
                          >
                            <div
                              class="text-body2 Post-body break-all"
                              v-html="reply.content"
                            ></div>

                            <!-- {{ reply.content }} -->
                          </q-item-label>
                        </q-item-section>
                        <!-- <q-item-section side top> </q-item-section> -->
                      </q-item>
                      <q-separator />
                    </div>
                  </q-list>
                </q-pull-to-refresh>

                <template v-slot:loading>
                  <div class="row justify-center q-my-md">
                    <q-spinner-dots color="accent" size="40px"></q-spinner-dots>
                  </div>
                </template>
              </q-infinite-scroll>

              <div class="q-my-xs q-pa-lg flex flex-center bg-secondary gt-sm">
                <q-pagination
                  v-model="current"
                  :size="paginationSize"
                  color="dark"
                  :max="max"
                  :max-pages="maxPage"
                  :boundary-numbers="false"
                  :direction-links="true"
                  @update:model-value="pageNavigate"
                  :disable="!isBigScreen"
                >
                </q-pagination>
              </div>
            </div>
            <q-scroll-area style="height: 180px; width: 100%">
              <div>
                <q-item dense class="q-py-sm">
                  <q-item-section avatar top style="min-width: 30px">
                    <q-avatar size="1.9em">
                      <img :src="userAvatar" :alt="item.auther" />
                    </q-avatar>
                  </q-item-section>
                  <!-- <q-item-section class="YL__auther">
                  {{ auther }}
                </q-item-section> -->
                  <q-item-section top class="YL__auther">
                    <q-item-label>
                      <q-form @submit="onSubmit" class="q-gutter-sm">
                        <div>
                          <q-input
                            dense
                            filled
                            v-model="replyContent"
                            placeholder="说点什么吧"
                            hide-bottom-space
                            type="textarea"
                          />
                        </div>

                        <div class="q-mt-sm">
                          <q-btn label="提交" type="submit" color="light-green" size="xs" />
                        </div>
                      </q-form>
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </div>
            </q-scroll-area>
          </div>
        </div>
      </div>
      <!-- 右边栏 -->
      <!-- <div class="col-3 gt-md"></div> -->
    </div>
  </q-page>
</template>
<style lang="sass">
.YL
  &__auther
    @media(max-width: $breakpoint-xs-max)
      font-size: 0.8em
      height: 2.1em
    @media(min-width: $breakpoint-xs-max)
      font-size: 0.9em
      height: 2.6em
    color: rgba(0, 0, 0, 0.54)
    line-height: 1.2em
  &__return
    @media(max-width: $breakpoint-xs-max)
      font-size: 0.7em
      height: 0.8em
    @media(min-width: $breakpoint-xs-max)
      font-size: 1.1em
      height: 0.8em
  &__wechat_img
    @media(max-width: $breakpoint-xs-max)
      width: 75%
    @media(min-width: $breakpoint-xs-max)
      width: 60%
  &__invalid_item
    text-decoration: line-through blue
</style>

<script>
import 'src/config';
// import { Screen } from 'quasar';
import { Loading } from 'quasar';
import { mapState } from 'pinia';
import { useYunpanStore } from 'src/stores/yunpan';
// import { inject } from 'vue';
import { useMeta } from 'quasar';
import { ref } from 'vue';
import { reactive } from 'vue';
import { useQuasar } from 'quasar';

export default {
  name: 'YunpanArticle',
  data() {
    return {
      item: {},
      listData: [],
      host: global.config.domain,
      current: 1,
      max: 0,
      replyContent: '',
      // maxPage: Screen.gt.sm ? 6 : 4,
      // paginationSize: Screen.gt.sm ? '12px' : '9px',
      isListEnd: false,
      userAvatar: '/static/not_login_user.png',
      isBigScreen: false,
      // mobileBroswer: false,
      isInvalid: false,
    };
  },
  emits: ['need-login', 'logined'],

  computed: {
    ...mapState(useYunpanStore, {
      _detail: 'itemDetail',
      _replyList: 'replyList',
      _replyMax: 'replyMax',
      _contentStr: 'contentStr',
      _userAgent: 'userAgent',
    }),
    maxPage() {
      return this.isBigScreen ? 6 : 4;
    },
    paginationSize() {
      return this.isBigScreen ? '12px' : '9px';
    },
    // imagefullwidth: function () {
    //   return {
    //     'full-width': this.isBigScreen ? false : true,
    //   };
    // },
    disable: function () {
      return this.isBigScreen || this.isListEnd ? true : false;
    },

    getAvatarColor: function () {
      return (parameter) => {
        if (parameter == null || parameter == undefined) {
          return;
        }

        return 'background-color:#' + this.getHashCode(parameter, true).toString(16).substr(0, 6);
      };
    },
    getAvatarText: function () {
      return (parameter) => {
        if (parameter == null || parameter == undefined) {
          return;
        }
        return parameter.slice(0, 1);
      };
    },
    mobileBroswer: function () {
      let isMobile = this.$q.platform.is.mobile;
      console.log('isMobile = ' + isMobile);
      let isWeixin = this.isWeixin();
      console.log('isWeixin = ' + isWeixin);

      return isMobile && !isWeixin;
    },
    weixin: function () {
      return this.isWeixin();
    },
  },
  setup() {
    console.log('YunpanArticle setup');
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
          '最新阿里云盘,夸克网盘,迅雷云盘资源发布.4k,1080p高清影视,动漫,综艺节目,游戏,软件,音乐,学习资料,电子书,图片等应有尽有,实现你的网盘自由',
      },
      keywords: {
        name: 'keywords',
        content: '阿里云盘,夸克网盘,迅雷云盘,资源下载,高清影视,动漫,4k,1080p',
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
        content: '好家当 - 最新阿里云盘资源发布',
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
    console.log('yunpanArticle page prefetch');
    // 先把旧数据重置
    const myStore = useYunpanStore();
    myStore.itemDetail = {};
    myStore.replyList = [];

    if (process.env.SERVER) {
      Loading.show();
      // ssrContext is available only server-side in SSR mode

      // No access to "this" here

      // Return a Promise if you are running an async job
      // Example:
      myStore.userAgent = ssrContext.req.headers['user-agent'];

      return myStore.getYunpanArticleContent(currentRoute.params.id, redirect);
    }
    // const $q = useQuasar();
    // fetch data, validate route and optionally redirect to some other route...
  },
  activated() {
    console.log('yunpanArticle activated ');
    // this.getYunpanItemContent(this.$route.params.id);
  },
  created() {
    console.log('yunpanArticle created');
    this.item = this._detail;
    this.listData = this._replyList;
    this.max = this._replyMax;

    if (Object.keys(this.item).length > 0) {
      this.setAnotherTitle(this.item.title + ' - 好家当');
      // this.title = this._detail.title;
      console.log(this._contentStr);
      this.meta.keywords.content = this.item.title + ',好家当';
      this.meta.ogtitle.content = this.item.title + ' - 好家当';
      if (this._contentStr) {
        this.meta.description.content = this._contentStr + ' - 好家当';
        this.meta.ogdescription.content = this._contentStr + ' - 好家当';
      } else {
        this.meta.description.content = this.item.title + ' - 好家当';
        this.meta.ogdescription.content = this.item.title + ' - 好家当';
      }
    }

    this.meta.ogurl.content = 'https://www.hjdang.com/d/' + this.$route.params.id;

    this.meta.weibocreate.content = new Date();
    this.meta.weiboupdate.content = new Date();
  },

  mounted() {
    console.log('yunpanArticle mounted');

    let windowWidth = window.screen.width;
    if (windowWidth > 1023.99) {
      this.isBigScreen = true;
    }

    if (this.$q.localStorage.has('userInfo')) {
      let userInfo = this.$q.localStorage.getItem('userInfo');

      if (userInfo !== undefined && userInfo !== null) {
        if (userInfo.headimgurl != null && userInfo.headimgurl != '') {
          this.userAvatar = userInfo.headimgurl;
        }
      }
      // this.userAvatar = this.$q.localStorage.getItem('userInfo').headimgurl;
    }
    if (Object.keys(this.item).length === 0) {
      this.$q.loading.show({
        delay: 400, // ms
      });
      this.getYunpanArticleContent(this.$route.params.id);
    }
  },
  methods: {
    getReplyList() {
      this.$q.loading.show({
        delay: 400, // ms
      });
      this.$axios
        .post(`${global.config.domain}/yunpan/reply/list`, {
          page: this.current,
          itemId: this.item.id,
          isInvalid: this.isInvalid,
          article: true,
        })
        .then((res) => {
          // console.log(res.data.data);
          // console.log(this.isBigScreen);

          console.log(res.data);
          if (res.data.code < 0) {
            this.$q.notify({
              type: 'negative',
              icon: 'warning',
              message: `${res.data.msg}`,
            });
          } else {
            this.listData = res.data.data.records;
            if (res.data.data.records.length < 20) {
              this.isListEnd = true;
            }
          }
          this.$q.loading.hide();
        });
    },
    getYunpanArticleContent(id) {
      return this.$axios.post(`${global.config.domain}/yunpan/article/${id}`).then((res) => {
        if (res.data.code < 0) {
          this.$q.loading.hide();
          this.$q.notify({
            type: 'negative',
            icon: 'warning',
            message: `${res.data.msg}`,
          });
          this.$router.push({ path: '/list', query: { q: '' } });
        } else {
          this.item = res.data.data.article;
          this.listData = res.data.data.firstReplyPage.records;
          this._contentStr = res.data.data.contentStr;
          this.max = Math.ceil(
            res.data.data.firstReplyPage.total / res.data.data.firstReplyPage.size
          );
          if (this.item == null) {
            this.$router.push({ path: '/error/404' });
          }
          this.setAnotherTitle(this.item.title + ' - 阿里云盘 - 好家当');
          // this.title = this._detail.title;
          this.meta.keywords.content = this.item.title + ',好家当';
          this.meta.ogtitle.content = this.item.title + ' - 好家当';
          if (this._contentStr) {
            this.meta.description.content = this._contentStr + ' - 好家当';
            this.meta.ogdescription.content = this._contentStr + ' - 好家当';
          } else {
            this.meta.description.content = this.item.title + ' - 好家当';
            this.meta.ogdescription.content = this.item.title + ' - 好家当';
          }

          this.$q.loading.hide();
        }
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
    onSubmit() {
      this.$axios
        .post(`${global.config.domain}/yunpan/resource/reply`, {
          itemId: this.item.id,
          reply: this.replyContent,
        })
        .then((res) => {
          if (res.data.code < 0) {
            if (res.data.code == -102) {
              if (this.isWeixin()) {
                window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa249d330e183eb43&redirect_uri=https://${global.config.domainPro}/auth/${this.item.id}&response_type=code&scope=snsapi_userinfo&state=yunpanArticle#wechat_redirect`;
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
            this.getReplyList();
          }
        });
    },
    //向下划动load页面
    onLoad(index, done) {
      if (this.isBigScreen) {
        return;
      }
      setTimeout(() => {
        console.log('page = .....' + index);
        this.$axios
          .post(`${global.config.domain}/yunpan/reply/list`, {
            page: index,
            itemId: this.item.id,
            isInvalid: this.isInvalid,
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
        this.getReplyList();
        done();
      }, 1000);
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
    //桌面端的分页
    pageNavigate() {
      console.log('reply pageNavigate');
      this.$axios
        .post(`${global.config.domain}/yunpan/reply/list`, {
          page: this.current,
          itemId: this.item.id,
          isInvalid: this.isInvalid,
        })
        .then((res) => {
          console.log(res.data.data.records);
          this.listData = res.data.data.records;
          this.max = Math.ceil(res.data.data.total / res.data.data.size);
        });
    },
  },
};
</script>

<style lang="sass">
.Post-body
  position: relative
  overflow: auto
  overflow-wrap: break-word
  max-width: 100%
.break-all
  word-break: break-all
  word-wrap: break-word
.Post-body img
  max-width: 100%
.break-all img
  max-width: 100%
</style>
