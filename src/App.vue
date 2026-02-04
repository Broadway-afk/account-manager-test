<script setup lang="ts">
import { darkTheme } from "naive-ui";
import { NConfigProvider } from "naive-ui";
import TableForm from "@/components/TableForm.vue";
</script>

<template>
  <NConfigProvider
    :theme="darkTheme"
    :theme-overrides="{ common: { fontWeightStrong: '600' } }"
    :style="{ flex: 1 }"
  >
    <TableForm />
  </NConfigProvider>
</template>

<style scoped>
header {
  line-height: 1.5;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }
}
</style>
