package org.capacitor.hjdang;

import android.app.Activity;
import android.content.Context;
import android.os.Bundle;
import android.provider.Settings;
import android.widget.ImageView;

//import com.bytedance.mtesttools.api.TTMediationTestTool;
//import com.bytedance.sdk.openadsdk.AdSlot;
//import com.bytedance.sdk.openadsdk.TTAdConfig;
//import com.bytedance.sdk.openadsdk.TTAdConstant;
//import com.bytedance.sdk.openadsdk.TTAdNative;
//import com.bytedance.sdk.openadsdk.TTAdSdk;
//import com.bytedance.sdk.openadsdk.TTCustomController;
//import com.bytedance.sdk.openadsdk.TTFullScreenVideoAd;
//import com.bytedance.sdk.openadsdk.mediation.ad.MediationAdSlot;
//import com.bytedance.sdk.openadsdk.mediation.init.MediationPrivacyConfig;
//import com.bytedance.sdk.openadsdk.mediation.manager.MediationAdEcpmInfo;
//import com.bytedance.sdk.openadsdk.mediation.manager.MediationBaseManager;
import com.example.myapp.EchoPlugin;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Logger;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
//    registerPlugin(EchoPlugin.class);
    super.onCreate(savedInstanceState);
    // Context applicationContext = getApplicationContext();
    // getAndroidId(applicationContext);

    // initMediationAdSdk(applicationContext);
    // launchMediationTestTool(applicationContext);
  }

//  private String getAndroidId(Context context){
//
//    String androidId = Settings.Secure.getString(context.getContentResolver(), Settings.Secure.ANDROID_ID);
//    Logger.info( "Android Id is ", "#####" +androidId + "######");
//    return androidId;
//  }

  //初始化聚合sdk
//  private void initMediationAdSdk(Context context) {
//    TTAdSdk.init(context, buildConfig(context));
//    TTAdSdk.start(new TTAdSdk.Callback() {
//      @Override
//      public void success() {
//        Logger.info( "initMediationAdSdk success");
//        //初始化成功
//        //在初始化成功回调之后进行广告加载
//        loadInterstitialFullAd(MainActivity.this);
//      }
//
//      @Override
//      public void fail(int i, String s) {
//        //初始化失败
//        Logger.info( "initMediationAdSdk fail",String.valueOf(i) + s);
//      }
//    });
//  }

  // 构造TTAdConfig
//  private TTAdConfig buildConfig(Context context) {
//    return new TTAdConfig.Builder()
//      .appId("5741158") //APP ID
//      .appName("好家当测试") //APP Name
//      .useMediation(true)  //开启聚合功能
//      .debug(true)  //关闭debug开关
//      .themeStatus(0)  //正常模式  0是正常模式；1是夜间模式；
//      /**
//       * 多进程增加注释说明：V>=5.1.6.0支持多进程，如需开启可在初始化时设置.supportMultiProcess(true) ，默认false；
//       * 注意：开启多进程开关时需要将ADN的多进程也开启，否则广告展示异常，影响收益。
//       * CSJ、gdt无需额外设置，KS、baidu、Sigmob、Mintegral需要在清单文件中配置各家ADN激励全屏xxxActivity属性android:multiprocess="true"
//       */
//      .supportMultiProcess(true)  //支持多进程
//      .customController(getTTCustomController())  //设置隐私权
//      .build();
//  }
  //设置隐私合规
//  private TTCustomController getTTCustomController() {
//    return new TTCustomController() {
//      @Override
//      public boolean isCanUseLocation() {  //是否授权位置权限
//        return true;
//      }
//
//      @Override
//      public boolean isCanUsePhoneState() {  //是否授权手机信息权限
//        return true;
//      }
//
//      @Override
//      public boolean isCanUseWifiState() {  //是否授权wifi state权限
//        return true;
//      }
//
//      @Override
//      public boolean isCanUseWriteExternal() {  //是否授权写外部存储权限
//        return true;
//      }
//
//      @Override
//      public boolean isCanUseAndroidId() {  //是否授权Android Id权限
//        return true;
//      }
//
//      @Override
//      public MediationPrivacyConfig getMediationPrivacyConfig() {
//        return new MediationPrivacyConfig() {
//          @Override
//          public boolean isLimitPersonalAds() {  //是否限制个性化广告
//            return false;
//          }
//
//          @Override
//          public boolean isProgrammaticRecommend() {  //是否开启程序化广告推荐
//            return true;
//          }
//        };
//      }
//    };
//  }

  //构造插全屏广告的Adlsot
