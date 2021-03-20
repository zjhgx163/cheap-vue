<template>
  <q-layout view="hHh lpR fFf" class="bg-secondary">
    <q-header bordered class="bg-secondary text-grey-8">
      <q-toolbar class="q-py-md YL__toobar">
        <router-link :to="{ path: '/' }">
          <q-img src="hjd.png" spinner-color="white" :width="logoWidth" />
        </router-link>

        <!-- <q-toolbar-title shrink class="text-weight-bold"> 好价党 </q-toolbar-title> -->

        <q-space />

        <!-- <div class="bg-white YL__toolbar-input-container"> -->
        <q-input
          dense
          standout="text-white"
          bg-color="white"
          square
          v-model="searchKey"
          placeholder="苹果手机"
          type="search"
          class="YL__toolbar-input-container"
        >
          <template v-slot:append>
            <q-btn name="search" icon="search" unelevated @click="search" />
          </template>
          <!-- <q-btn
            class="YL__toolbar-input-btn"
            color="grey-3"
            text-color="grey-8"
            icon="search"
            unelevated
          /> -->
        </q-input>
        <!-- </div> -->

        <q-space />

        <div class="q-gutter-sm row no-wrap">
          <!-- <q-btn round dense flat color="grey-8" icon="smiling-face-outline" v-if="$q.screen.gt.sm">
            <q-tooltip>Create a video or post</q-tooltip>
          </q-btn>
          <q-btn round dense flat color="grey-8" icon="apps" v-if="$q.screen.gt.sm">
            <q-tooltip>Apps</q-tooltip>
          </q-btn>
          <q-btn round dense flat color="grey-8" icon="message" v-if="$q.screen.gt.sm">
            <q-tooltip>Messages</q-tooltip>
          </q-btn>
          <q-btn round dense flat color="grey-8" icon="notifications">
            <q-badge color="red" text-color="white" floating> 2 </q-badge>
            <q-tooltip>Notifications</q-tooltip>
          </q-btn> -->
          <!-- <q-btn round flat>
            <q-avatar size="26px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
            <q-tooltip>Account</q-tooltip>
          </q-btn> -->
          <!-- <q-btn flat dense outline label="登陆" />
          <q-btn flat dense outline label="注册" /> -->
        </div>
      </q-toolbar>
    </q-header>
    <q-drawer show-if-above :width="300" :breakpoint="700" content-class="bg-primary text-white">
    </q-drawer>

    <q-page-container class="bg-primary">
      <keep-alive>
        <router-view />
      </keep-alive>
    </q-page-container>
    <!-- 
    <q-drawer
      side="right"
      :width="600"
      :breakpoint="700"
      show-if-above
      content-class="bg-primary text-white"
    >
      <HotList> </HotList>
    </q-drawer> -->

    <!-- <div class="row justify-center">
      <div class="col-8"></div>
      <div class="col">

      </div>
    </div> -->

    <q-footer reveal bordered class="bg-dark text-grey-8">
      <div class="YL__toobar YL__footer row justify-evenly gt-sm">
        <div class="col-4">
          联系我们:
          <div>email: 82955503@qq.com</div>
        </div>
        <div class="col">
          <div>Copyright © 2020 Hjdang.com All rights reserved.</div>
          <div class="row gt-sm q-gutter-md">
            <a target="_blank" href="https://beian.miit.gov.cn">浙ICP备2020040769号-1</a>
            <a
              target="_blank"
              href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33012702000426"
              ><img src="备案图标.png" style="width: 12px; height: 12px" />

              浙公网安备 33012702000426号
            </a>
          </div>
        </div>
      </div>
    </q-footer>
  </q-layout>
</template>

<script>
import { fabYoutube } from '@quasar/extras/fontawesome-v5';
import { Platform } from 'quasar';
import { Screen } from 'quasar';
import 'src/config';

export default {
  name: 'MainLayout',

  data() {
    return {
      searchKey: '',
      drawer: false,
      logoWidth: Screen.gt.sm ? '160px' : '110px',
      host: global.config.domain,
    };
  },
  created() {
    console.log('MainLayout created');
    this.fabYoutube = fabYoutube;
  },

  mounted() {
    console.log('MainLayout mounted');
  },

  // watch: {
  //   $route(to, from) {
  //     console.log('to = ' + to);
  //     console.log('from = ' + from);
  //   },
  // },
  methods: {
    search() {
      this.$router
        .push({ path: 'search', name: 'search', query: { q: this.searchKey } })
        .catch((err) => {
          err;
        });
    },
  },
};
</script>

<style lang="sass">
.YL
  &__toobar
    @media(min-width: $breakpoint-xs-max)
      padding-left: 300px
      padding-right: 300px
      font-size: 14px
  &__toolbar-input-container
    min-width: 200px
    width: 30%
    border: 2px solid #f44336
  &__footer
    color: inherit
    text-decoration: none
    font-weight: 500
    font-size: .80rem
    &:hover
      color: #000
  &__title_font_family
    font-family: PingFangSC-Medium,Dosis,Open Sans,helvetica neue,-apple-system,arial,hiragino sans gb,microsoft yahei ui,microsoft yahei,simsun,sans-serif;
  &__list_line_height
    line-height: 1.6em !important
  &__list_font_size
    font-size: 14px
</style>
