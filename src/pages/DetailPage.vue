<template>
  <q-page>
    <div class="row">
      <div class="col-1 column" style="height: 1050px">
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

        <div class="col-4" />
      </div>
      <div class="col column bg-secondary">
        <q-breadcrumbs separator="---" class="text-orange col-1" active-color="secondary">
          <q-breadcrumbs-el icon="home" />
          <q-breadcrumbs-el label="Components" icon="widgets" />
          <q-breadcrumbs-el label="Breadcrumbs" icon="navigation" />
        </q-breadcrumbs>
        <div class="row col-3">
          <div class="col-auto">
            <q-img
              src="~assets/34ee33aae94f7a8a8c8c6314a735c65e2cab6a4f.jpg"
              width="270px"
              height="270px"
            />
          </div>
          <div class="column col q-pa-sm">
            <div class="col-auto text-h6">{{ detail.title }}</div>
            <div class="col-2 text-accent text-h6 text-weight-bold">{{ detail.priceText }}</div>
            <div class="col-2">{{ detail.label }}</div>
            <div class="col"><q-btn color="black" label="去购买" /></div>
          </div>
        </div>
        <div class="col q-mt-sm">
          {{ detail.detail }}
        </div>
      </div>
      <div class="col-3 bg-yellow column"></div>
    </div>
    <!-- <div class="bg-yellow">
      <div class="row items-center justify-center">
        <div class="bg-red col-9">First column</div>
        <div class="bg-blue col-4">Second column</div>
        <div class="bg-blue col-5">Third column</div>
      </div>
    </div> -->

    <!-- <div class="row items-end content-center">
      <div class="col-1 bg-red">two thirds cvvvvvvvvvvvvvvvvvddddddddddddddfkgiruytiifffffff</div>
      <div class="col-2 bg-blue self-start">one sixth</div>
      <div class="col-auto bg-yellow">auto size</div>
      <div class="col-10 bg-green">fills</div>
    </div>
    <div class="row">
      <div class="col-xs-12 col-sm-6 col-md-4 bg-red">col</div>
      <div class="col-xs-12 col-sm-6 col-md-4 bg-blue">col</div>
      <div class="col-xs-12 col-sm-6 col-md-4 bg-yellow">col</div>
    </div> -->
  </q-page>
</template>

<script>
import 'src/config';

export default {
  name: 'DetailPage',
  data() {
    return {
      detail: {},
      turnInOrNot: 'turned_in_not',
      comment: 'comment',
    };
  },
  props: ['id'],
  mounted() {
    this.getItemDetail(this.id);
  },
  methods: {
    getItemDetail(id) {
      this.$axios.post(`${global.config.domain}/goods/detail`, { id: id }).then((res) => {
        console.log(res.data.data);

        this.detail = res.data.data;
      });
    },
    turnInOrNotClick() {},
    commentClick() {},
  },
};
</script>
