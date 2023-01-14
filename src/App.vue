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
    // 广告示例声明
    TencentGDT.push({
      app_id: '1201538404',
      placement_id: '9034586239740871', // 广告位id，请从联盟平台广告位获取
      type: 'native', // 广告类型
      display_type: 'banner', // 广告播放类型: banner广告
      carousel: 3000, // 轮播时间，> 3000数字类型，否则轮播会被取消
      containerid: 'banner_2_0', // 广告容器
      onComplete: function (res) {
        if (res.ret == 0) {
          console.log('广告播放成功');
        } else {
          console.log('广告播放失败');
        }
      },
    });

    // H5 SDK接入全局只需运行一次
    (function () {
      var doc = document,
        h = doc.getElementsByTagName('head')[0],
        s = doc.createElement('script');
      s.async = true;
      s.src = 'https://qzs.gdtimg.com/union/res/union_sdk/page/h5_sdk/i.js';
      h && h.insertBefore(s, h.firstChild);
    })();
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
