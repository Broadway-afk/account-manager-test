<script setup lang="ts">
import { NInput, NSelect, NButton, NIcon } from "naive-ui";
import { Delete24Regular } from "@vicons/fluent";

const accountTypeOptions = [
  {
    value: "LDAP",
    label: "LDAP",
  },
  {
    value: "Локальная",
    label: "Локальная",
  },
];
</script>

<template>
  <div class="form-row">
    <div>
      <NInput type="text" placeholder="Метки" />
    </div>
    <div>
      <NSelect :options="accountTypeOptions" />
    </div>
    <div><NInput type="text" placeholder="Логин" /></div>
    <div>
      <NInput
        type="password"
        show-password-on="mousedown"
        placeholder="Пароль"
      />
    </div>
    <div>
      <NButton quaternary circle>
        <template #icon>
          <NIcon><Delete24Regular /></NIcon>
        </template>
      </NButton>
    </div>
  </div>
</template>

<style scoped>
.form-row {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: subgrid;
  gap: 5px;
}
</style>
