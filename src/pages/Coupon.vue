<template>
  <q-page class="bg-primary">
    <q-separator />
    <q-tabs
      align="center"
      active-color="accent"
      indicator-color="accent"
      content-class="text-grey-10 bg-secondary"
    >
      <q-route-tab
        v-for="tab in tabs"
        :name="tab.tabId"
        :to="`/coupon/${tab.tabId}`"
        :label="tab.text"
        v-bind:key="tab.tabId"
      />
      <!-- <q-route-tab to="/cheap" label="白菜" name="cheap" />
      <q-route-tab to="/rank" label="排行榜" name="rank" /> -->
    </q-tabs>
    <!-- <q-separator /> -->

    <q-list class="bg-primary">
      <q-item
        v-for="item in couponList"
        v-bind:key="item.activityId"
        v-ripple
        class="row justify-center"
      >
        <a
          target="_blank"
          class="row justify-center items-center bg-secondary q-pa-xs"
          :href="`${host}/coupon/go/${item.activityId}`"
        >
          <img
            v-bind:src="item.image"
            class="justify-center items-center"
            style="width: 95%; height: 95%"
          />
        </a>
      </q-item>

      <!-- <q-separator /> -->
    </q-list>
  </q-page>
</template>

<script>
import 'src/config';

export default {
  name: 'Coupon',
  data() {
    return {
      couponList: [],
      tabs: [],
      host: global.config.domain,
      isSearchHidden: true,
      selectedTab: '0',
    };
  },

  mounted() {
    console.log('Coupon mounted');
    this.getCouponList();
  },

  created() {
    console.log('Coupon created');
  },

  methods: {
    getCouponList() {
      this.$axios
        .post(`${global.config.domain}/coupon/h5/list`, { tabId: this.$route.params.tabId })
        .then((res) => {
          console.log(res.data);

          this.couponList = res.data.list;
          this.tabs = res.data.tabs;
          this.selectedTab = '0';
        });
    },
  },
};
</script>
