<!-- old way -->

<!-- 
<template>

  <div id="q-app">

    <router-view />

  </div>

</template>
 -->

<!-- NEW way -->
<template>
  <router-view />
</template>

<script>
import { useAppstateStore } from 'stores/appstate.js';

export default {
  name: 'App',

  setup() {
    console.log('App setup');
    const appStateStore = useAppstateStore();
    return { appStateStore };
  },

  mounted() {
    //解决iphone移动端的延迟
    // FastClick.attach(document.body);
    console.log('App mounted');
    console.log('～～～～～～～～～～～～～');

    if (process.env.MODE === 'capacitor') {
      const importAppPlugin = async () => {
        let { Device } = await import('@capacitor/device');

        let { App } = await import('@capacitor/app');
        App.addListener('appStateChange', ({ isActive }) => {
          console.log('App state changed. Is active?', isActive);
          //记录app运行事件，一天只记一次，记录设备信息
          if (isActive) {
            let date = new Date();
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            const dateStr = `${year}-${month}-${day}`;
            console.log(dateStr); // 输出格式化的日期和时间
            if (!this.appStateStore.isStateChangedMap.has(dateStr)) {
              const logDeviceInfo = async () => {
                const id = await Device.getId();
                const deviceInfo = await Device.getInfo();

                console.log(id);
                console.log(deviceInfo);

                this.appStateStore.isStateChangedMap.set(dateStr, true);
                this.appStateStore.fireAppEvent(id, deviceInfo);
              };
              logDeviceInfo();
            }
          }
        });
      };

      importAppPlugin();
    }

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

    // this.windowWidth = window.innerWidth;
    // window.onresize = () => {
    //   this.windowWidth = window.innerWidth;
    // };
  },

  methods: {},
};
</script>
