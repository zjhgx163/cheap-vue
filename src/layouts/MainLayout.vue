<template>
  <q-layout view="hHh lpR fFf" class="bg-primary">
    <q-header class="bg-primary text-grey-8">
      <q-toolbar class="YL__toobar q-mb-sm bg-secondary" v-bind:class="[itemPadding]">
        <div class="row justify-between" style="width: 100%">
          <div class="col-10 col-sm-3 q-pa-xs">
            <router-link :to="{ path: '/' }">
              <q-img src="hjd.png" spinner-color="white" :width="logoWidth" />
            </router-link>
          </div>

          <!-- <q-toolbar-title shrink class="text-weight-bold"> 好价党 </q-toolbar-title> -->

          <!-- <q-space /> -->

          <!-- <div class="bg-white YL__toolbar-input-container"> -->
          <div
            class="col-2 lt-sm col-sm-auto text-overline text-italic items-center self-center text-bold YL__coupon_text_effect"
            v-bind:class="{ hidden: isCouponHidden }"
          >
            <router-link :to="{ path: '/coupon/0' }"> 领券 </router-link>
          </div>
          <div class="col-12 col-sm-8 q-px-xs q-pt-xs" v-bind:class="{ hidden: isSearchHidden }">
            <q-input
              dense
              filled
              standout="text-white"
              square
              v-model="searchKey"
              placeholder="苹果手机"
              type="search"
              class="YL__toolbar-input-container"
            >
              <template v-slot:append>
                <q-btn name="search" icon="search" unelevated @click="search" />
              </template>
            </q-input>
          </div>

          <!-- <q-space /> -->

          <!-- <div class="q-gutter-sm row no-wrap"> -->
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
          <!-- </div> -->
        </div>
      </q-toolbar>
    </q-header>
    <q-drawer show-if-above :width="300" content-class="bg-primary text-white"> </q-drawer>

    <q-page-container class="bg-primary">
      <keep-alive exclude="DetailLayout">
        <router-view />
      </keep-alive>
    </q-page-container>

    <q-drawer side="right" :width="300" show-if-above content-class="bg-primary text-white">
    </q-drawer>

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
      itemPadding: Screen.gt.sm ? 'q-py-md' : 'q-py-sm',
      isSearchHidden: false,
      isCouponHidden: false,
    };
  },
  created() {
    console.log('MainLayout created');
    this.fabYoutube = fabYoutube;
  },

  mounted() {
    console.log('MainLayout mounted');
  },

  watch: {
    /** 控制search，优惠券的展现 */
    $route(to, from) {
      console.log('to = ' + to.path);
      console.log('from = ' + from.path);
      if (to.path.indexOf('coupon') > -1) {
        this.isSearchHidden = true;
        this.isCouponHidden = true;
      } else if (to.path.indexOf('detail') > -1) {
        this.isSearchHidden = false;
        this.isCouponHidden = true;
      } else {
        this.isSearchHidden = false;
        this.isCouponHidden = false;
      }
    },
  },
  methods: {
    search() {
      this.$router
        .push({ path: 'search', name: 'search', query: { q: this.searchKey } })
        .catch((err) => {
          err;
        });
    },

    // searchShowChange(data) {
    //   this.isSearchHidden = data;
    //   this.isCouponHidden = data;
    // },
  },
};
</script>

<style lang="sass">
.YL
  &__toobar
    @media(min-width: $breakpoint-sm-max)
      padding-left: 300px
      padding-right: 300px
      font-size: 14px
  &__toolbar-input-container
    @media(min-width: $breakpoint-xs-max)
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
  &__coupon_text_effect
    text-decoration: underline black from-font;
    text-transform: uppercase;
    letter-spacing: 6px;
    display: inline-block;
    position: relative;
    font-family: 'Merriweather', serif;
    -webkit-mask-image: linear-gradient(-75deg, rgba(0,0,0,.6) 30%, #000 50%, rgba(0,0,0,.6) 70%);
    -webkit-mask-size: 200%;
    animation: shine 2s linear infinite;

@keyframes shine
  from
    -webkit-mask-position: 150%;
  to
    -webkit-mask-position: -50%;
</style>
