<template>
  <div>
    <div></div>
    <q-item dense class="q-pt-none">
      <q-item-section>
        <div class="q-gutter-y-md">
          <q-btn-toggle
            v-model="model"
            spread
            no-caps
            rounded
            push
            unelevated
            toggle-color="purple"
            color="white"
            text-color="black"
            :options="[
              { label: '微信收款码', value: '1' },
              { label: '人工转账', value: '2' },
            ]"
          />
        </div>
      </q-item-section>
    </q-item>
    <q-item-label header class="q-pt-xs text-black">提现方式：</q-item-label>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: '1',
      secondModel: '2',
    };
  },
};
</script>
