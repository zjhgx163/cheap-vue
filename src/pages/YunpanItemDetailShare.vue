<template>
  <q-page class="bg-secondary">
    <q-dialog v-model="isInvalid">
      <q-card class="bg-blue text-white">
        <q-card-section>
          此资源已失效，请在站内搜索其他资源。&#9996;&#9996;实现看片自由，请关注微信公众号“老胡为你服务“，或在浏览器上访问
          “www.hjdang.com”
        </q-card-section>
      </q-card>
    </q-dialog>
    <div class="row">
      <!-- 详情页 -->
      <div class="col row bg-primary">
        <div class="col column">
          <div class="col q-pa-sm bg-secondary">
            <q-item dense class="YL__return q-pt-sm q-mt-sm">
              <q-item-label class="flex-center row">
                <q-icon name="keyboard_return" color="pink-4" />
                <span> &nbsp;&nbsp;</span>
                <router-link
                  style="text-decoration: underline"
                  class="text-pink-4"
                  :to="{
                    path: '/',
                  }"
                >
                  返回资源列表
                </router-link>
              </q-item-label>
            </q-item>
            <q-item dense class="q-pt-md">
              <q-item-section>
                <q-item-label class="column flex-center">
                  <span class="text-h6 text-pink-4 text-bold"
                    >更多最新资源，扫描二维码关注微信公众号
                  </span>
                </q-item-label>
                <q-item-label class="column flex-center">
                  <span class="text-h5 text-deep-blue text-bold"> “老胡为你服务”</span>
                </q-item-label>
                <q-item-label class="column flex-center">
                  <span class="text-h6 text-pink-4 text-bold text-italic"
                    >&#9996;&#9996;实现看片自由
                  </span>
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item class="flex-center">
              <img
                style="width: 30%; height: 40%"
                src="https://private-david.oss-cn-beijing.aliyuncs.com/qrcode_for_laohuweinifuwu.jpeg"
              />
            </q-item>
            <q-item dense>
              <q-item-section>
                <!-- <q-item-label class="column flex-center"> </q-item-label> -->
                <q-item-label :lines="2" class="row">
                  <header>
                    <h1 class="text-h6 text-bold">
                      {{ item.title }}

                      <q-badge
                        transparent
                        align="middle"
                        :color="getTagColor(item.tag)"
                        :label="item.tag"
                      >
                      </q-badge>
                    </h1>
                  </header>
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item class="items-center">
              <q-item-section avatar style="min-width: 30px">
                <q-avatar size="1.9em" v-if="item.avatar != '' && item.avatar != null">
                  <img :src="item.avatar" />
                </q-avatar>
                <q-avatar
                  size="1.9em"
                  :style="getAvatarColor(item.auther)"
                  text-color="white"
                  v-else
                >
                  {{ getAvatarText(item.auther) }}</q-avatar
                >
              </q-item-section>
              <q-item-section class="YL__auther">
                {{ item.auther }}
              </q-item-section>
              <q-item-section class="YL__auther">
                {{ item.createDateStr }}
              </q-item-section>
            </q-item>
            <q-item dense>
              <div class="text-body2 break-all" v-html="item.content"></div>
            </q-item>
            <q-separator />

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
                            <img :src="reply.replyAvatar" />
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
                            <div class="text-body2 break-all" v-html="reply.content"></div>

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
                      <img :src="userAvatar" />
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
  &__return
    @media(max-width: $breakpoint-xs-max)
      font-size: 0.7em
      height: 0.8em
    @media(min-width: $breakpoint-xs-max)
      font-size: 0.9em
      height: 0.8em
</style>
<script>
import 'src/config';
// import { Screen } from 'quasar';
import { Loading } from 'quasar';
import { mapState } from 'pinia';
import { useYunpanStore } from 'src/stores/yunpan';
// import FastClick from 'fastclick';
// import clipboard from 'src/clipboard';
// import Clipboard from 'clipboard';
import { useMeta } from 'quasar';
import { ref } from 'vue';
import { reactive } from 'vue';

