<template>
  <q-layout>
    <div class="row">
      <div class="col">
        <router-view></router-view>
      </div>
      <div class="col-3 gt-md">
        <router-view name="hot"></router-view>
      </div>
    </div>
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
  name: 'IndexLayout',

  // components: {
  //   HotList,
  // },

  created() {
    console.log('IndexLayout created');
  },

  mounted() {
    // this.$emit('searchHidden', false);

    console.log('IndexLayout mounted');
  },
};
</script>
