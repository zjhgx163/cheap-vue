<template>
  <div class="q-pt-md">
    <q-list v-for="item in listData" v-bind:key="item.id">
      <!-- 
      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
        </q-item-section>
        <q-item-section>Image avatar</q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-avatar square>
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
        </q-item-section>
        <q-item-section>Image square avatar</q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-avatar rounded>
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
        </q-item-section>
        <q-item-section>Image rounded avatar</q-item-section>
      </q-item> -->

      <!-- <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-avatar rounded>
            <img src="https://cdn.quasar.dev/img/mountains.jpg" />
          </q-avatar>
        </q-item-section>
        <q-item-section>List item</q-item-section>
      </q-item> -->

      <q-item v-ripple>
        <q-item-section side>
          <div>
            <!-- 这里用router-link代替a -->

            <!-- <router-link :to="`/item/${item.id}`"> -->
            <!-- <router-link
              :to="{
                path: 'item',
                name: 'detail',
                query: { title: `${item.title}`, detail: `${item.detail}` },
              }"
            >
              <img v-bind:src="item.thumbUrl" />
            </router-link> -->
            <router-link
              :to="{
                path: 'item',
                name: 'detail',
                params: { id: item.id },
              }"
            >
              <q-img v-bind:src="item.thumbUrl" width="190px" height="190px" />
            </router-link>
            <!-- <a target="_blank" :href="`http://localhost:8086/#/item/${item.id}`"> -->
            <!-- </a> -->
          </div>
        </q-item-section>
        <q-item-section class="columne justify-between">
          <q-item-label lines="1" class="text-h6"> {{ item.title }}</q-item-label>
          <q-item-label lines="1" class="text-h6 text-accent"> {{ item.priceText }}</q-item-label>
          <q-item-label lines="2" caption>
            <span class="text-weight-bold">{{ item.emphsis }}</span
            >{{ item.detail }}</q-item-label
          >
          <q-item-label />
          <q-item-label />
          <q-item-label />

          <q-item-label>
            <q-btn flat round color="accent" :icon="thumbUpIcon" @click="thumbUpClick" />
            <q-btn flat round color="accent" :icon="thumbDownIcon" @click="thumbDownClick" />

            <q-icon name="o_thumb_up" color="accent" />
            <q-icon name="turned_in_not" class="text-accent" />
            <!-- <q-icon :name="matTurnedInNot" class="text-accent" style="font-size: 32px" /> -->
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-separator spaced />

      <!-- <q-separator /> -->
    </q-list>

    <div class="q-pa-lg flex flex-center">
      <q-pagination
        v-model="current"
        color="dark"
        :max="max"
        :max-pages="6"
        :boundary-numbers="false"
        :direction-links="true"
        @input="pageNavigate"
      >
      </q-pagination>
    </div>
  </div>
</template>

<script>
import 'src/config';
import { matTurnedInNot } from '@quasar/extras/material-icons';

console.log('1<<<<<');
console.log(global);
console.log('1>>>>>');

export default {
  name: 'PageIndex',
  data() {
    return {
      listData: [],
      current: 1,
      max: 0,
      thumbUpIcon: 'o_thumb_up',
      thumbDownIcon: 'o_thumb_down',
    };
  },
  mounted() {
    this.getItemList();

    // this.windowWidth = window.innerWidth;
    // window.onresize = () => {
    //   this.windowWidth = window.innerWidth;
    // };
  },
  methods: {
    getItemList() {
      this.$axios.post(`${global.config.domain}/goods/list`, { page: this.current }).then((res) => {
        console.log(res.data.data);

        this.listData = res.data.data.records;
        this.max = res.data.data.total / res.data.data.size + 1;
      });
    },
    pageNavigate() {
      this.$axios.post(`${global.config.domain}/goods/list`, { page: this.current }).then((res) => {
        console.log(res.data.data.records);

        this.listData = res.data.data.records;
        this.max = res.data.data.total / res.data.data.size + 1;
      });
    },
    thumbUpClick() {
      this.thumbUpIcon = 'thumb_up';
    },
    thumbDownClick() {
      this.thumbDownIcon = 'thumb_down';
    },
  },
};
</script>
