<template>
  <q-layout view="hHh lpR fFf" class="bg-secondary">
    <q-header bordered class="bg-secondary text-grey-8" height-hint="58">
      <q-toolbar inset class="q-py-md YL__toobar">
        <q-icon :name="fabYoutube" color="red" size="28px" />
        <q-toolbar-title shrink class="text-weight-bold"> 过日子 </q-toolbar-title>

        <q-space />

        <!-- <div class="bg-white YL__toolbar-input-container"> -->
        <q-input
          dense
          outlined
          square
          v-model="search"
          placeholder="苹果手机"
          type="search"
          class="bg-white YL__toolbar-input-container"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
          <!-- <q-btn
            class="YL__toolbar-input-btn"
            color="grey-3"
            text-color="grey-8"
            icon="search"
            unelevated
          /> -->
        </q-input>
        <!-- </div> -->

        <q-space />

        <div class="q-gutter-sm row no-wrap">
          <!-- <q-btn round dense flat color="grey-8" icon="smiling-face-outline" v-if="$q.screen.gt.sm">
            <q-tooltip>Create a video or post</q-tooltip>
          </q-btn>
          <q-btn round dense flat color="grey-8" icon="apps" v-if="$q.screen.gt.sm">
            <q-tooltip>Apps</q-tooltip>
          </q-btn>
          <q-btn round dense flat color="grey-8" icon="message" v-if="$q.screen.gt.sm">
            <q-tooltip>Messages</q-tooltip>
          </q-btn>
          <q-btn round dense flat color="grey-8" icon="notifications">
            <q-badge color="red" text-color="white" floating> 2 </q-badge>
            <q-tooltip>Notifications</q-tooltip>
          </q-btn> -->
          <!-- <q-btn round flat>
            <q-avatar size="26px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
            <q-tooltip>Account</q-tooltip>
          </q-btn> -->
          <q-btn flat dense outline label="登陆" />
          <q-btn flat dense outline label="注册" />
        </div>
      </q-toolbar>
    </q-header>
    <q-drawer show-if-above :width="300" :breakpoint="700" content-class="bg-primary text-white">
    </q-drawer>

    <q-page-container class="bg-primary">
      <router-view />
    </q-page-container>

    <q-drawer
      side="right"
      :width="300"
      show-if-above
      desktop-only
      content-class="bg-primary text-white"
    >
    </q-drawer>

    <!-- <div class="row justify-center">
      <div class="col-8"></div>
      <div class="col">

      </div>
    </div> -->

    <q-footer reveal bordered class="bg-white text-grey-8">
      <q-toolbar class="YL__toobar">
        <q-toolbar-title> Title </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import { fabYoutube } from '@quasar/extras/fontawesome-v5';
export default {
  name: 'MyLayout',
  data() {
    return {
      search: '',
      drawer: false,
    };
  },
  created() {
    this.fabYoutube = fabYoutube;
  },
};
</script>

<style lang="sass">
.YL
  &__toobar
    padding-left: 300px
    padding-right: 300px
  &__toolbar-input-container
    min-width: 100px
    width: 30%
    border: 2px solid #f44336
  &__toolbar-input-btn
    border-radius: 0
    border-style: solid
    border-width: 1px 1px 1px 0
    border-color: rgba(0,0,0,.24)
    max-width: 60px
    width: 100%
  &__drawer-footer-link
    color: inherit
    text-decoration: none
    font-weight: 500
    font-size: .75rem
    &:hover
      color: #000
  &__content-inner
    margin-left: 150px
</style>
