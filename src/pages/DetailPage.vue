<template>
  <q-page>
    <!-- 面包栏 -->
    <div class="column">
      <q-breadcrumbs active-color="black" separator="---" class="text-black col-auto q-py-md">
        <template v-slot:separator>
          <q-icon size="1.5em" name="chevron_right" color="dark" />
        </template>
        <q-breadcrumbs-el icon="home" />
        <q-breadcrumbs-el label="Components" icon="widgets" />
        <q-breadcrumbs-el label="详情" icon="navigation" />
      </q-breadcrumbs>
    </div>
    <div class="row">
      <!-- 详情页 -->
      <div class="col row">
        <div class="col-1 column items-center gt-sm" style="height: 1050px">
          <div class="col-4"></div>
          <div class="column items-center bg-secondary" style="width: 40px">
            <div class="col-auto">
              <q-btn
                size="11px"
                class="bg-secondary"
                color="grey"
                flat
                round
                :icon="turnInOrNot"
                @click="turnInOrNotClick"
              >
              </q-btn>
            </div>
            <div class="col-auto"><q-badge text-color="grey">0</q-badge></div>
            <div class="col-auto">
              <q-btn size="11px" color="grey" flat round :icon="comment" @click="commentClick" />
            </div>
            <div class="col-auto"><q-badge text-color="grey">0</q-badge></div>
          </div>
        </div>
        <div class="col column">
          <div class="col q-pa-lg bg-secondary">
            <div class="row col-3 q-gutter-md">
              <div class="col-auto">
                <q-img :src="detail.mainImageUrl" width="250px" height="250px" />
              </div>
              <div class="column col q-pa-sm">
                <div class="col-auto text-h6">{{ detail.title }}</div>
                <div class="col-2 text-accent text-h6 text-weight-bold">{{ detail.priceText }}</div>
                <div class="col-2"></div>
                <div class="col"><q-btn color="black" label="去购买" /></div>
              </div>
            </div>
            <div class="col q-mt-sm column">
              <div class="text-weight-bold">
                <p>{{ detail.emphsis }}</p>
              </div>
              <div v-html="part" v-for="part in detailParts" :key="part">
                <!-- {{ part }} -->
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 右边栏 -->
      <div class="col-3 gt-md">
        <HotList />
      </div>
    </div>
  </q-page>
</template>

<script>
import 'src/config';
import HotList from '../components/HotList.vue';

export default {
  name: 'DetailPage',
  data() {
    return {
      detail: {},
      detailParts: [],
      turnInOrNot: 'turned_in_not',
      comment: 'comment',
    };
  },
  props: ['id'],

  components: {
    HotList,
  },
  mounted() {
    this.getItemDetail(this.id);
  },
  methods: {
    getItemDetail(id) {
      this.$axios.post(`${global.config.domain}/goods/detail`, { id: id }).then((res) => {
        this.detail = res.data.data;
        this.detailParts = JSON.parse(this.detail.detail);

        console.log(this.detailParts);
      });
    },
    turnInOrNotClick() {},
    commentClick() {},
  },
};
</script>
