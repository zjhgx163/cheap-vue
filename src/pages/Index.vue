<template>
  <q-page class="bg-primary">
    <div v-if="listData.length === 0" class="column items-center justify-center absolute-full">
      <div class="clo-4 YL__no_data">
        <q-img
          src="https://cheap-david.oss-cn-hangzhou.aliyuncs.com/static/no-data.png"
          spinner-color="white"
        >
        </q-img>
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
                    <img v-bind:src="item.thumbUrl" class="YL__index_img" />
                  </router-link>
                </q-item-section>
                <q-item-section class="q-pb-xs">
                  <q-item-label
                    :lines="lines"
                    v-bind:class="[textSize, fontFamily, lineHeight, titleHeight]"
                    class="text-grey-9 text-bold"
                  >
                    {{ item.title }}</q-item-label
                  >
                  <q-item-label
                    :lines="1"
                    v-bind:class="[textSize, textAccent, fontFamily, pricePading]"
                  >
                    {{ item.priceText }}
                  </q-item-label>
                  <q-item-label :lines="1">
                    <span v-if="item.label != ''" style="text-align: left">
                      <li
                        v-for="a in transferLabel(item.label)"
                        v-bind:key="a"
                        style="text-align: left"
                        class="YL__label q-py-xs"
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
                    <span v-if="item.emphsis != 'null'" class="text-grey-9 text-weight-bold">{{
                      item.emphsis
                    }}</span
                    >{{ item.detailBrief }}
                    <router-link
                      :to="{
                        path: 'item',
                        name: 'detail',
                        params: { urlCode: item.urlCode },
                      }"
                      >...阅读全文
                    </router-link>
                  </q-item-label>
                  <q-item-label :lines="1" class="row items-center justify-between YL__mall lt-sm">
                    <div class="col-auto">{{ item.mall }} | {{ item.dateStr }}</div>

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
                    class="row justify-between items-center gt-sm YL__mall y-pt-sm"
                  >
                    <div class="col-4 row justify-between">
                      <div class="row items-center">
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
                      <div class="row items-center">
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

                      <div class="row items-center">
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

                      <div class="row items-center">
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

                    <div class="col-4 justify-end row">
                      <div class="col"></div>
                      <div class="col-auto items-center row">
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
  </q-page>
</template>

<style lang="sass">
.YL
  &__index_img
    @media(max-width: $breakpoint-xs-max)
      width: 110px
      height: 110px
    @media(min-width: $breakpoint-xs-max)
      width: 170px
      height: 170px
  &__label
    @media(max-width: $breakpoint-xs-max)
      font-size: 0.7em
      height: 1.6em
    @media(min-width: $breakpoint-xs-max)
      font-size: 0.87em
    color: rgba(0, 0, 0, 0.54)
    background: #f5f5f5
    display: inline-block
    margin-right: 7px;
    text-align: center;
    letter-spacing: 0.03333em
    list-type: none
    -webkit-font-smoothing: antialiased
    line-height: 1.2em
  &__mall
    @media(max-width: $breakpoint-xs-max)
      font-size: 0.7em
      height: 1.3em
    @media(min-width: $breakpoint-xs-max)
      font-size: 0.9em
      height: 2.6em
    color: rgba(0, 0, 0, 0.54)
    line-height: 1.2em
  &__title_height
    @media(max-width: $breakpoint-xs-max)
      height: 3.2em
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
</style>

<script>
import { matTurnedInNot } from '@quasar/extras/material-icons';
import { Screen } from 'quasar';
import FastClick from 'fastclick';

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
      titleHeight: 'YL__title_height',
      pricePading: Screen.gt.sm ? 'q-pt-xs q-pb-sm' : 'q-pt-xs',
      isListEnd: false,
      // to: false,
    };
  },
  props: ['query', 'sort'],
  computed: {
    itemPadding: function () {
      return this.isBigScreen ? 'q-py-md' : 'q-py-sm';
    },
    textSize: function () {
      return this.isBigScreen ? 'text-h7' : 'text-subtitle1';
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
    disable: function () {
      return this.isBigScreen || this.isListEnd ? true : false;
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
    //解决iphone移动端的延迟
    FastClick.attach(document.body);
    console.log('Index mounted');
    // this.selectedTab = 'main';
    this.getItemList();

    // this.windowWidth = window.innerWidth;
    // window.onresize = () => {
    //   this.windowWidth = window.innerWidth;
    // };
  },
  activated() {
    console.log('Index activated');
    console.log('this.isListEnd =' + this.isListEnd);

    this.isListEnd = false;
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
          if (res.data.data.records.length < 20) {
            this.isListEnd = true;
          }
          this.max = res.data.data.total / res.data.data.size + 1;
          this.$q.loading.hide();
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
