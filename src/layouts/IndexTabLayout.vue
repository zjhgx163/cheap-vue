<template>
  <q-layout>
    <q-toolbar class="bg-secondary justify-between">
      <q-tabs
        v-model="selectedTab"
        style="font-size: 16px"
        align="left"
        active-color="accent"
        indicator-color="accent"
      >
        <q-route-tab to="/" label="首页" name="main" />
        <q-route-tab to="/cheap" label="白菜" name="cheap" />
        <q-route-tab to="/rank" label="排行榜" name="rank" />
      </q-tabs>
      <!-- <q-space /> -->
      <q-btn-dropdown color="secondary" text-color="grey" flat :label="sort">
        <q-list>
          <q-item clickable v-close-popup @click="onItemClick">
            <q-item-section>
              <q-item-label>推荐排序</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup @click="onItemClick">
            <q-item-section>
              <q-item-label>时间排序</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </q-toolbar>
    <q-page-container>
      <router-view :key="$route.path"></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data() {
    return {
      selectedTab: 'main',
      sort: '推荐排序',
    };
  },

  mounted() {
    this.selectedTab = 'main';
  },

  methods: {
    onItemClick() {},
  },
};
</script>
