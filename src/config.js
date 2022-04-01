const domainDev = 'localhost'; // 测试环境
const domainPro = 'hjdang.com'; // 生产环境

let mobileSite = '';
let domain = '';
let shareDomain = '';
const imageDomain = '';
let isProEnv = false;
const fullCurrentDomain = window.location.href;

domain = 'http://localhost:8238';

if (fullCurrentDomain.indexOf(domainDev) > -1) {
  // 测试环境
  domain = 'http://localhost:8238';
  // domain = 'https://web.hjdang.com';
} else if (fullCurrentDomain.indexOf(domainPro) > -1) {
  // 生产环境
  domain = 'https://web.hjdang.com';
} else {
  // 本地调试
  domain = 'http://192.168.1.100:8238';
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
};

// console.log('+++++++');
// console.log(global);

// console.log(domainDev);

// export default global.config;
