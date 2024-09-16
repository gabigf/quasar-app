<template>
  <q-page>
    <div class="q-pa-md">
      <q-list bordered separator>
        <q-slide-item
          right-color="negative"
          v-for="entry in entries"
          :key="entry.id"
          @right="onRight($event, entry)"
        >
          <template v-slot:right>
            <q-icon name="delete" />
          </template>
          <q-item>
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
        </q-slide-item>
      </q-list>
    </div>

    <q-footer class="bg-transparent">
      <BalanceCard :transactions="entries" />
      <q-form
        @submit="addEntry"
        class="row q-pr-sm q-pb-sm q-col-gutter-sm bg-primary"
      >
        <div class="col">
          <q-input
            ref="nameRef"
            v-model="entryForm.name"
            outlined
            placeholder="Name"
            bg-color="white"
            dense
          />
        </div>
        <div class="col">
          <q-input
            v-model.number="entryForm.amount"
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
          <q-btn round color="primary" icon="add" type="submit" />
        </div>
      </q-form>
    </q-footer>
  </q-page>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useCurrencyFormatter } from "../use/useCurrencyFormatter.js";
import { useAmountColorClass } from "../use/useAmountColorClass.js";
import { useQuasar, uid, QItemLabel, Notify } from "quasar";
import DOMPurify from "dompurify";
import BalanceCard from "src/components/BalanceCard.vue";

defineOptions({
  name: "EntriesPage",
});

const $q = useQuasar();
const nameRef = ref(null);

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

// const balance = computed(() => {
//   return entries.value.reduce((acc, { amount }) => {
//     return acc + amount;
//   }, 0);
// });

// Entry Form

const defaultEntryForm = {
  name: "",
  amount: null,
};

const entryForm = reactive({
  ...defaultEntryForm,
});

const resetEntryForm = () => {
  Object.assign(entryForm, defaultEntryForm);
  nameRef.value.focus();
};

const addEntry = () => {
  const newEntry = Object.assign({}, entryForm, { id: uid() });
  entries.value.push(newEntry);
  resetEntryForm();
};

const deleteEntry = (entryId) => {
  const index = entries.value.findIndex((entry) => entry.id === entryId);
  entries.value.splice(index, 1);
  $q.notify({
    position: "top",
    message: "Entry deleted",
    color: "positive",
    icon: "check",
    timeout: 500,
  });
};

// Slide item

const onRight = ({ reset }, entry) => {
  const unsanitizedHtml = `
  <div>Are you sure you want to delete this entry?</div>
  <div class="text-bold q-mt-md ${useAmountColorClass(entry.amount)}" >
    ${entry.name}: ${useCurrencyFormatter(entry.amount)}
  </div>
  `;
  const sanitizedHtml = DOMPurify.sanitize(unsanitizedHtml);
  $q.dialog({
    dark: true,
    title: "Delete Entry",
    html: true,
    message: sanitizedHtml,
    cancel: true,
    persistent: true,
    ok: {
      label: "Delete",
      color: "negative",
      noCaps: true,
    },
    cancel: {
      color: "primary",
      noCaps: true,
    },
  })
    .onOk(() => {
      deleteEntry(entry.id);
    })

    .onCancel(() => {
      reset();
    });
};
</script>
