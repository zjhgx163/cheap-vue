<template>
  <div padding class="q-ml-lg">
    <q-card flat class="q-pl-md q-mt-md q-ml-md">
      <q-card-section>
        <div class="text-h7 text-dark">猜你喜欢</div>
      </q-card-section>

      <!-- <q-separator inset /> -->

      <q-card-section>
        <q-list dense separator>
          <div v-bind:key="item.id" v-for="item in listData">
            <!-- 这里q-item 不加to，因为加上to会导致pc端整个变成可点击 -->
            <q-item
              dense
              v-ripple
              :to="{
                name: 'yunpanDetail',
                params: { id: item.id },
              }"
              class="q-pt-sm q-px-xs"
            >
              <q-item-section class="q-pb-xs">
                <q-item-label
                  lines="2"
                  v-bind:class="[fontFamily]"
                  class="text-caption"
                  style="color: #37a"
                >
                  {{ item.titleGpt == null ? item.title : item.titleGpt }}</q-item-label
                >
              </q-item-section>
              <!-- <q-item-section side top> </q-item-section> -->
            </q-item>
            <q-separator color="primary" class="gt-sm" />
          </div>
        </q-list>
      </q-card-section>
    </q-card>
  </div>
</template>
<style scoped lang="sass">
.YL
  &__auther
    font-size: 0.9em
    height: 2.7em
    color: rgba(0, 0, 0, 0.54)
    line-height: 1.2em
  &__r_title_height
    height: 2.9em
  &__r_list_line_height
    line-height: 1.6em !important
  &__no_data
    @media(max-width: $breakpoint-xs-max)
      height: 5em
      width: 6em
    @media(min-width: $breakpoint-xs-max)
      width: 10em
      width: 12em
</style>
<script>
import { useYunpanStore } from 'src/stores/yunpan';
import { mapWritableState } from 'pinia';
import { Platform } from 'quasar';
export default {
  name: 'YunpanRecommendList',
  data() {
    return {
      listData: [],
      fontFamily: 'YL__title_font_family',
      lineHeight: 'YL__r_list_line_height',
      titleHeight: 'YL__r_title_height',
      // isBigScreen: Screen.gt.sm ? true : false,
    };
  },
  created() {
    console.log('YunpanRecommendList created');
    this.listData = this._listData;
  },
  mounted() {
    console.log('YunpanRecommendList mounted');

    if (this.listData.length === 0) {
      this.getItemList();
    }
  },
  computed: {
    ...mapWritableState(useYunpanStore, {
      _listData: 'recommendItems',
    }),

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
        return 'background-color:#' + this.getHashCode(parameter, false).toString(16).substr(0, 6);
      };
    },
    getAvatarText: function () {
      return (parameter) => {
        return parameter.slice(0, 1);
      };
    },
    getHref: function () {
      return (parameter) => {
        return 'https://www.hjdang.com/d/' + parameter;
      };
    },
  },
  // our hook here
  preFetch({ store, currentRoute, previousRoute, redirect, ssrContext, urlPath, publicPath }) {
    console.log('YunpanRecommendList prefetch');
    const platform = process.env.SERVER ? Platform.parseSSR(ssrContext) : Platform; // otherwise we're on client
    if (platform.is.desktop) {
      const yunpanStore = useYunpanStore(store);
      return yunpanStore.getYunpanRecommendList();
    }
  },

  methods: {
    getItemList() {
      // console.log('$$$$$$' + this.query);
      this.$q.loading.show({
        delay: 400, // ms
      });
      this.$axios.post(`${global.config.domain}/yunpan/recommend/list`, {}).then((res) => {
        // console.log(res.data.data);
        // console.log(this.isBigScreen);

        this.listData = res.data.data.records;

        this.$q.loading.hide();
      });
    },

    getHashCode(str, caseSensitive) {
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
