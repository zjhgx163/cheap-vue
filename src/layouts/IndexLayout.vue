<template>
  <q-layout>
    <q-tabs class="bg-secondary text-dark border q-my-xs" v-model="selectedTab" align="left">
      <q-route-tab to="/" label="首页" name="main" />
      <q-route-tab to="/cheap" label="白菜" name="cheap" />
      <q-route-tab to="/rank" label="排行榜" name="rank" />
    </q-tabs>

    <q-page-container>
      <router-view></router-view>
    </q-page-container>

    <q-drawer side="right" show-if-above content-class="column items-center bg-primary">
      <!-- <q-scroll-area
        style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd"
      > -->
      <HotList> </HotList>
      <!-- <q-list padding class="bg-secondary">
          <q-item-label header>热门推荐</q-item-label>
          <q-item v-for="item in hotList" v-bind:key="item.id" class="bg-secondary">
            <q-item-section side>
              <div>
                <router-link
                  :to="{
                    path: 'item',
                    name: 'detail',
                    params: { id: item.id },
                  }"
                >
                  <img v-bind:src="item.thumbUrl" class="YL__hot_img" />
                </router-link>
              </div>
            </q-item-section>

            <q-item-section class="column bg-secondary">
              <q-item-label lines="2" caption> {{ item.title }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div> -->

      <div class="col"></div>
      <!-- </q-scroll-area> -->

      <!-- <q-img
        class="absolute-top"
        src="https://cdn.quasar.dev/img/material.png"
        style="height: 150px"
      >
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
          <div class="text-weight-bold">Razvan Stoenescu</div>
          <div>@rstoenescu</div>
        </div>
      </q-img> -->
    </q-drawer>
  </q-layout>
</template>

<script>
import 'src/config';
import HotList from '../components/HotList.vue';

export default {
  // name: 'LayoutName',

  data() {
    return {
      selectedTab: 'main',
    };
  },

  components: {
    HotList,
  },

  mounted() {
    this.selectedTab = 'main';
  },
};
</script>
