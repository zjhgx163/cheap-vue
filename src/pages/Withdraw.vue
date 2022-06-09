<template>
  <div>
    <q-list class="q-px-sm q-pt-sm dense bg-secondary">
      <q-item-label header class="q-pt-sm q-pb-none text-black">
        <q-icon name="attach_money" class="text-green" />提现金额</q-item-label
      >

      <q-item dense>
        <q-item-section>
          <q-input
            v-model="withdrawAmount"
            type="number"
            :error="overMaxNumber"
            dense
            clearable
            label="请输入提现金额"
            error-message="金额超出可提余额"
          >
            <template v-slot:prepend>
              <q-icon name="payment" />
            </template>
          </q-input> </q-item-section
      ></q-item>
      <div></div>

      <q-item-label header class="q-pt-md text-black"
        ><q-icon name="attach_money" class="text-green" />提现方式</q-item-label
      >
      <q-item dense class="q-pt-none">
        <q-item-section>
          <div class="q-gutter-y-md">
            <q-btn-toggle
              v-model="model"
              spread
              no-caps
              unelevated
              toggle-color="green"
              color="white"
              text-color="green"
              class="my-custom-toggle"
              :options="[
                { label: '微信收款码', value: '1' },
                { label: '人工转账', value: '2' },
              ]"
            />
          </div>
        </q-item-section>
      </q-item>
      <q-carousel
        v-model="model"
        transition-prev="slide-right"
        transition-next="slide-left"
        animated
        control-color="primary"
        class="rounded-borders"
      >
        <q-carousel-slide name="1" class="column q-pt-none no-wrap">
          <div
            class="row items-center"
            v-if="
              userInfo.userWechatReceiveMoneyQr != null && userInfo.userWechatReceiveMoneyQr != ''
            "
          >
            <q-item-label caption>
              <q-icon name="done" color="green text-bold" />收款码已上传</q-item-label
            >
          </div>
          <div v-else>
            <div class="text-caption">
              请上传微信收款码<strong>(注意不是付款码,请点击最下面操作提示)</strong>
            </div>
            <q-uploader
              :url="`${host}/user/wechatqr/upload?userId=${userInfo.userId}`"
              color="green"
              label="请上传微信收款码"
              flat
              auto-upload
              fieldName="file"
              max-file-size="1024000"
              @rejected="onRejected"
              :filter="checkFileSize"
              accept=".jpg, image/*"
              class="q-py-xs"
              @uploaded="onUploaded"
              @failed="onFailed"
            />
            <q-item-label caption>
              <q-icon name="info_outline" color="orange" />提现说明</q-item-label
            >
            <q-item-label caption class="q-pt-xs">
              微信收款码是用来收款的，不会有资金风险。本站没有能力也不会利用用户的收款码进行非法洗钱活动，请放心上传。</q-item-label
            >
            <q-item-label caption class="q-pt-xs">
              如果对上传收款码有顾虑，可以选择<strong>人工转账</strong>方式。请加客服好友。</q-item-label
            >
            <q-item-label caption class="q-pt-xs">
              <router-link
                :to="{
                  path: '/contact',
                }"
              >
                微信加客服好友
              </router-link>
            </q-item-label>
            <q-item-label caption class="q-pt-md text-weight-medium">
              <q-icon name="help_outline" color="orange" />
              <router-link
                :to="{
                  path: '/help',
                }"
              >
                操作提示
              </router-link>
            </q-item-label>
          </div>
          <q-item-label class="q-pt-md text-weight-medium justify-center column items-center">
            <q-btn
              color="accent"
              text-color="white"
              unelevated
              class="flex-center"
              rounded
              label="预计一个工作日到账，确认提现"
              @click="withdraw"
            />
          </q-item-label>
        </q-carousel-slide>
        <q-carousel-slide name="2" class="column no-wrap q-pt-none">
          <div class="q-mt-xs text-center">
            请
            <router-link
              :to="{
                path: '/contact',
              }"
            >
              微信加客服好友
            </router-link>
            ，给您人工转账。
          </div>
          <q-item-label class="q-pt-md text-weight-medium justify-center column items-center">
            <q-btn
              color="accent"
              text-color="white"
              unelevated
              class="flex-center"
              rounded
              label="预计一个工作日到账，确认提现"
              @click="withdraw"
            />
          </q-item-label>
        </q-carousel-slide>
      </q-carousel>
      <q-separator />
    </q-list>
  </div>
</template>

<script>
// inside of a Vue file

export default {
  props: ['userInfo'],
  data() {
    return {
      model: '1',
      withdrawAmount: '',
      host: global.config.domain,
    };
  },
  computed: {
    overMaxNumber: function () {
      if (this.withdrawAmount != '' && this.withdrawAmount > this.userInfo.withdrawableAmount) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    checkFileSize(files) {
      return files.filter((file) => file.size < 1024000);
    },
    onUploaded(info) {
      let response = JSON.parse(info.xhr.response);
      console.log(response.data.accessPath);
      this.userInfo.userWechatReceiveMoneyQr = response.data.accessPath;
      // Notify plugin needs to be installed
      // https://quasar.dev/quasar-plugins/notify#Installation
      this.$q.notify({
        type: 'positive',
        message: '文件上传成功',
      });
    },
    onFailed(object) {
      // Notify plugin needs to be installed
      // https://quasar.dev/quasar-plugins/notify#Installation
      this.$q.notify({
        type: 'negative',
        message: '文件上传失败',
      });
    },
    onRejected(object) {
      // Notify plugin needs to be installed
      // https://quasar.dev/quasar-plugins/notify#Installation
      this.$q.notify({
        type: 'negative',
        message: `${rejectedEntries.length} 文件不能超过1M`,
      });
    },
    withdraw() {
      if (this.withdrawAmount == '') {
        this.$q.notify({
          type: 'negative',
          message: '请输入提现金额',
        });
        return;
      } else if (this.withdrawAmount <= 0) {
        this.$q.notify({
          type: 'negative',
          message: '请输入正确的金额',
        });
        return;
      } else if (this.withdrawAmount > this.userInfo.withdrawableAmount) {
        this.$q.notify({
          type: 'negative',
          message: '金额超过了可提现金额',
        });
        return;
      }
      this.$q.loading.show({
        delay: 400, // ms
      });
      this.$axios
        .post(`${global.config.domain}/user/withdraw/apply`, {
          userId: this.userInfo.userId,
          amount: this.withdrawAmount,
          type: this.model,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.code != 0) {
            this.$q.notify({
              type: 'negative',
              message: `${res.data.msg}`,
            });
          } else {
            this.$q.notify({
              type: 'positive',
              message: '提现申请已提交，请等待到账',
            });
          }
          this.$q.loading.hide();
        });
    },
  },
};
</script>

<style lang="sass" scoped>
.my-custom-toggle
  border: 1px solid #4caf50
</style>
