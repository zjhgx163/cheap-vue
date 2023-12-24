<template>
  <q-page class="column items-center bg-primary">
    <div class="YL__750w">
      <q-list class="q-px-sm q-my-xs bg-secondary" dense>
        <q-item dense>
          <q-item-section class="q-py-sm">
            <div class="column items-center YL__menu_text text-caption">
              <q-item-label class="text-weight-medium"
                >¥{{ userInfo.todayEstimateCommissionAmount }}</q-item-label
              >
              <q-item-label caption>今日预估</q-item-label>
            </div>
          </q-item-section>
          <q-item-section class="q-py-sm">
            <div class="column items-center YL__menu_text">
              <q-item-label class="text-weight-medium"
                >¥{{ userInfo.monthEstimateCommissionAmount }}</q-item-label
              >
              <q-item-label caption>本月预估</q-item-label>
            </div>
          </q-item-section>
          <q-item-section class="q-py-sm">
            <div class="column items-center YL__menu_text">
              <q-item-label class="text-weight-medium"
                >¥{{ userInfo.accumulativeEstimateCommissionAmount }}</q-item-label
              >
              <q-item-label caption>累计收入</q-item-label>
            </div>
          </q-item-section>
        </q-item>
        <q-separator />
        <q-item dense>
          <q-item-section class="q-py-sm">
            <div class="column items-center YL__menu_text">
              <q-item-label class="text-weight-medium"
                >¥{{ userInfo.waitEstimateCommissionAmount }}</q-item-label
              >
              <q-item-label caption>待结算</q-item-label>
            </div>
          </q-item-section>
          <q-item-section class="q-py-sm">
            <div class="column items-center YL__menu_text">
              <q-item-label class="text-weight-medium"
                >¥{{ userInfo.waitActualCommissionAmount }}</q-item-label
              >
              <q-item-label caption>待审批</q-item-label>
            </div>
          </q-item-section>
          <q-item-section class="q-py-sm">
            <div class="column items-center YL__menu_text">
              <q-item-label class="text-weight-medium"
                >¥{{ userInfo.withdrawedAmount }}</q-item-label
              >
              <q-item-label caption>已提现</q-item-label>
            </div>
          </q-item-section>
        </q-item>
      </q-list>
      <div v-if="!isBigScreen">
        <q-list class="q-px-sm q-mb-xs bg-secondary" dense>
          <q-item
            dense
            :to="{
              path: '/user/converturl',
            }"
          >
            <q-item-section avatar top class="q-py-xs">
              <q-avatar icon="savings" color="accent" text-color="white" size="2em" />
            </q-item-section>
            <q-item-section>
              <q-item-label lines="1" class="YL__menu_text">领券返利</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-icon name="chevron_right" />
            </q-item-section>
          </q-item>
          <q-separator />
          <q-item
            dense
            :to="{
              path: '/user/orderlist/all',
              query: { userId: userInfo.userId, status: '' },
            }"
          >
            <q-item-section avatar top class="q-py-xs">
              <q-avatar icon="shopping_bag" color="accent" text-color="white" size="2em" />
            </q-item-section>
            <q-item-section>
              <q-item-label lines="1" class="YL__menu_text">商品订单</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-icon name="chevron_right" />
            </q-item-section>
          </q-item>

          <q-separator />

          <q-item dense disable>
            <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
              <strong>敬请期待</strong>
            </q-tooltip>
            <q-item-section avatar top class="q-py-xs">
              <q-avatar icon="delivery_dining" color="accent" text-color="white" size="2em" />
            </q-item-section>
            <q-item-section>
              <q-item-label lines="1" class="YL__menu_text"> 外卖订单</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-icon name="chevron_right" />
            </q-item-section>
          </q-item>

          <q-separator />

          <q-item dense disable>
            <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
              <strong>敬请期待</strong>
            </q-tooltip>
            <q-item-section avatar top class="q-py-xs">
              <q-avatar icon="approval" color="accent" text-color="white" size="2em" />
            </q-item-section>
            <q-item-section>
              <q-item-label lines="1" class="YL__menu_text">结算记录 </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-icon name="chevron_right" />
            </q-item-section>
          </q-item>

          <q-separator />

          <q-item dense disable>
            <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
              <strong>敬请期待</strong>
            </q-tooltip>
            <q-item-section avatar top class="q-py-xs">
              <q-avatar icon="paid" color="accent" text-color="white" size="2em" />
            </q-item-section>
            <q-item-section>
              <q-item-label lines="1" class="YL__menu_text">提现记录 </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-icon name="chevron_right" />
            </q-item-section>
          </q-item>

          <q-separator />

          <q-item dense disable>
            <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
              <strong>敬请期待</strong>
            </q-tooltip>
            <q-item-section avatar top class="q-py-xs">
              <q-avatar icon="article" color="accent" text-color="white" size="2em" />
            </q-item-section>
            <q-item-section>
              <q-item-label lines="1" class="YL__menu_text">我的发帖 </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-icon name="chevron_right" />
            </q-item-section>
          </q-item>

          <q-separator />

          <q-item dense disable>
            <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
              <strong>敬请期待</strong>
            </q-tooltip>
            <q-item-section avatar top class="q-py-xs">
              <q-avatar icon="favorite" color="accent" text-color="white" size="2em" />
            </q-item-section>
            <q-item-section>
              <q-item-label lines="1" class="YL__menu_text">我的收藏 </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-icon name="chevron_right" />
            </q-item-section>
          </q-item>

          <q-separator />

          <q-item dense :to="{ path: '/contact' }">
            <q-item-section avatar top class="q-py-xs">
              <q-avatar icon="support_agent" color="accent" text-color="white" size="2em" />
            </q-item-section>
            <q-item-section>
              <q-item-label lines="1" class="YL__menu_text">联系客服</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-icon name="chevron_right" />
            </q-item-section>
          </q-item>
        </q-list>
      </div>
      <div v-else class="row">
        <div class="col-6">
          <q-list class="q-px-sm q-mb-xs bg-secondary" dense>
            <q-item
              dense
              :to="{
                path: '/user/converturl',
              }"
            >
              <q-item-section avatar top class="q-py-xs">
                <q-avatar icon="savings" color="accent" text-color="white" size="2em" />
              </q-item-section>
              <q-item-section>
                <q-item-label lines="1" class="YL__menu_text">领券返利</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-icon name="chevron_right" />
              </q-item-section>
            </q-item>
            <q-separator />
            <q-item
              dense
              :to="{
                path: '/user/orderlist/all',
                query: { userId: userInfo.userId, status: '' },
              }"
            >
              <q-item-section avatar top class="q-py-xs">
                <q-avatar icon="shopping_bag" color="accent" text-color="white" size="2em" />
              </q-item-section>
              <q-item-section>
                <q-item-label lines="1" class="YL__menu_text">商品订单</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-icon name="chevron_right" />
              </q-item-section>
            </q-item>
            <q-separator />
            <q-item dense disable>
              <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
                <strong>敬请期待</strong>
              </q-tooltip>
              <q-item-section avatar top class="q-py-xs">
                <q-avatar icon="delivery_dining" color="accent" text-color="white" size="2em" />
              </q-item-section>
              <q-item-section>
                <q-item-label lines="1" class="YL__menu_text"> 外卖订单</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-icon name="chevron_right" />
              </q-item-section>
            </q-item>
            <q-separator />
            <q-item dense disable>
              <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
                <strong>敬请期待</strong>
              </q-tooltip>
              <q-item-section avatar top class="q-py-xs">
                <q-avatar icon="approval" color="accent" text-color="white" size="2em" />
              </q-item-section>
              <q-item-section>
                <q-item-label lines="1" class="YL__menu_text">结算记录 </q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-icon name="chevron_right" />
              </q-item-section>
            </q-item>
          </q-list>
        </div>

        <div class="col-6">
          <q-list class="q-px-sm q-mb-xs bg-secondary" dense>
            <q-item dense disable>
              <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
                <strong>敬请期待</strong>
              </q-tooltip>
              <q-item-section avatar top class="q-py-xs">
                <q-avatar icon="paid" color="accent" text-color="white" size="2em" />
              </q-item-section>
              <q-item-section>
                <q-item-label lines="1" class="YL__menu_text">提现记录 </q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-icon name="chevron_right" />
              </q-item-section>
            </q-item>
            <q-separator />

            <q-item dense disable>
              <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
                <strong>敬请期待</strong>
              </q-tooltip>
              <q-item-section avatar top class="q-py-xs">
                <q-avatar icon="article" color="accent" text-color="white" size="2em" />
              </q-item-section>
              <q-item-section>
                <q-item-label lines="1" class="YL__menu_text">我的发帖 </q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-icon name="chevron_right" />
              </q-item-section>
            </q-item>

            <q-separator />

            <q-item dense disable>
              <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
                <strong>敬请期待</strong>
              </q-tooltip>
              <q-item-section avatar top class="q-py-xs">
                <q-avatar icon="favorite" color="accent" text-color="white" size="2em" />
              </q-item-section>
              <q-item-section>
                <q-item-label lines="1" class="YL__menu_text">我的收藏 </q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-icon name="chevron_right" />
              </q-item-section>
            </q-item>

            <q-item dense :to="{ path: '/contact' }">
              <q-item-section avatar top class="q-py-xs">
                <q-avatar icon="support_agent" color="accent" text-color="white" size="2em" />
              </q-item-section>
              <q-item-section>
                <q-item-label lines="1" class="YL__menu_text">联系客服</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-icon name="chevron_right" />
              </q-item-section>
            </q-item>
            <q-separator />
          </q-list>
        </div>
      </div>

      <q-list dense class="q-px-sm q-pt-xs bg-secondary">
        <q-item-label header class="text-black">注意事项</q-item-label>
        <q-item dense class="q-pt-none">
          <q-item-section>
            <q-item-label caption class="q-pt-none q-pb-xs">
              在下单后有一定延迟，大约5分钟后会显示
            </q-item-label>
            <q-item-label caption class="q-py-xs">
              目前支持京东，拼多多返利，其他商城暂不支持。在<a href="https://shop.hjdang.com"
                ><strong>好慢无</strong></a
              >里京东和拼多多的商品均有返利
            </q-item-label>

            <q-item-label caption class="q-py-xs"
              >如果你想购买<a href="https://shop.hjdang.com"><strong>好慢无</strong></a
              >以外的商品，操作方法京东请看<a
                href="https://mp.weixin.qq.com/s?__biz=MzkzMzIyMzU0MA==&mid=2247483916&idx=1&sn=2e36901033e066c96d44990b4b338e2f&chksm=c24e8f17f5390601ee49beb7e6f6eeba01ecfbe136e632bcc62bb40132d7ca8d595c8e91c56d&token=1826758436&lang=zh_CN#rd"
                ><strong>任意京东商品返利</strong></a
              >，拼多多请看<a
                href="https://mp.weixin.qq.com/s?__biz=MzkzMzIyMzU0MA==&mid=2247483954&idx=1&sn=0b5c8a54802d73d4da3b369d27ba151b&chksm=c24e8f29f539063fe9970ade98efe90af02b4dccf2f6f84a19576c029f6eadce6646d93abe33&token=1826758436&lang=zh_CN#rd"
                ><strong>任意拼多多商品返利</strong></a
              ></q-item-label
            >
            <q-item-label caption class="q-py-xs">
              正常订单返利结算周期一般在确认收货订单完成后20天左右
            </q-item-label>
            <!-- <q-item-label caption class="q-py-xs">
              在本站第一次购买淘宝天猫商品时，如果跳出加入会员的页面，要点“是”，否则没有返利
            </q-item-label> -->
            <q-item-label caption class="q-py-xs">
              京东的返利请<strong>不要</strong>在购买过程中使用<strong>红包和礼金</strong>，否则返利对象会变成发放红包和礼金的人。
            </q-item-label>
            <q-item-label caption class="q-py-xs">
              拼多多<strong>禁止比价行为</strong>，就是说不能用相同的账号先在APP/小程序里浏览商品然后再在公众号/网站里购买，佣金直接判为0.01。规避方法请看<a
                href="https://mp.weixin.qq.com/s?__biz=MzkzMzIyMzU0MA==&mid=2247483954&idx=1&sn=0b5c8a54802d73d4da3b369d27ba151b&chksm=c24e8f29f539063fe9970ade98efe90af02b4dccf2f6f84a19576c029f6eadce6646d93abe33&token=1826758436&lang=zh_CN#rd"
                ><strong>任意拼多多商品返利</strong></a
              >
            </q-item-label>
            <q-item-label class="q-py-md">
              如有订单未及时结算和其他问题请直接
              <router-link to="/contact"> <strong>添加客服微信</strong></router-link>
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-separator spaced />
      </q-list>
    </div>
  </q-page>
</template>

<script>
export default {
  props: ['userInfo'],
  data() {
    return {
      isBigScreen: false,
    };
  },
  mounted() {
    console.log('UserM mounted');
    let windowWidth = window.screen.width;
    if (windowWidth > 1023.99) {
      this.isBigScreen = true;
    }
  },
};
</script>
