<script setup lang="ts">
import { darkTheme } from "naive-ui";
import { NConfigProvider, NMessageProvider, NDialogProvider } from "naive-ui";
import TableForm from "@/components/TableForm.vue";
</script>

<template>
  <NConfigProvider
    :theme="darkTheme"
    :theme-overrides="{ common: { fontWeightStrong: '600' } }"
    :style="{ flex: 1 }"
  >
    <NMessageProvider>
      <NDialogProvider>
        <TableForm />
      </NDialogProvider>
    </NMessageProvider>
  </NConfigProvider>
</template>

<style scoped></style>
