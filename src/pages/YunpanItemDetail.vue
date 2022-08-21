<template>
  <div>
    <q-dialog v-model="isShowCopyTaobaopwd" @hide="copyPwd" persistent>
      <q-card>
        <q-card-section class="column q-pa-sm items-center bg-brown-8 text-white">
          <span class="text-caption">请点击复制，打开手机淘宝</span>
        </q-card-section>

        <q-card-actions align="center" class="q-pa-xs">
          <q-btn
            rounded
            outline
            ripple
            label="复制"
            class="text-bold"
            color="accent"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <div class="row">
      <!-- 详情页 -->
      <div class="col row">
        <div class="col column">
          <div class="col q-pa-sm bg-secondary">
            <q-item dense>
              <q-item-section>
                <!-- <q-item-label class="column flex-center"> </q-item-label> -->
                <q-item-label :lines="2" class="row text-h6 text-bold">
                  <div>
                    {{ item.title }}
                    <q-badge
                      transparent
                      align="middle"
                      :color="getTagColor(item.tag)"
                      :label="item.tag"
                    >
                    </q-badge>
                  </div>
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item class="items-center">
              <q-item-section avatar style="min-width: 30px">
                <q-avatar size="1.6em"> <img :src="item.avatar" /> </q-avatar>
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

            <div ref="scrollTargetRef">
              <!--   当使用:scroll-target 时，被指定的container必须要有 style="overflow: auto; max-height: 3000px" -->
              <q-infinite-scroll @load="onLoad" :offset="250" :initial-index="1" :disable="disable">
                <q-pull-to-refresh @refresh="refresh" no-mouse>
                  <q-list dense separator class="bg-secondary" id="scroll-target-id">
                    <div
                      v-bind:key="reply.id"
                      v-for="reply in listData"
                      class="bg-primary"
                      v-bind:class="{ 'q-pb-xs': !isBigScreen }"
                    >
                      <!-- 这里q-item 不加to，因为加上to会导致pc端整个变成可点击 -->
                      <q-item dense v-ripple :clickable="clickable" class="bg-secondary">
                        <q-item-section avatar>
                          <q-avatar> <img :src="reply.avatar" /> </q-avatar
                        ></q-item-section>
                        <q-item-section class="q-pb-xs">
                          <q-item-label
                            :lines="2"
                            v-bind:class="[textSize, fontFamily, lineHeight, titleHeight]"
                            class="text-black text-bold"
                          >
                            {{ reply.title }}</q-item-label
                          >

                          <q-item-label
                            class="row justify-between items-center q-mt-none YL__auther"
                          >
                            <div class="col-4 row justify-between flex-center">
                              <div class="row flex-center">
                                <strong>{{ reply.auther }}</strong>
                              </div>
                              <div class="row flex-center">
                                {{ reply.itemCreateDateStr }}
                              </div>
                              <q-icon name="reply" />

                              <div class="row flex-center">
                                {{ reply.postTimeStr }}
                              </div>

                              <div class="row flex-center">
                                <div>{{ reply.viewCount }}</div>
                              </div>
                            </div>
                            <div class="col-auto items-start justify-end row">
                              <q-chip
                                outline
                                size="sm"
                                :color="getTagColor(reply.tag)"
                                :icon="getTagIcon(reply.tag)"
                                text-color="white"
                              >
                                {{ reply.tag }}
                              </q-chip>
                            </div>
                          </q-item-label>
                        </q-item-section>
                        <!-- <q-item-section side top> </q-item-section> -->
                      </q-item>
                    </div>
                  </q-list>
                </q-pull-to-refresh>

                <template v-slot:loading>
                  <div class="row justify-center q-my-md">
                    <q-spinner-dots color="accent" size="40px"></q-spinner-dots>
                  </div>
                </template>
              </q-infinite-scroll>
              <q-item dense class="q-py-xs">
                <q-item-section avatar top style="min-width: 30px">
                  <q-avatar size="1.6em">
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

                      <div><q-btn label="提交" type="submit" color="light-green" size="xs" /></div>
                    </q-form>
                  </q-item-label>
                </q-item-section>
              </q-item>

              <div class="q-my-xs q-pa-lg flex flex-center bg-secondary gt-sm">
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
            </div>
          </div>
        </div>
      </div>
      <!-- 右边栏 -->
      <div class="col-3 gt-md"></div>
    </div>
  </div>
</template>

<script>
import 'src/config';
import { Screen } from 'quasar';
import FastClick from 'fastclick';
// import clipboard from 'src/clipboard';
// import Clipboard from 'clipboard';
// import $ from 'jquery';

export default {
  name: 'DetailPage',
  data() {
    return {
      item: {},
      listData: {},
      host: global.config.domain,
      showing: false,
      alertText: '淘口令已复制\n请打开手淘',
      isShowCopyTaobaopwd: false,
      current: 1,
      max: 0,
      replyContent: '',
      maxPage: Screen.gt.sm ? 6 : 4,
      paginationSize: Screen.gt.sm ? '12px' : '9px',
      isListEnd: false,
      userAvatar: 'https://cheap-david.oss-cn-hangzhou.aliyuncs.com/static/not_login_user.png',
    };
  },
  computed: {
    imagefullwidth: function () {
      return {
        'full-width': Screen.gt.sm ? false : true,
      };
    },
    disable: function () {
      return this.isBigScreen || this.isListEnd ? true : false;
    },

    getTagColor: function () {
      return (parameter) => {
        if (parameter == '影视') {
          return 'red';
        } else if (parameter == '动漫') {
          return 'blue';
        } else if (parameter == '图片') {
          return 'orange';
        } else if (parameter == '游戏/软件') {
          return 'purple';
        } else if (parameter == '学习区') {
          return 'teal';
        } else if (parameter == '音乐/音频') {
          return 'indigo';
        } else {
          return 'brown';
        }
      };
    },
  },

  //   components: {
  //     HotList,
  //   },

  mounted() {
    //解决iphone移动端的延迟
    FastClick.attach(document.body);
    console.log('yunpan item mounted');

    this.$q.loading.show({
      delay: 400, // ms
    });

    if (this.$q.localStorage.has('userInfo')) {
      this.userAvatar = this.$q.localStorage.getItem('userInfo').headimgurl;
    }

    this.getYunpanItemContent(this.$route.params.id);
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
      this.$axios.post(`${global.config.domain}/yunpan/item/detail/${id}`).then((res) => {
        if (res.data.code < 0) {
          if (!this.$q.localStorage.has('userInfo')) {
            if (this.isWeixin()) {
              window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa249d330e183eb43&redirect_uri=https://www.hjdang.com/auth/${id}&response_type=code&scope=snsapi_userinfo&state=yunpanItem#wechat_redirect`;
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
          this.item = res.data.data.item;
          this.listData = res.data.data.firstReplyPage.records;
          console.log(this.item);
          if (this.item == null) {
            this.$router.push({ path: '/error' });
          }

          this.$q.loading.hide();
        }
      });
    },
    copyPwd() {
      let that = this;
      if (this.taobaoPwd != '')
        this.$copyText(this.taobaoPwd).then(
          function (e) {
            console.log('this.taobaoPwd = ' + that.taobaoPwd);
          },
          function (e) {
            alert('Can not copy');
            console.log(e);
          },
        );
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
        console.log('index = .....' + index);
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
    //桌面端的分页
    pageNavigate() {
      this.$axios
        .post(`${global.config.domain}/yunpan/resource/list`, {
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
  },
};
</script>

<style lang="sass">
.break-all
  word-break: break-all;
  word-wrap: break-word;
.message img
  width: 100%
  height: 50%
</style>
