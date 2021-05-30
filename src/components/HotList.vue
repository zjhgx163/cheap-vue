<template>
  <div class="bg-primary q-px-sm gt-md">
    <q-list padding class="bg-secondary" style="max-width: 300px">
      <q-item-label header> 热门推荐</q-item-label>

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

        <q-item-section class="column bg-secondary no-wrap">
          <q-item-label :lines="2" caption> {{ item.title }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>
<style lang="sass">
.YL
  &__hot_img
      width: 80px
      height: 80px
</style>
<script>
export default {
  name: 'HotList',
  data() {
    return {
      hotList: [],
    };
  },
  mounted() {
    this.getHotList();
  },

  methods: {
    getHotList() {
      this.$axios.post(`${global.config.domain}/goods/list`, { page: 1 }).then((res) => {
        console.log(res.data.data);

        this.hotList = res.data.data.records;
      });
    },
  },
};
</script>
