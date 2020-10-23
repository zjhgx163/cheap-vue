<template>
  <div class="bg-primary">
    <q-list v-for="item in listData" v-bind:key="item.id" class="bg-secondary">
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

      <q-item v-ripple class="q-py-md">
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
              <img v-bind:src="item.thumbUrl" class="YL__index_img" />
            </router-link>
            <!-- <a target="_blank" :href="`http://localhost:8086/#/item/${item.id}`"> -->
            <!-- </a> -->
          </div>
        </q-item-section>
        <q-item-section class="column justify-between">
          <q-item-label lines="1" class="text-h6 col-2"> {{ item.title }}</q-item-label>
          <q-item-label lines="1" class="text-h6 text-accent col-2">
            {{ item.priceText }}</q-item-label
          >
          <q-item-label lines="2" class="col-auto">
            <span class="text-weight-bold">{{ item.emphsis }}</span
            >{{ item.detail }}</q-item-label
          >
          <q-item-label class="col" />

          <q-item-label class="col-2">
            <div class="row justify-between">
              <div class="col q-gutter-md">
                <q-btn
                  size="11px"
                  color="grey"
                  flat
                  round
                  :icon="thumbUpIcon"
                  @click="thumbUpClick"
                >
                  <q-badge color="secondary" align="middle" text-color="grey">0</q-badge>
                </q-btn>
                <q-btn
                  size="11px"
                  color="grey"
                  flat
                  round
                  :icon="thumbDownIcon"
                  @click="thumbDownClick"
                >
                  <q-badge color="secondary" align="middle" text-color="grey">0</q-badge>
                </q-btn>
                <q-btn
                  size="11px"
                  color="grey"
                  flat
                  round
                  :icon="turnInOrNot"
                  @click="turnInOrNotClick"
                >
                  <q-badge color="secondary" align="middle" text-color="grey">0</q-badge>
                </q-btn>
                <q-btn size="11px" color="grey" flat round :icon="comment" @click="commentClick">
                  <q-badge color="secondary" align="middle" text-color="grey">0</q-badge>
                </q-btn>
              </div>
              <div class="col-auto justify-end row">
                <q-btn color="accent" size="12px" unelevated label="去购买"> </q-btn>

                <!-- 手机适配 -->
                <!-- <div v-if="$q.platform.is.mobile">
                  <q-btn color="accent" size="10px" unelevated round label="去购买"> </q-btn>
                </div>
                <div v-else></div> -->
              </div>
            </div>

            <!-- <q-icon name="o_thumb_up" color="accent" />
            <q-icon name="turned_in_not" class="text-accent" /> -->
            <!-- <q-icon :name="matTurnedInNot" class="text-accent" style="font-size: 32px" /> -->
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-separator />

      <!-- <q-separator /> -->
    </q-list>

    <div class="q-my-xs q-pa-lg flex flex-center bg-secondary">
      <q-pagination
        v-model="current"
        size="12px"
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

<style lang="sass">
.YL
  &__index_img
    @media(max-width: $breakpoint-xs-max)
      width: 80px
      height: 80px
    @media(min-width: $breakpoint-xs-max)
      width: 180px
      height: 180px
</style>

<script>
import 'src/config';
import { matTurnedInNot } from '@quasar/extras/material-icons';
import { Platform } from 'quasar';

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
      thumbUpIcon: 'thumb_up',
      thumbDownIcon: 'thumb_down',
      turnInOrNot: 'turned_in_not',
      comment: 'comment',
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
    turnInOrNotClick() {},
    commentClick() {},
  },
};
</script>
