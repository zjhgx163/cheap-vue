<template>
  <q-layout>
    <q-tabs
      class="bg-secondary border q-my-xs"
      v-model="selectedTab"
      style="font-size: 16px"
      align="left"
    >
      <q-route-tab to="/" label="首页" name="main" />
      <q-route-tab to="/cheap" label="白菜" name="cheap" />
      <q-route-tab to="/rank" label="排行榜" name="rank" />
    </q-tabs>

    <q-page-container>
      <router-view :key="$route.path"></router-view>
    </q-page-container>

    <q-drawer side="right" show-if-above content-class="column items-center bg-primary">
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
    </q-drawer>
  </q-layout>
</template>

<style lang="sass">
.q-tab__label
   font-size: 1.0em
</style>

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
  beforeCreate() {
    this.$q.loading.show({
      delay: 400, // ms
    });
  },

  mounted() {
    this.selectedTab = 'main';
  },
};
</script>
