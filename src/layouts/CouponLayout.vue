<template>
  <q-layout>
    <q-page-container>
      <router-view :key="$route.params.tabId"></router-view>
    </q-page-container>

    <q-drawer side="right" :width="300" :breakpoint="700" show-if-above content-class="bg-primary"> </q-drawer>
  </q-layout>
</template>

<script>
export default {
  name: 'CouponLayout',

  mounted() {
    // this.$emit('searchHidden', true);
    console.log('CouponLayout mounted');
  },

  created() {
    console.log('CouponLayout created');
  },
};
</script>
