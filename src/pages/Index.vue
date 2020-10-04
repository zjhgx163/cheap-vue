<template>
  <div class="q-pa-md">
    <q-list v-for="item in listData" v-bind:key="item.id" bordered>
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

      <q-item clickable v-ripple>
        <q-item-section class="q-ml-none">
          <div>
            <img v-bind:src="`${item.thumbUrl}`" />
          </div>
        </q-item-section>
      </q-item>
      <!-- <q-separator /> -->
    </q-list>

    <div class="q-pa-lg flex flex-center">
      <q-pagination
        v-model="current"
        color="dark"
        :max="5"
        :direction-links="true"
        @input="pageNavigate"
      >
      </q-pagination>
    </div>
  </div>
</template>

<script>
import 'src/config';

console.log('1<<<<<');
console.log(global);
console.log('1>>>>>');

export default {
  name: 'PageIndex',
  data() {
    return {
      listData: [],
      current: 1,
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
      this.$axios
        .post(`${global.config.domain}/tbk/goods/list`, { page: this.current })
        .then((res) => {
          console.log(res.data.data);

          this.listData = res.data.data;
        });
    },
    pageNavigate() {
      this.$axios
        .post(`${global.config.domain}/tbk/goods/list`, { page: this.current })
        .then((res) => {
          console.log(res.data.data);

          this.listData = res.data.data;
        });
    },
  },
};
</script>
