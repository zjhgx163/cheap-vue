// import something here

import Vue from 'vue';
import VueClipboard from 'vue-clipboard2';

VueClipboard.config.autoSetContainer = true;
Vue.use(VueClipboard);
// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/cli-documentation/boot-files#Anatomy-of-a-boot-file
export default async (/* { app, router, Vue ... } */) => {
  // something to do
};
