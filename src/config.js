const domainDev = 'localhost'; // 测试环境
const domainPro = process.env.ROUTE_SHOP == true ? 'mall.hjdang.com' : 'yunpan.hjdang.com'; // 生产环境微信端
let mobileSite = '';
let domain = '';
let shareDomain = '';
const imageDomain = '';
let isProEnv = false;

// const fullCurrentDomain = window.location.href;

// domain = 'http://localhost:8238';
domain = 'http://192.168.152.155:8238';
local = 'http://127.0.0.1:8238';
console.log('mode is ' + process.env.MODE);
// if (fullCurrentDomain.indexOf(domainDev) > -1) {
if (process.env.DEV) {
  // 测试环境
  // domain = 'http://192.168.1.103:8238';
  // domain = 'https://web.hjdang.com';
  // } else if (fullCurrentDomain.indexOf(domainPro) > -1) {
  // 生产环境
} else {
  isProEnv = true;

  if (process.env.MODE === 'capacitor') {
    domain = 'https://app.hjdang.com';
  } else {
    domain = 'https://web.hjdang.com';
  }
  // 本地调试
  // domain = 'http://192.168.0.108:8238';
  // websocketHost = 'http://10.0.41.110:7979/websocket';

  // domain = 'http://192.168.0.128:8238';
}

global.config = {
  version: 'v2.0', // 当前版本号
  pageSize: 15, // 列表单页数据条数
  enablePageTabs: true, // 是否开启标签页面
  mutiLanguage: true, // 是否开启多语言
  defaultLanguage: 'en', // 默认语言 cn en id 只有在开启mutiLanguage下有效
  domain,
  domainPro,
  isProEnv,
  local,
};

// if (process.env.MODE === 'capacitor') {
//   console.log('import begin');
//   import('@capacitor/preferences').then(function (result) {
//     let { Preferences } = result;
//     console.log(Preferences);
//     if (global.config) {
//       global.config.Preferences = Preferences;
//     }
//   });
// }

// console.log('+++++++');
// console.log(global);

// console.log(domainDev);

// export default global.config;
