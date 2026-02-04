<script setup lang="ts">
import { NPageHeader, NButton, NIcon, NAlert } from "naive-ui";
import { useMessage } from "naive-ui";
import { Add12Filled } from "@vicons/fluent";
import FormContainer from "@/components/table-form-slices/FormContainer.vue";
import FormRow from "@/components/table-form-slices/FormRow.vue";
import { useAccountsStore } from "@/stores/accounts-store.ts";
import type { AccountFormDTO, AccountFormPayload } from "@/types/account.ts";
import { ref } from "vue";
import { generateId } from "@/utils/generate-id.ts";
import FormPlaceholder from "@/components/table-form-slices/FormPlaceholder.vue";

const accountsStore = useAccountsStore();

const message = useMessage();

const temporaryAccounts = ref<AccountFormDTO[]>([]);

function createTemporaryAccount() {
  temporaryAccounts.value.push({
    uid: generateId(),
    labels: [],
    type: "",
    login: "",
    password: "",
  });
  message.info("Новый аккаунт создан!");
}

function handleSave(payload: AccountFormPayload, isNew: boolean) {
  const { account, index } = payload;
  if (isNew) {
    temporaryAccounts.value.splice(index, 1);
    accountsStore.addAccount(account);
  } else accountsStore.updateAccount(account, index);

  message.success("Изменения сохранены!");
}

function handleRemove(payload: { index: number }, isNew: boolean) {
  const { index } = payload;
  if (isNew) temporaryAccounts.value.splice(index, 1);
  else accountsStore.removeAccount(index);

  message.info("Аккаунт удален!");
}
</script>

<template>
  <main class="table-form">
    <NPageHeader title="Учетные записи">
      <template #extra>
        <NButton @click="createTemporaryAccount" circle type="primary">
          <template #icon>
            <NIcon><Add12Filled /></NIcon>
          </template>
        </NButton>
      </template>
    </NPageHeader>

    <NAlert type="info" class="table-form__alert" closable>
      Для указания нескольких меток для одной пары логин/пароль используйте
      разделитель ;
    </NAlert>

    <FormContainer>
      <FormPlaceholder
        v-if="accountsStore.accounts.length + temporaryAccounts.length === 0"
      />
      <FormRow
        v-for="(account, index) in accountsStore.accounts"
        :key="account.uid"
        :account="account"
        :index="index"
        @save="(payload) => handleSave(payload, false)"
        @remove="(payload) => handleRemove(payload, false)"
      />
      <FormRow
        v-for="(account, index) in temporaryAccounts"
        :key="account.uid"
        :account="account"
        :index="index"
        @save="(payload) => handleSave(payload, true)"
        @remove="(payload) => handleRemove(payload, true)"
      />
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

  @media (max-width: 800px) {
    padding: 10px;
  }
}
.table-form__alert {
  margin: 20px 0;
}
</style>
