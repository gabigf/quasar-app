<template>
  <q-layout view="hHh lpR fFf">
    <q-drawer
      show-if-above
      bordered
      class="bg-primary"
      :width="250"
      :breakpoint="767"
    >
      <h4 class="text-h4 text-bold text-white q-ma-lg">finance</h4>
      <q-list>
        <NavLink v-for="link in linksList" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
// import { ref } from "vue";
import NavLink from "components/NavLink.vue";

defineOptions({
  name: "MainLayout",
});

const linksList = [
  {
    title: "Overview",
    icon: "home",
    link: "/",
  },
  {
    title: "Transactions",
    icon: "import_export",
    link: "/transactions",
  },
  {
    title: "Settings",
    icon: "settings",
    link: "/settings",
  },
];

// const leftDrawerOpen = ref(false);

// function toggleLeftDrawer() {
//   leftDrawerOpen.value = !leftDrawerOpen.value;
// }
</script>
