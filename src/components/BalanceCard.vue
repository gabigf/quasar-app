<template>
  <div>
    <div class="row q-mb-sm q-px-md q-py-sm shadow-up-3">
      <div class="col text-grey-7 text-h6">Balance:</div>
      <div :class="useAmountColorClass(balance)" class="col text-h6 text-right">
        {{ useCurrencyFormatter(balance) }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useCurrencyFormatter } from "../use/useCurrencyFormatter.js";
import { useAmountColorClass } from "../use/useAmountColorClass.js";

defineOptions({
  name: "BalanceCard",
});

const props = defineProps({
  transactions: Object,
});

const balance = computed(() => {
  return props.transactions.reduce((acc, { amount }) => {
    return acc + amount;
  }, 0);
});
</script>
