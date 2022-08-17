<template>
  <div>
    <div class="col-12 col-sm-8 q-px-xs q-pt-xs q-pb-sm column justify-center">
      <q-input
        dense
        filled
        standout="text-white"
        square
        v-model="searchKey"
        placeholder="搜索"
        type="search"
        class="YL__toolbar-input-container col-12 col-sm-9"
        v-on:keyup.enter="search"
      >
        <template v-slot:append>
          <q-btn name="search" icon="search" unelevated @click="getItemList" />
        </template>
      </q-input>
    </div>
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

                  <q-item-label class="row justify-between items-center q-mt-none YL__auther">
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
  &__auther
    @media(max-width: $breakpoint-xs-max)
      font-size: 0.8em
      height: 2.1em
    @media(min-width: $breakpoint-xs-max)
      font-size: 0.9em
      height: 2.6em
    color: rgba(0, 0, 0, 0.54)
    line-height: 1.2em
  &__title_height
    @media(max-width: $breakpoint-xs-max)
      height: 2.8em
    @media(min-width: $breakpoint-xs-max)
      height: 1.6em
  &__list_line_height
    line-height: 22px !important
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
import 'src/config';

export default {
  name: 'PageIndex',
  data() {
    return {
      searchKey: '',
      sort: 1,
      listData: [],
      current: 1,
      max: 0,

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
      selectedTag: '',
      // to: false,
    };
  },
  computed: {
    itemPadding: function () {
      return this.isBigScreen ? 'q-py-md' : 'q-py-sm';
    },
    textSize: function () {
      return this.isBigScreen ? 'text-h7' : 'text-body2';
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
        } else if (parameter == '学习区') {
          return 'book';
        } else if (parameter == '音乐/音频') {
          return 'music_note';
        } else {
          return 'other';
        }
      };
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
  },
  activated() {
    console.log('Index activated');
    console.log('this.isListEnd =' + this.isListEnd);

    this.isListEnd = false;
  },
  methods: {
    getItemList() {
      // console.log('$$$$$$' + this.query);
      this.$q.loading.show({
        delay: 400, // ms
      });
      this.$axios
        .post(`${global.config.domain}/yunpan/resource/list`, {
          page: this.current,
          tag: this.selectedTag,
          query: this.searchKey,
          sort: this.sort,
        })
        .then((res) => {
          // console.log(res.data.data);
          // console.log(this.isBigScreen);

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
        console.log('index = .....' + index);
        this.$axios
          .post(`${global.config.domain}/yunpan/resource/list`, {
            page: index,
            tag: this.selectedTag,
            query: this.searchKey,
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

    itemClick(item) {
      console.log('id = ' + item.id);
      this.$router.push({
        path: '/yunpan/detail/' + item.id,
        query: {
          title: item.title,
          auther: item.auther,
          avatar: item.avatar,
          createDateStr: item.createDateStr,
          tag: item.tag,
        },
      });
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
  },
};
</script>
