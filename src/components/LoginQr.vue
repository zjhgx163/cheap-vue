<template>
  <q-dialog v-model="loginCard" @hide="dialogHide">
    <q-card class="YL__login_card">
      <q-card-section class="column flex-center q-pt-lg q-pb-sm">
        <div class="text-subtitle1">微信扫码登陆</div>
      </q-card-section>
      <q-card-section class="q-pt-none column flex-center">
        <div class="column flex-center" style="width: 150px; height: 150px">
          <q-spinner-facebook color="accent" size="2em" v-bind:class="{ hidden: !isLoadingQr }" />
          <q-img
            :src="wechatQr"
            position="50% 50%"
            class="flex-center"
            v-bind:class="{ hidden: isLoadingQr }"
            width="150px"
            height="150px"
            fit="cover"
          />
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none q-pb-lg column flex-center">
        <div class="text-caption text-grey">打开微信扫一扫</div>
        <div class="text-caption text-grey">关注公众号完成登陆</div>
      </q-card-section>

      <q-separator />
    </q-card>
  </q-dialog>
</template>
<style lang="sass">
.YL
  &__login_card
    width: 300px
</style>
<script>
export default {
  name: 'LoginQr',
  data() {
    return {};
  },
  props: ['isLoadingQr', 'loginCard', 'wechatQr'], // 微信auth code

  mounted() {
    console.log('LoginQr mounted');
  },

  methods: {
    dialogHide() {
      clearInterval(this.timer);
      this.isLoadingQr = false;
    },
  },
};
</script>
