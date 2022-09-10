<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-primary text-grey-8">
      <q-toolbar class="q-mb-sm bg-secondary" v-bind:class="[itemPadding]">
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
              <q-btn name="search" icon="search" unelevated @click="search" />
            </template>
          </q-input>
        </div>
      </q-toolbar>
    </q-header>
    <q-page-container class="bg-primary">
      <keep-alive exclude="YunpanItemDetail">
        <router-view :key="$route.fullPath" />
      </keep-alive>
    </q-page-container>

    <q-footer reveal class="bg-secondary q-py-md">
      <q-item>
        <q-item-section top side class="text-bold"> 声明：</q-item-section>
        <q-item-section>
          <q-item-label caption>
            本站所有资源均由网友自发提供，本站不存储任何资源，仅供于学习，请于下载24小时后自行删除
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-footer>
  </q-layout>
</template>

<script>
// import { fabYoutube } from '@quasar/extras/fontawesome-v5';
import { Screen } from 'quasar';
import 'src/config';

export default {
  name: 'MainLayout',

  data() {
    return {
      searchKey: '',
      host: global.config.domain,
      itemPadding: Screen.gt.sm ? 'q-py-none' : 'q-py-xs',
    };
  },

  mounted() {
    console.log('YunpanLayout mounted');
    if (this.$q.localStorage.has('userInfo')) {
      let userInfo = this.$q.localStorage.getItem('userInfo');
      console.log(userInfo);
      if (userInfo !== undefined && userInfo !== null) {
        this.userName = userInfo.nickname;
        this.isLogin = true;
        if (userInfo.avatar != null && userInfo.avatar != '') {
          this.avatar = userInfo.avatar;
        }
      }
    }
  },

  // beforeRouteUpdate(to, from, next) {
  //   console.log('beforeRouteUpdate');
  //   next();
  // },
  methods: {
    search() {
      let randomNum = Math.random();
      this.$router
        .push({
          path: '/yunpan/search',
          query: { q: this.searchKey, x: randomNum },
        })
        .catch((err) => {
          err;
        });
    },
  },
};
</script>
