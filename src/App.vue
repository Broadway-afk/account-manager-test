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

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
