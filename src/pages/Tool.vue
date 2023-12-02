<template>
  <q-page class="column items-center">
    <div class="bg-secondary q-pt-sm q-ma-none" style="width: 100%; max-width: 730px">
      <q-form @submit="onSubmit" autofocus class="q-gutter-sm bg-primary q-py-lg">
        <div class="q-ma-none" style="max-width: 700px">
          <q-input
            autofocus
            filled
            hint="每条链接单独一行,最多5条.目前只支持京东"
            v-model="goodsUrl"
            placeholder="示例如下：
https://item.m.jd.com/product/10065379423535.html
https://item.m.jd.com/product/10065379423535.html"
            type="textarea"
            :error="!isValid"
            :error-message="errorMessage"
          />
        </div>

        <div class="q-mt-sm">
          <q-btn label="提交" type="submit" color="light-green" size="xs" :loading="isSubmitting">
            <template v-slot:loading>
              <q-spinner-facebook />
            </template>
          </q-btn>
        </div>
      </q-form>
      <div class="bg-primary">
        <q-list bordered style="max-width: 700px">
          <div v-bind:key="item.id" v-for="item in resultData" class="bg-primary text-caption">
            <div v-html="item" class="YL__convert_result q-pa-sm bg-secondary"></div>
            <q-separator dark inset />
          </div>
        </q-list>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'UserTool',
  data() {
    return {
      goodsUrl: '',
      isValid: true,
      errorMessage: '',
      user: '',
      resultData: '',
      isSubmitting: false,
    };
  },
  mounted() {
    console.log('Tool mounted');
    if (this.$q.localStorage.has('userInfo')) {
      let userInfo = this.$q.localStorage.getItem('userInfo');
      console.log(userInfo);
      this.user = userInfo;
    }
  },
  emits: ['need-login'],
  methods: {
    onSubmit() {
      if (!this.goodsUrl) {
        this.isValid = false;
        this.errorMessage = '请输入京东商品链接，每条一行';
        return;
      }
      let urls = this.goodsUrl.trim().split('\n');
      let httpRegex = /^(http|https):\/\/\S+/;
      let jdPattern = /^(http|https):\/\/\S+jd.com\/\S+/;
      let jdHkPattern = /^(http|https):\/\/\S+jd\.\S+\/product\/(\d+).(htm)l?\S+/;
      for (let i = 0; i < urls.length; i++) {
        if (!httpRegex.test(urls[i])) {
          this.isValid = false;
          this.errorMessage = urls[i] + '不是合法链接地址';
          return;
        }
        if (!jdPattern.test(urls[i]) && !jdHkPattern.test(urls[i])) {
          this.isValid = false;
          this.errorMessage = urls[i] + '不是有效京东商品链接，目前只支持京东';
          return;
        }
      }

      this.isSubmitting = true;
      this.resultData = '';
      this.$axios
        .post(`${global.config.domain}/order/converturl`, {
          content: this.goodsUrl.trim(),
          userId: this.user.userId,
        })
        .then((res) => {
          this.isSubmitting = false;
          if (res.data.code < 0) {
            if (!this.$q.localStorage.has('userInfo')) {
              if (this.isWeixin()) {
                window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa249d330e183eb43&redirect_uri=https://www.hjdang.com/auth/xxx&response_type=code&scope=snsapi_userinfo&state=tool#wechat_redirect`;
              } else {
                this.$emit('need-login');
              }
            } else {
              this.$q.notify({
                type: 'negative',
                icon: 'warning',
                message: `${res.data.msg}`,
              });
            }
          } else {
            console.log(res.data);
            this.resultData = res.data.data;
          }
        });
    },

    isWeixin() {
      let ua;
      if (process.env.CLIENT) {
        ua = window.navigator.userAgent.toLowerCase();
      } else {
        ua = this._userAgent.toLowerCase();
      }
      console.log(ua);
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style lang="sass">
.YL
  &__convert_result p
    margin: 0 0 2px
</style>
