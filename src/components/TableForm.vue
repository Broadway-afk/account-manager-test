<script setup lang="ts">
import { NPageHeader, NButton, NIcon, NAlert } from "naive-ui";
import { Add12Filled } from "@vicons/fluent";
import FormContainer from "@/components/table-form-slices/FormContainer.vue";
import FormRow from "@/components/table-form-slices/FormRow.vue";
</script>

<template>
  <main class="table-form">
    <NPageHeader title="Учетные записи">
      <template #extra>
        <NButton circle type="primary">
          <template #icon>
            <NIcon><Add12Filled /></NIcon>
          </template>
        </NButton>
      </template>
    </NPageHeader>

    <NAlert type="info" class="table-form__alert">
      Для указания нескольких меток для одной пары логин/пароль используйте
      разделитель ;
    </NAlert>

    <FormContainer>
      <FormRow />
    </FormContainer>
  </main>
</template>

<style scoped>
.table-form {
  width: 100%;
  height: 100%;
  max-width: 1000px;
  background-color: var(--color-background-soft);
  margin: auto;
  border-radius: 20px;
  padding: 20px;
  color: var(--vt-c-text-dark-1);
}
.table-form__alert {
  margin-top: 20px;
}
</style>
