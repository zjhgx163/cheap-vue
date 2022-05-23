<template>
  <q-layout>
    <q-tabs
      align="left"
      active-color="accent"
      indicator-color="accent"
      content-class="text-grey-10"
    >
      <q-route-tab
        :to="{
          path: '/my/orderlist/all',
          query: { userId: $route.query.userId, status: $route.query.status },
        }"
        label="全部订单"
        name="all"
      />
      <q-route-tab
        :to="{
          path: '/my/orderlist/unbalanced',
          query: { userId: $route.query.userId, status: $route.query.status },
        }"
        label="未结算"
        name="unbalanced"
      />
      <q-route-tab
        :to="{
          path: '/my/orderlist/balanced',
          query: { userId: $route.query.userId, status: $route.query.status },
        }"
        label="已结算"
        name="balanced"
      />
    </q-tabs>
    <q-page-container class="bg-primary">
      <router-view :key="$route.fullPath" ref="order-list"> </router-view>
    </q-page-container>
  </q-layout>
</template>
<script>
// import HotList from '../components/HotList.vue';
export default {
  // computed: {
  //   isBigScreen: function () {
  //     return this.$refs['goods-list'].isBigScreen;
  //   },
  // },

  mounted() {
    console.log('OrderLayout mounted');
  },

  // components: {
  //   HotList,
  // },
};
</script>
