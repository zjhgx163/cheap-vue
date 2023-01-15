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
    // 优量汇 H5 SDK 在线文档地址：http://developers.adnet.qq.com/doc/web/js_develop
    // 优量汇 全局命名空间申明TencentGDT对象
    // 腾讯广告全局申明只需运行一次

    window.TencentGDT = window.TencentGDT || [];
    console.log(' window.TencentGDT = window.TencentGDT');
    // // banner广告示例声明
    // TencentGDT.push({
    //   app_id: '1201538404',
    //   placement_id: '9034586239740871', // 广告位id，请从联盟平台广告位获取
    //   type: 'native', // 广告类型
    //   display_type: 'banner', // 广告播放类型: banner广告
    //   carousel: 3000, // 轮播时间，> 3000数字类型，否则轮播会被取消
    //   containerid: 'banner_2_0', // 广告容器
    //   onComplete: function (res) {
    //     if (res.ret == 0) {
    //       console.log('广告播放成功');
    //     } else {
    //       console.log('广告播放失败');
    //     }
    //   },
    // });

    // 信息流模版广告初始化
    // window.TencentGDT.push({
    //   app_id: '1201538404', // {String} - appid - 必填
    //   placement_id: '2064887249833651', // {String} - 广告位id - 必填
    //   type: 'native', // {String} - 原生广告类型 - 必填
    //   // muid_type: '1', // {String} - 移动终端标识类型，1：imei，2：idfa，3：mac号 - 选填
    //   // muid: '******', // {String} - 加密终端标识，详细加密算法见API说明 -  选填
    //   count: 1, // {Number} - 拉取广告的数量，默认是3，最高支持10 - 选填
    //   onComplete: function (res) {
    //     if (res && res.constructor === Array) {
    //       // 原生模板广告位调用 window.TencentGDT.NATIVE.renderAd(res[0], 'containerId') 进行模板广告的渲染
    //       // res[0] 代表取广告数组第一个数据
    //       // containerId：广告容器ID
    //       window.TencentGDT.NATIVE.renderAd(res[0], 'containerId');
    //       console.log('信息流广告-1');
    //     } else {
    //       // 加载广告API，如广告回调无广告，可使用loadAd再次拉取广告
    //       // 注意：拉取广告频率每分钟不要超过20次，否则会被广告接口过滤，影响广告位填充率
    //       setTimeout(function () {
    //         window.TencentGDT.NATIVE.loadAd(placement_id);
    //       }, 3000);
    //     }
    //   },
    // });

    // 检索插屏广告初始化
    window.TencentGDT.push({
      app_id: '1201538404', // {String} - appid - 必填
      placement_id: '4034072990480276', // {String} - 广告位id - 必填
      // type: 'interstitial', // {String} - 原生广告类型 - 必填
      type: 'native',
      display_type: 'interstitial', // 播放类型：插屏
      // muid_type: '1', // {String} - 移动终端标识类型，1：imei，2：idfa，3：mac号 - 选填
      // muid: '******', // {String} - 加密终端标识，详细加密算法见API说明 -  选填
      count: 1, // {Number} - 拉取广告的数量，默认是3，最高支持10 - 选填
      onComplete: function (res) {
        if (res && res.ret === 0) {
          // 原生模板广告位调用 window.TencentGDT.NATIVE.renderAd(res[0], 'containerId') 进行模板广告的渲染
          // res[0] 代表取广告数组第一个数据
          window.AdverInterstitial = res.data[0];

          // TencentGDT.NATIVE.renderAd(res.data[0]);
        } else {
          // 加载广告API，如广告回调无广告，可使用loadAd再次拉取广告
          // 注意：拉取广告频率每分钟不要超过20次，否则会被广告接口过滤，影响广告位填充率
          setTimeout(function () {
            window.TencentGDT.NATIVE.loadAd(placement_id);
          }, 3000);
        }
      },
    });

    // 云盘列表页信息流广告初始化
    window.TencentGDT.push({
      app_id: '1201538404', // {String} - appid - 必填
      placement_id: '9094884362628825', // {String} - 广告位id - 必填
      type: 'native', // {String} - 原生广告类型 - 必填
      // muid_type: '1', // {String} - 移动终端标识类型，1：imei，2：idfa，3：mac号 - 选填
      // muid: '******', // {String} - 加密终端标识，详细加密算法见API说明 -  选填
      count: 1, // {Number} - 拉取广告的数量，默认是3，最高支持10 - 选填
      onComplete: function (res) {
        if (res && res.constructor === Array) {
          // 原生模板广告位调用 window.TencentGDT.NATIVE.renderAd(res[0], 'containerId') 进行模板广告的渲染
          // res[0] 代表取广告数组第一个数据
          // containerId：广告容器ID
          // window.TencentGDT.NATIVE.renderAd(res[0], 'flowAdverYunpanId');
          window.AdverNativeTemplate = res[0];
          console.log('信息流广告-2');
        } else {
          // 加载广告API，如广告回调无广告，可使用loadAd再次拉取广告
          // 注意：拉取广告频率每分钟不要超过20次，否则会被广告接口过滤，影响广告位填充率
          setTimeout(function () {
            window.TencentGDT.NATIVE.loadAd(placement_id);
          }, 3000);
        }
      },
    });

    // 云盘详情页插入广告
    window.TencentGDT.push({
      app_id: '1201538404', // {String} - appid - 必填
      placement_id: '4054888219125381', // {String} - 广告位id - 必填
      type: 'native', // {String} - 原生广告类型 - 必填
      // muid_type: '1', // {String} - 移动终端标识类型，1：imei，2：idfa，3：mac号 - 选填
      // muid: '******', // {String} - 加密终端标识，详细加密算法见API说明 -  选填
      count: 1, // {Number} - 拉取广告的数量，默认是3，最高支持10 - 选填
      onComplete: function (res) {
        if (res && res.constructor === Array) {
          // 原生模板广告位调用 window.TencentGDT.NATIVE.renderAd(res[0], 'containerId') 进行模板广告的渲染
          // res[0] 代表取广告数组第一个数据
          // containerId：广告容器ID
          // window.TencentGDT.NATIVE.renderAd(res[0], 'yunpanDetailAdvert');
          window.AdverDetailInsert = res[0];
        } else {
          // 加载广告API，如广告回调无广告，可使用loadAd再次拉取广告
          // 注意：拉取广告频率每分钟不要超过20次，否则会被广告接口过滤，影响广告位填充率
          setTimeout(function () {
            window.TencentGDT.NATIVE.loadAd(placement_id);
          }, 3000);
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

    // this.windowWidth = window.innerWidth;
    // window.onresize = () => {
    //   this.windowWidth = window.innerWidth;
    // };
  },
};
</script>
