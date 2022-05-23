<template>
  <q-page class="bg-primary">
    <div>
      <div v-if="listData.length === 0" class="column items-center justify-start absolute-full">
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
      <div v-else ref="scrollTargetRef" class="bg-primary absolute-full">
        <!--   当使用:scroll-target 时，被指定的container必须要有 style="overflow: auto; max-height: 3000px" -->
        <q-infinite-scroll @load="onLoad" :offset="250" :initial-index="1" :disable="disable">
          <q-pull-to-refresh @refresh="refresh" no-mouse>
            <q-list separator dense class="bg-primary q-mx-sm" id="scroll-target-id" padding>
              <div v-bind:key="item.id" v-for="item in listData" class="q-mb-sm bg-secondary">
                <!-- 这里q-item 不加to，因为加上to会导致pc端整个变成可点击 -->
                <q-item v-ripple v-bind:class="[itemPadding]" class="bg-secondary" dense>
                  <q-item-section side no-wrap>
                    <img v-bind:src="item.itemImg" class="YL__order_img" />
                  </q-item-section>
                  <q-item-section class="q-pb-xs">
                    <q-item-label
                      :lines="1"
                      v-bind:class="[textSize, fontFamily, lineHeight, titleHeight]"
                      class="text-grey-9 text-bold"
                    >
                      {{ item.itemTitle }}</q-item-label
                    >
                    <q-item-label :lines="1" v-bind:class="[textSize, textAccent, fontFamily]"
                      >订单号：{{ item.platformOrderNo }}</q-item-label
                    >

                    <q-item-label :lines="1" v-bind:class="[textSize, textAccent, fontFamily]">
                      {{ item.status }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </div>
              <!-- <q-separator /> -->
            </q-list>
          </q-pull-to-refresh>

          <template v-slot:loading>
            <div class="row justify-center q-my-md">
              <q-spinner-dots color="accent" size="40px"></q-spinner-dots>
            </div>
          </template>
        </q-infinite-scroll>
      </div>
    </div>
  </q-page>
</template>

<style lang="sass">
.YL
  &__order_img
    @media(max-width: $breakpoint-xs-max)
      width: 80px
      height: 80px
    @media(min-width: $breakpoint-xs-max)
      width: 170px
      height: 170px

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
import { Screen } from 'quasar';
import FastClick from 'fastclick';
import 'src/config';

export default {
  name: 'OrderView',
  data() {
    return {
      tab: 'mails',
      listData: [],
      page: 1,
      max: 0,
      isBigScreen: Screen.gt.sm ? true : false,
      isNormal: true,
      fontFamily: 'YL__title_font_family',
      lineHeight: 'YL__list_line_height',
      textAccent: 'text-accent',
      titleHeight: 'YL__title_height',
      isListEnd: false,

      // to: false,
    };
  },
  props: ['userId', 'status'],
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

    disable: function () {
      return this.isListEnd ? true : false;
    },
  },

  mounted() {
    //解决iphone移动端的延迟
    FastClick.attach(document.body);
    // this.selectedTab = 'main';
    this.getOrderList(this.userId, this.status);

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
    getOrderList(userId, status) {
      this.$q.loading.show({
        delay: 400, // ms
      });
      this.$axios
        .post(`${global.config.domain}/order/list`, {
          userId: userId,
          status: status,
          page: this.page,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.code < 0) {
            if (/(http|https):\S*/.test(res.data.data)) {
              window.location.href = res.data.data;
            } else if (/redirect:\S*/.test(res.data)) {
              //redirect其他页面
              let redirectPath = res.data.slice(9);
              this.$router.push({ path: redirectPath });
            }
          } else {
            this.listData = res.data.data.records;
            if (res.data.data.records.length < 20) {
              this.isListEnd = true;
            }
          }

          this.$q.loading.hide();
        });
    },
    //向下划动load页面
    onLoad(index, done) {
      if (this.isBigScreen) {
        return;
      }
      setTimeout(() => {
        this.$axios
          .post(`${global.config.domain}/order/list`, {
            userId: this.userId,
            status: this.status,
            page: index,
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
  },
};
</script>
