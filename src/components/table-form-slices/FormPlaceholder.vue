<script setup lang="ts">
import { NAlert, NIcon } from "naive-ui";
import { Beach16Regular } from "@vicons/fluent";
</script>

<template>
  <NAlert class="form-placeholder" title="А где все? 👀" type="default">
    <template #icon>
      <NIcon> <Beach16Regular /></NIcon>
    </template>
    Нет учетных записей. Добавьте хотя бы одну, чтобы оценить эту крутую
    реактивную таблицеформу!
  </NAlert>
</template>

<style scoped>
.form-placeholder {
  grid-column: 1 / -1;
}
</style>
