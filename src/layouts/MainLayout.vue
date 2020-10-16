<template>
  <q-layout view="lHr lpR lFr" class="bg-primary">
    <q-header elevated class="bg-primary text-grey-8 q-py-xs" height-hint="58">
      <q-toolbar class="q-py-md">
        <q-icon :name="fabYoutube" color="red" size="28px" />
        <q-toolbar-title shrink class="text-weight-bold"> 过日子 </q-toolbar-title>

        <q-space />

        <div class="YL__toolbar-input-container row no-wrap">
          <q-input
            dense
            outlined
            square
            v-model="search"
            placeholder="Search"
            class="bg-white col"
          />
          <q-btn
            class="YL__toolbar-input-btn"
            color="grey-3"
            text-color="grey-8"
            icon="search"
            unelevated
          />
        </div>

        <q-space />

        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn round dense flat color="grey-8" icon="video_call" v-if="$q.screen.gt.sm">
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
          </q-btn>
          <q-btn round flat>
            <q-avatar size="26px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
            <q-tooltip>Account</q-tooltip>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>
    <q-drawer show-if-above :width="150" :breakpoint="700" content-class="bg-primary text-white">
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-drawer
      side="right"
      :width="150"
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
      <q-toolbar>
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
  &__toolbar-input-container
    min-width: 100px
    width: 55%
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
    max-width: 1080px
</style>
