<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App',

  mounted() {
    //解决iphone移动端的延迟
    // FastClick.attach(document.body);
    console.log('App mounted');
    // 腾讯广告全局申明只需运行一次

    // this.selectedTab = 'main';
    // this.getItemList();
    // console.log(this.$router.options.scrollBehavior);

    // this.windowWidth = window.innerWidth;
    // window.onresize = () => {
    //   this.windowWidth = window.innerWidth;
    // };
  },
};
</script>
