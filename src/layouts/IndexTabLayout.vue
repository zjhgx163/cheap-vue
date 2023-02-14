<template>
  <q-layout>
    <q-toolbar class="bg-secondary justify-between">
      <q-tabs
        v-model="selectedTab"
        dense
        align="left"
        active-color="accent"
        indicator-color="accent"
        content-class="text-grey-10"
      >
        <q-route-tab to="/" label="首页" name="main" />
        <q-route-tab to="/cheap" label="白菜" name="cheap" />
        <q-route-tab to="/rank" label="排行榜" name="rank" />
      </q-tabs>
      <!-- <q-space /> -->
      <q-btn-dropdown color="secondary" text-color="grey" flat dense :label="sort">
        <q-list>
          <q-item clickable v-close-popup @click="onItemClick" tabindex="2">
            <q-item-section>
              <q-item-label caption>时间排序</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable v-close-popup @click="onItemClick" tabindex="1">
            <q-item-section>
              <q-item-label caption>推荐排序</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </q-toolbar>
    <!-- <q-page-container> -->
    <!-- <keep-alive>
        <router-view
          :key="$route.fullPath"
          ref="goods-list"
          :sort="sortIndex"
          v-if="$route.meta.keepAlive"
        >
        </router-view>
      </keep-alive>
      <router-view
        :key="$route.fullPath"
        ref="goods-list"
        :sort="sortIndex"
        v-if="!$route.meta.keepAlive"
      >
      </router-view> -->
    <q-page-container class="bg-primary">
      <keep-alive>
        <router-view :key="$route.fullPath" ref="goods-list" :sort="sortIndex"> </router-view>
      </keep-alive>
    </q-page-container>

    <!-- </q-page-container> -->
  </q-layout>
</template>

<script>
// import HotList from '../components/HotList.vue';
export default {
  name: 'IndexTabLayout',
  data() {
    return {
      selectedTab: 'main',
      sort: '时间排序',
      sortIndex: 2,
    };
  },
  // computed: {
  //   isBigScreen: function () {
  //     return this.$refs['goods-list'].isBigScreen;
  //   },
  // },
  created() {
    console.log('IndexTabLayout created');
  },

  mounted() {
    console.log('IndexTabLayout mounted');
    this.selectedTab = 'main';
  },

  methods: {
    onItemClick(event) {
      this.sort = event.currentTarget.getAttribute('tabindex') == 2 ? '时间排序' : '推荐排序';
      this.sortIndex = event.currentTarget.getAttribute('tabindex');
      // 用$refs是非reactive,sortIndex变了但：sort="sortIndex"这里不会改变getItemList里的参数sort的值，所以只能加一个参数this.sortIndex传过去
      this.$refs['goods-list'].getItemList(this.sortIndex);
    },
  },

  // components: {
  //   HotList,
  // },
};
</script>
