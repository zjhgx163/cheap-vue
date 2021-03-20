<template>
  <q-layout>
    <q-page-container>
      <router-view></router-view>
    </q-page-container>

    <q-drawer side="right" :width="600" :breakpoint="700" show-if-above content-class="bg-primary">
      <HotList> </HotList>
    </q-drawer>

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
  </q-layout>
</template>

<style lang="sass">
.q-tab__label
  @media(max-width: $breakpoint-xs-max)
   font-size: 0.9em
   font-weight: 600
  @media(min-width: $breakpoint-xs-max)
   font-size: 1.0em
   font-weight: 700
</style>

<script>
import HotList from '../components/HotList.vue';

export default {
  // name: 'LayoutName',

  components: {
    HotList,
  },

  beforeCreate() {
    this.$q.loading.show({
      delay: 400, // ms
    });
  },
  created() {
    console.log('IndexLayout created');
  },

  mounted() {
    console.log('IndexLayout mounted');
  },
};
</script>
