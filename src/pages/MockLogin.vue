<template>
  <div></div>
</template>
<script>
export default {
  emits: ['logined'],
  mounted() {
    //解决iphone移动端的延迟
    // FastClick.attach(document.body);
    // this.selectedTab = 'main';
    this.mockLogin();

    // this.windowWidth = window.innerWidth;
    // window.onresize = () => {
    //   this.windowWidth = window.innerWidth;
    // };
  },
  methods: {
    mockLogin() {
      this.$axios.post(`${global.config.domain}/user/mock/login`, {}).then((res) => {
        console.log(res.data);
        res.data.data.avatar = res.data.data.headimgurl;
        res.data.data.nickname = res.data.data.username;
        this.$q.localStorage.set('userInfo', res.data.data);

        this.$emit(
          'logined',
          'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLoarOibJs51bKq2H3GdlIKDEVJfycM3MbeHsKaYibN53k5OXZJ2lrX1jzxUCGVXMTR4IzgcUopBdvQ/132',
          '胡高翔'
        );
      });
    },
  },
};
</script>