//  private AdSlot buildInterstitialFullAdSlot() {
//    return new AdSlot.Builder()
//      .setCodeId("103644553")  //广告位ID
//      .setOrientation(TTAdConstant.VERTICAL)  //设置方向
//      .setMediationAdSlot(
//        new MediationAdSlot.Builder()
//          .setMuted(false)
//          .build()
//      )
//      .build();
//  }


  //加载插全屏广告
//  private void loadInterstitialFullAd(Activity act) {
//    TTAdNative adNativeLoader = TTAdSdk.getAdManager().createAdNative(act);
//    adNativeLoader.loadFullScreenVideoAd(buildInterstitialFullAdSlot(), new TTAdNative.FullScreenVideoAdListener() {
//      @Override
//      public void onError(int errorCode, String errorMsg) {
//        Logger.info( "loadInterstitialFullAd error",String.valueOf(errorCode) + ":" +errorMsg);
//        //广告加载失败
//      }
//
//      @Override
//      public void onFullScreenVideoAdLoad(TTFullScreenVideoAd ttFullScreenVideoAd) {
//        //广告加载成功
//        Logger.info( "loadInterstitialFullAd success");
//      }
//
//      @Override
//      public void onFullScreenVideoCached() {
//        //广告缓存成功 此api已经废弃，请使用onFullScreenVideoCached(TTFullScreenVideoAd ttFullScreenVideoAd)
//      }
//
//      @Override
//      public void onFullScreenVideoCached(TTFullScreenVideoAd ttFullScreenVideoAd) {
//        //广告缓存成功 在此回调中进行广告展示
//        Logger.info( "onFullScreenVideoCached success");
//        showInterstitialFullAd(act, ttFullScreenVideoAd);
//      }
//    });
//  }


  //展示插全屏广告
//  private void showInterstitialFullAd(Activity activity, TTFullScreenVideoAd ttFullScreenVideoAd) {
//    if (activity == null || ttFullScreenVideoAd == null) {
//      return;
//    }
//
//    ttFullScreenVideoAd.setFullScreenVideoAdInteractionListener(new TTFullScreenVideoAd.FullScreenVideoAdInteractionListener() {
//      @Override
//      public void onAdShow() {
//        //广告展示
//        MediationBaseManager manager = ttFullScreenVideoAd.getMediationManager();
//        //获取展示广告相关信息，需要再show回调之后进行获取
//        if (manager != null && manager.getShowEcpm() != null) {
//          MediationAdEcpmInfo showEcpm = manager.getShowEcpm();
//          String ecpm = showEcpm.getEcpm(); //展示广告的价格
//          String sdkName = showEcpm.getSdkName();  //展示广告的adn名称
//          String slotId = showEcpm.getSlotId(); //展示广告的代码位ID
//        }
//      }
//
//      @Override
//      public void onAdVideoBarClick() {
//        //广告点击
//      }
//
//      @Override
//      public void onAdClose() {
//        //广告关闭
//      }
//
//      @Override
//      public void onVideoComplete() {
//        //广告视频播放完成
//      }
//
//      @Override
//      public void onSkippedVideo() {
//        //广告跳过
//      }
//    });
//    ttFullScreenVideoAd.showFullScreenVideoAd(activity); //展示插全屏广告
//  }

  /********************  启动UI测试工具  ********************/
// 启动UI测试工具 **请在测试环境中使用，切勿将测试工具带到生产环境**
//  private void launchMediationTestTool(Context context) {
//    TTMediationTestTool.launchTestTools(context, new TTMediationTestTool.ImageCallBack() {
//      @Override
//      public void loadImage(ImageView imageView, String imageUrl) {
//        // 加载图片到imageView
//        Logger.info( "test loadImage",imageUrl);
//      }
//    });
//  }
}



