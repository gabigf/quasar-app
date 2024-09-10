<template>
  <q-page>
    <div class="q-pa-md">
      <q-list bordered separator>
        <q-item v-for="entry in entries" :key="entry.id">
          <q-item-section
            :class="useAmountColorClass(entry.amount)"
            class="text-weight-bold"
          >
            <q-item-label>{{ entry.name }}</q-item-label>
          </q-item-section>

          <q-item-section
            side
            :class="useAmountColorClass(entry.amount)"
            text-weight-bold
            >{{ useCurrencyFormatter(entry.amount) }}
          </q-item-section>
        </q-item>
      </q-list>
    </div>

    <q-footer class="bg-transparent">
      <div class="row q-mb-sm q-px-md q-py-sm shadow-up-3">
        <div class="col text-grey-7 text-h6">Balance:</div>
        <div class="col text-grey-7 text-h6 text-right">+ $ 3,999.99</div>
      </div>
      <div class="row q-px-sm q-pb-sm q-col-gutter-sm bg-primary">
        <div class="col">
          <q-input outlined placeholder="Name" bg-color="white" dense />
        </div>
        <div class="col">
          <q-input
            outlined
            placeholder="Amount"
            bg-color="white"
            dense
            input-class="text-right"
            type="number"
            step="0.01"
          />
        </div>
        <div class="col col-auto">
          <q-btn round color="primary" icon="add" />
        </div>
      </div>
    </q-footer>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useCurrencyFormatter } from "../use/useCurrencyFormatter.js";
import { useAmountColorClass } from "../use/useAmountColorClass.js";

defineOptions({
  name: "EntriesPage",
});

const entries = ref([
  {
    id: "id0",
    name: "Salary",
    amount: 4999.99,
  },
  {
    id: "id1",
    name: "Rent",
    amount: -999,
  },
  {
    id: "id2",
    name: "Phone",
    amount: -14.99,
  },
  {
    id: "id3",
    name: "Unkonwn",
    amount: 0,
  },
]);
</script>
