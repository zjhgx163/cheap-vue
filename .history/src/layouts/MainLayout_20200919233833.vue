<template>
  <q-layout view="hHh lpR fFf">
    <q-header reveal bordered class="text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg" />
          </q-avatar>
        </q-toolbar-title>

        <q-btn dense flat round icon="menu" @click="right = !right" />
      </q-toolbar>

      <q-tabs align="left">
        <q-route-tab to="/page1" label="首页" />
        <q-route-tab to="/page2" label="白菜" />
        <q-route-tab to="/page3" label="排行榜" />
      </q-tabs>

      <q-btn class="text-brand bg-brand" color="brand" label="Fuchsia" />
    </q-header>

    <q-drawer v-model="right" side="right" overlay behavior="desktop" bordered>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer reveal bordered class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg" />
          </q-avatar>
          Title
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
export default {
  data() {
    return {
      right: false,
    };
  },
};
</script>