export default {
  name: 'YunpanItemShare',
  data() {
    return {
      item: {},
      listData: [],
      host: global.config.domain,
      showing: false,
      alertText: '淘口令已复制\n请打开手淘',
      isShowCopyTaobaopwd: false,
      current: 1,
      max: 0,
      replyContent: '',
      // maxPage: Screen.gt.sm ? 6 : 4,
      // paginationSize: Screen.gt.sm ? '12px' : '9px',
      isListEnd: false,
      userAvatar: 'https://cheap-david.oss-cn-hangzhou.aliyuncs.com/static/not_login_user.png',
      isBigScreen: false,
      isInvalid: false,
    };
  },
  computed: {
    ...mapState(useYunpanStore, {
      _detail: 'itemDetail',
      _replyList: 'replyList',
      _replyMax: 'replyMax',
      _contentStr: 'contentStr',
      _isInvalid: 'isInvalid',
    }),
    maxPage() {
      return this.isBigScreen ? 6 : 4;
    },
    paginationSize() {
      return this.isBigScreen ? '12px' : '9px';
    },
    imagefullwidth: function () {
      return {
        'full-width': this.isBigScreen ? false : true,
      };
    },
    disable: function () {
      return this.isBigScreen || this.isListEnd ? true : false;
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
        } else if (parameter == '学习区') {
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
  },
  setup() {
    console.log('Yun setup');
    const title = ref('最新阿里云盘资源,深夜加油站');
    const meta = reactive({
      description: {
        name: 'description',
        content:
          '云盘资源 阿里云盘 百度云盘 夸克云盘，影视，动漫，游戏，软件，学习资料，最新影视，美剧，韩剧，韩国电影，大尺度，速存，易和谐，河蟹，禁播，精彩镜头，欧洲文艺电影',
      },
      keywords: {
        name: 'keywords',
        content: '最新影视，韩国电影，大尺度，速存，易和谐，河蟹，禁播，精彩镜头，欧洲文艺电影',
      },
      ogtype: {
        property: 'og:type',
        content: 'webpage',
      },
      ogurl: {
        property: 'og:url',
        content: 'https://www.hjdang.com/list?q=',
      },
      ogtitle: {
        property: 'og:title',
        content: '最新阿里云盘资源,深夜加油站',
      },
      ogdescription: {
        property: 'og:description',
        content:
          '云盘资源 阿里云盘 百度云盘 夸克云盘，影视，动漫，游戏，软件，学习资料，最新影视，美剧，韩剧，韩国电影，大尺度，速存，易和谐，河蟹，禁播，精彩镜头，欧洲文艺电影',
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
    console.log('yunpanItemDetailShare page prefetch');
    // const $q = useQuasar();
    // fetch data, validate route and optionally redirect to some other route...
    const myStore = useYunpanStore();
    myStore.itemDetail = {};
    myStore.replyList = [];
    myStore.contentStr = '';
    myStore.isInvalid = false;

    if (process.env.SERVER) {
      Loading.show();

      // ssrContext is available only server-side in SSR mode

      // No access to "this" here

      // Return a Promise if you are running an async job
      // Example:

      return myStore.getYunpanItemContent(currentRoute.params.id, redirect);
    }
  },
  //   components: {
  //     HotList,
  //   },
  created() {
    console.log('yunpanItemDetailShare created');
    this.item = this._detail;
    this.listData = this._replyList;
    this.max = this._replyMax;
    this.isInvalid = this._isInvalid;

    if (Object.keys(this.item).length > 0) {
      this.setAnotherTitle(this.item.title + ' 下载 阿里云盘 百度网盘 夸克云盘');
      // this.title = this._detail.title;
      // console.log(this.title);
      console.log(this._contentStr);
      if (this._contentStr) {
        this.meta.description.content =
          this.item.title + ' 下载 阿里云盘 百度网盘 夸克云盘' + this._contentStr;
        this.meta.keywords.content =
          this.item.title + ' 下载 阿里云盘 百度网盘 夸克云盘' + this._contentStr;
        this.meta.ogtitle.content =
          this.item.title + ' 下载 阿里云盘 百度网盘 夸克云盘' + this._contentStr;
        this.meta.ogdescription.content =
          this.item.title + ' 下载 阿里云盘 百度网盘 夸克云盘' + this._contentStr;
      } else {
        this.meta.description.content = this.item.title + ' 下载 阿里云盘 百度网盘 夸克云盘';
        this.meta.keywords.content = this.item.title + ' 下载 阿里云盘 百度网盘 夸克云盘';
        this.meta.ogtitle.content = this.item.title + ' 下载 阿里云盘 百度网盘 夸克云盘';
        this.meta.ogdescription.content = this.item.title + ' 下载 阿里云盘 百度网盘 夸克云盘';
      }
    }

    this.meta.ogurl.content = 'https://www.hjdang.com/p/' + this.$route.params.id;
    this.meta.weibocreate.content = new Date();
    this.meta.weiboupdate.content = new Date();
  },
  mounted() {
    //解决iphone移动端的延迟
    // FastClick.attach(document.body);
    console.log('yunpan item share mounted');
    let windowWidth = window.screen.width;
    if (windowWidth > 1023.99) {
      this.isBigScreen = true;
    }

    if (this.$q.localStorage.has('userInfo')) {
      let userInfo = this.$q.localStorage.getItem('userInfo');

      if (userInfo !== undefined && userInfo !== null) {
        if (userInfo.avatar != null && userInfo.avatar != '') {
          this.userAvatar = userInfo.avatar;
        }
      }
      // this.userAvatar = this.$q.localStorage.getItem('userInfo').headimgurl;
    }

    if (Object.keys(this.item).length === 0) {
      this.$q.loading.show({
        delay: 400, // ms
      });
      this.getYunpanItemContent(this.$route.params.id);
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
    getYunpanItemContent(id) {
      this.$axios.post(`${global.config.domain}/yunpan/item/public/${id}`).then((res) => {
        if (res.data.code < 0) {
          this.$q.loading.hide();
          this.$q.notify({
            type: 'negative',
            icon: 'warning',
            message: `${res.data.msg}`,
          });
          this.$router.push({ path: '/list' });
        } else {
          this.item = res.data.data.item;
          this._contentStr = res.data.data.contentStr;
          this.isInvalid = res.data.data.invalid;
          this.listData = res.data.data.firstReplyPage.records;
          this.max = Math.ceil(
            res.data.data.firstReplyPage.total / res.data.data.firstReplyPage.size
          );
          // console.log(this.item);
          if (this.item == null) {
            this.$router.push({ path: '/error' });
          }
          this.setAnotherTitle(this.item.title + ' 下载 阿里云盘 百度网盘 夸克云盘');
          // this.title = this._detail.title;
          if (this._contentStr) {
            this.meta.description.content =
              this.item.title + ' 下载 阿里云盘 百度网盘 夸克云盘' + this._contentStr;
            this.meta.keywords.content =
              this.item.title + ' 下载 阿里云盘 百度网盘 夸克云盘' + this._contentStr;
            this.meta.ogtitle.content =
              this.item.title + ' 下载 阿里云盘 百度网盘 夸克云盘' + this._contentStr;
            this.meta.ogdescription.content =
              this.item.title + ' 下载 阿里云盘 百度网盘 夸克云盘' + this._contentStr;
          } else {
            this.meta.description.content = this.item.title + ' 下载 阿里云盘 百度网盘 夸克云盘';
            this.meta.keywords.content = this.item.title + ' 下载 阿里云盘 百度网盘 夸克云盘';
            this.meta.ogtitle.content = this.item.title + ' 下载 阿里云盘 百度网盘 夸克云盘';
            this.meta.ogdescription.content = this.item.title + ' 下载 阿里云盘 百度网盘 夸克云盘';
          }
          this.$q.loading.hide();
        }
      });
    },
    isWeixin() {
      var ua = window.navigator.userAgent.toLowerCase();
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
            if (!this.$q.localStorage.has('userInfo')) {
              if (this.isWeixin()) {
                window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa249d330e183eb43&redirect_uri=https://www.hjdang.com/auth/${this.item.id}&response_type=code&scope=snsapi_userinfo&state=yunpanItem#wechat_redirect`;
              } else {
                this.$router.push({ path: 'login' });
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
      var hash = 1315423917,
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
.break-all
  word-break: break-all
  word-wrap: break-word
.message img
  width: 100%
  height: 50%
.break-all img
  width: 100%
  height: 50%
</style>
