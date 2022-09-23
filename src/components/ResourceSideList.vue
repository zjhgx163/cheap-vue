<template>
  <div padding class="bg-primary q-px-sm">
    <q-list dense separator class="bg-secondary" id="scroll-target-id">
      <q-item-label header class="text-bold text-black"> 热门云盘资源</q-item-label>

      <div v-bind:key="item.id" v-for="item in listData" class="bg-primary">
        <!-- 这里q-item 不加to，因为加上to会导致pc端整个变成可点击 -->
        <q-item dense v-ripple clickable @click="itemClick(item)" class="bg-secondary q-pt-sm">
          <q-item-section avatar top>
            <q-avatar v-if="item.avatar != '' && item.avatar != null">
              <img :src="item.avatar" />
            </q-avatar>
            <q-avatar :style="getAvatarColor(item.auther)" text-color="white" v-else>
              {{ getAvatarText(item.auther) }}</q-avatar
            ></q-item-section
          >
          <q-item-section class="q-pb-xs">
            <q-item-label
              lines="2"
              v-bind:class="[fontFamily, lineHeight, titleHeight]"
              class="text-black text-bold"
            >
              {{ item.title }}</q-item-label
            >

            <q-item-label class="row justify-between items-center q-mt-none q-pr-xs YL__auther">
              <div class="col-auto row flex-center q-gutter-sm">
                <div class="row flex-center">
                  <strong>{{ item.auther }}</strong>
                  <q-icon name="reply" />
                </div>
                <div class="row flex-center">发表于 {{ item.itemCreateDateStr }}</div>
              </div>
              <div class="col items-center justify-end row">
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
        <q-separator color="primary" class="gt-sm" />
      </div>
      <q-item-label
        :lines="1"
        class="YL__list_line_height q-py-sm YL__list_font_size text-grey-9 column flex-center"
      >
        <router-link
          class="text-bold"
          :to="{
            path: 'yunpan/list',
          }"
          >...更多资源点击查看...
        </router-link>
      </q-item-label>
    </q-list>
  </div>
</template>
<style lang="sass">
.YL
  &__auther
    font-size: 0.9em
    height: 2.7em
    color: rgba(0, 0, 0, 0.54)
    line-height: 1.2em
  &__title_height
    height: 3.2em
  &__list_line_height
    line-height: 22px !important
  &__no_data
    @media(max-width: $breakpoint-xs-max)
      height: 5em
      width: 6em
    @media(min-width: $breakpoint-xs-max)
      width: 10em
      width: 12em
</style>
<script>
export default {
  name: 'ResoureSideList',
  data() {
    return {
      listData: [],
      fontFamily: 'YL__title_font_family',
      lineHeight: 'YL__list_line_height',
      titleHeight: 'YL__title_height',
      // isBigScreen: Screen.gt.sm ? true : false,
    };
  },
  mounted() {
    this.getItemList();
  },
  computed: {
    // textSize: function () {
    //   return this.isBigScreen ? 'text-h7' : 'text-body2';
    // },

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
        } else if (parameter == '学习') {
          return 'teal';
        } else if (parameter == '音乐/音频') {
          return 'indigo';
        } else if (parameter == '日常') {
          return 'light-green';
        } else if (parameter == '求资源') {
          return 'blue-grey';
        } else if (parameter == '书籍') {
          return 'brown';
        } else {
          return 'grey';
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
  },

  methods: {
    getItemList() {
      // console.log('$$$$$$' + this.query);
      this.$q.loading.show({
        delay: 400, // ms
      });
      this.$axios
        .post(`${global.config.domain}/yunpan/resource/list`, {
          page: 1,
        })
        .then((res) => {
          // console.log(res.data.data);
          // console.log(this.isBigScreen);

          console.log(res.data);
          this.listData = res.data.data.records;
          if (res.data.data.records.length < 20) {
            this.isListEnd = true;
          }
        });
    },
    itemClick(item) {
      console.log('id = ' + item.id);
      this.$router.push({
        path: '/yunpan/public/' + item.id,
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
