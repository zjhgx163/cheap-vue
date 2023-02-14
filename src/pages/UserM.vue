<template>
  <div class="column items-center bg-primary">
    <div class="YL__750w">
      <q-list class="q-px-sm q-my-xs bg-secondary" dense>
        <q-item dense>
          <q-item-section class="q-py-sm">
            <div class="column items-center YL__menu_text text-caption">
              <q-item-label class="text-weight-medium">¥{{ this.userInfo.todayEstimateCommissionAmount }}</q-item-label>
              <q-item-label caption>今日预估</q-item-label>
            </div>
          </q-item-section>
          <q-item-section class="q-py-sm">
            <div class="column items-center YL__menu_text">
              <q-item-label class="text-weight-medium">¥{{ this.userInfo.monthEstimateCommissionAmount }}</q-item-label>
              <q-item-label caption>本月预估</q-item-label>
            </div>
          </q-item-section>
          <q-item-section class="q-py-sm">
            <div class="column items-center YL__menu_text">
              <q-item-label class="text-weight-medium">¥{{ this.userInfo.accumulativeEstimateCommissionAmount }}</q-item-label>
              <q-item-label caption>累计收入</q-item-label>
            </div>
          </q-item-section>
        </q-item>
        <q-separator />
        <q-item dense>
          <q-item-section class="q-py-sm">
            <div class="column items-center YL__menu_text">
              <q-item-label class="text-weight-medium">¥{{ this.userInfo.waitEstimateCommissionAmount }}</q-item-label>
              <q-item-label caption>待结算</q-item-label>
            </div>
          </q-item-section>
          <q-item-section class="q-py-sm">
            <div class="column items-center YL__menu_text">
              <q-item-label class="text-weight-medium">¥{{ this.userInfo.waitActualCommissionAmount }}</q-item-label>
              <q-item-label caption>待审批</q-item-label>
            </div>
          </q-item-section>
          <q-item-section class="q-py-sm">
            <div class="column items-center YL__menu_text">
              <q-item-label class="text-weight-medium">¥{{ this.userInfo.withdrawedAmount }}</q-item-label>
              <q-item-label caption>已提现</q-item-label>
            </div>
          </q-item-section>
        </q-item>
      </q-list>

      <q-list class="q-px-sm q-mb-xs bg-secondary" dense>
        <q-item dense :to="{ path: '/my/orderlist/all', query: { userId: this.userInfo.userId, status: '' } }">
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

      <q-list dense class="q-px-sm q-pb-none bg-secondary">
        <q-item-label header class="text-black">注意事项</q-item-label>
        <q-item dense class="q-pt-none">
          <q-item-section>
            <q-item-label caption class="q-py-xs"> 在下单后有一定延迟，大约5分钟后会显示 </q-item-label>
            <q-item-label caption class="q-py-xs"> 目前支持京东，淘宝的返利，其他商城暂不支持，拼多多不久之后加入。 </q-item-label>
            <q-item-label caption class="q-py-xs"> 可提现余额达到2元时可提现 </q-item-label>

            <q-item-label caption class="q-py-xs"> 正常订单返利结算周期一般在确认收货订单完成后14天左右 </q-item-label>
            <q-item-label caption class="q-py-xs"> 在本站第一次购买淘宝天猫商品时，如果跳出加入会员的页面，要点“是”，否则没有返利 </q-item-label>
            <q-item-label caption class="q-py-xs">
              请不要事先在京东，拼多多浏览完商品后再在本站下单买同样的商品，这样会使返利失效。一定要在本站浏览商品直接购买。
            </q-item-label>
            <q-item-label caption class="q-py-xs"> <strong>如有订单未及时结算和其他问题请直接添加客服微信 </strong></q-item-label>
          </q-item-section>
        </q-item>
        <q-separator spaced />
      </q-list>
    </div>
  </div>
</template>

<script>
export default {
  props: ['userInfo'],
};
</script>
