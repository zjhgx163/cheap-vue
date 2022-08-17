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
                    {{ title }}
                    <q-badge transparent align="middle" :color="getTagColor(tag)" :label="tag">
                    </q-badge>
                  </div>
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item class="items-center">
              <q-item-section avatar style="min-width: 30px">
                <q-avatar size="1.6em"> <img :src="avatar" /> </q-avatar>
              </q-item-section>
              <q-item-section class="YL__auther">
                {{ auther }}
              </q-item-section>
              <q-item-section class="YL__auther">
                {{ createDateStr }}
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
                      v-bind:key="item.id"
                      v-for="item in listData"
                      class="bg-primary"
                      v-bind:class="{ 'q-pb-xs': !isBigScreen }"
                    >
                      <!-- 这里q-item 不加to，因为加上to会导致pc端整个变成可点击 -->
                      <q-item
                        dense
                        v-ripple
                        :clickable="clickable"
                        @click="itemClick(item)"
                        class="bg-secondary"
                      >
                        <q-item-section avatar>
                          <q-avatar> <img :src="item.avatar" /> </q-avatar
                        ></q-item-section>
                        <q-item-section class="q-pb-xs">
                          <q-item-label
                            :lines="2"
                            v-bind:class="[textSize, fontFamily, lineHeight, titleHeight]"
                            class="text-black text-bold"
                          >
                            {{ item.title }}</q-item-label
                          >

                          <q-item-label
                            class="row justify-between items-center q-mt-none YL__auther"
                          >
                            <div class="col-4 row justify-between flex-center">
                              <div class="row flex-center">
                                <strong>{{ item.auther }}</strong>
                              </div>
                              <div class="row flex-center">
                                {{ item.itemCreateDateStr }}
                              </div>
                              <q-icon name="reply" />

                              <div class="row flex-center">
                                {{ item.postTimeStr }}
                              </div>

                              <div class="row flex-center">
                                <div>{{ item.viewCount }}</div>
                              </div>
                            </div>
                            <div class="col-auto items-start justify-end row">
                              <q-chip
                                outline
                                size="sm"
                                :color="getTagColor(item.tag)"
                                :icon="getTagIcon(item.tag)"
                                text-color="white"
                              >
                                {{ item.tag }}
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

      maxPage: Screen.gt.sm ? 6 : 4,
      paginationSize: Screen.gt.sm ? '12px' : '9px',
      isListEnd: false,
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
  props: ['title', 'auther', 'avatar', 'createDateStr', 'tag'], // 微信auth code

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

    this.getYunpanItemContent(this.$route.params.id);
  },
  methods: {
    getYunpanItemContent(id) {
      this.$axios.post(`${global.config.domain}/yunpan/item/detail/${id}`).then((res) => {
        this.item = res.data.data.item;
        this.listData = res.data.data.firstReplyPage.records;
        console.log(this.item);
        if (this.item == null) {
          this.$router.push({ path: '/error' });
        }

        this.$q.loading.hide();
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
        this.getItemList();
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
</style>
