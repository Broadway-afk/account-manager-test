<script setup lang="ts">
import { NPageHeader, NButton, NIcon, NAlert } from "naive-ui";
import { useMessage } from "naive-ui";
import { useDialog } from "naive-ui";
import { Add12Filled } from "@vicons/fluent";
import FormContainer from "@/components/table-form-slices/FormContainer.vue";
import FormRow from "@/components/table-form-slices/FormRow.vue";
import { useAccountsStore } from "@/stores/accounts-store.ts";
import type { Account, AccountFormDTO } from "@/types/account.ts";
import { ref } from "vue";
import { generateId } from "@/utils/generate-id.ts";
import FormPlaceholder from "@/components/table-form-slices/FormPlaceholder.vue";

const accountsStore = useAccountsStore();

const message = useMessage();
const dialog = useDialog();

const temporaryAccounts = ref<AccountFormDTO[]>([]);
function getTemporaryAccountIndex(uid: string) {
  return temporaryAccounts.value.findIndex((account) => account.uid === uid);
}

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

function handleSave(account: Account, isNew: boolean) {
  if (isNew) {
    temporaryAccounts.value.splice(getTemporaryAccountIndex(account.uid), 1);
    accountsStore.addAccount(account);
  } else accountsStore.updateAccount(account);

  message.success("Изменения сохранены!");
}

function handleRemove(account: Account, isNew: boolean) {
  dialog.error({
    title: "Подтвердите удаление",
    content: "Вы точно хотите удалить эту запись?",
    positiveText: "Точно!",
    negativeText: "Я еще подумаю",
    draggable: true,
    onPositiveClick: () => {
      if (isNew)
        temporaryAccounts.value.splice(
          getTemporaryAccountIndex(account.uid),
          1,
        );
      else accountsStore.removeAccount(account);

      message.info("Аккаунт удален!");
    },
    onNegativeClick: () => {
      message.error("Думайте.");
    },
  });
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
        v-for="account in accountsStore.accounts"
        :key="account.uid"
        :account="account"
        @save="(payload) => handleSave(payload, false)"
        @remove="(payload) => handleRemove(payload, false)"
      />
      <FormRow
        v-for="account in temporaryAccounts"
        :key="account.uid"
        :account="account"
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
