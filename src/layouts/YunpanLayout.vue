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
      <keep-alive>
        <router-view :key="$route.fullPath" />
      </keep-alive>
    </q-page-container>

    <q-footer bordered reveal class="bg-dark text-white">
      <div class="YL__footer row justify-evenly gt-sm YL__1200w q-pt-md">
        <div class="col-2 q-py-sm">
          <q-img
            src="https://private-david.oss-cn-beijing.aliyuncs.com/qrcode_for_laohuweinifuwu.jpeg"
            class="items-center justify-center"
            width="100px"
            height="100px"
          />
        </div>
        <div class="col q-py-sm">
          <div class="text-h6">关于</div>
          <div class="row">
            <div class="col-6">
              <div>宇宙第一性价比之王导购平台</div>
              <div>请<strong>左边</strong>扫码关注公众号享受返利和其他服务</div>
              <div>email: 82955503@qq.com</div>
            </div>
            <div class="col">
              <div>Copyright © 2020 Hjdang.com All rights reserved.</div>
              <div class="row gt-sm q-gutter-md">
                <a target="_blank" style="color: white" href="https://beian.miit.gov.cn"
                  >浙ICP备2020040769号-1</a
                >
                <a
                  style="color: white"
                  target="_blank"
                  href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33012702000426"
                  ><img src="备案图标.png" style="width: 12px; height: 12px" />

                  浙公网安备 33012702000426号
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
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
