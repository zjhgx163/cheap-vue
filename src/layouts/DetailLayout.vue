<template>
  <q-layout view="hHh lpR fFf" class="bg-secondary">
    <q-page-container class="bg-primary">
      <router-view />
    </q-page-container>

    <q-drawer
      side="right"
      :width="300"
      :breakpoint="700"
      show-if-above
      content-class="bg-primary text-white"
    >
    </q-drawer>
  </q-layout>
</template>

<script>
export default {
  name: 'DetailLayout',

  created() {
    console.log('DetailLayout created');
  },

  mounted() {
    console.log('DetailLayout mounted');
  },
};
</script>
