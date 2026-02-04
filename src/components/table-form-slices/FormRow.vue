<script setup lang="ts">
import { NInput, NSelect, NButton, NIcon } from "naive-ui";
import type { SelectOption } from "naive-ui";
import { Delete24Regular } from "@vicons/fluent";
import { computed, onBeforeMount, ref, watch } from "vue";
import type { Account, AccountFormDTO, AccountType } from "@/types/account.ts";
import { toAccount } from "@/mappers/accountMapper.ts";

interface FormRowProps {
  account: AccountFormDTO;
}
const props = defineProps<FormRowProps>();

const emit = defineEmits<{
  (e: "save", payload: Account): void;
  (e: "remove", payload: Account): void;
}>();

const labelsValue = ref("");
const accountTypeValue = ref<AccountType | "">("");
const loginValue = ref("");
const passwordValue = ref<string | null>("");

onBeforeMount(() => {
  labelsValue.value = props.account.labels.map((item) => item.text).join(";");
  accountTypeValue.value = props.account.type;
  loginValue.value = props.account.login;
  passwordValue.value = props.account.password;
});

const accountTypeOptions: SelectOption[] = [
  {
    value: "LDAP",
    label: "LDAP",
  },
  {
    value: "LOCAL",
    label: "Локальная",
  },
];

const isPasswordFieldShown = computed(() => accountTypeValue.value !== "LDAP");
watch(
  () => isPasswordFieldShown.value,
  (newValue) => {
    passwordValue.value = newValue ? "" : null;
  },
);

const formDataFormatted = computed<AccountFormDTO>(() => {
  return {
    uid: props.account.uid,
    labels: labelsValue.value
      .split(";")
      .map((item) => item.trim())
      .filter((item) => item.length > 0)
      .map((item) => ({ text: item })),
    type: accountTypeValue.value,
    login: loginValue.value.trim(),
    password: passwordValue.value,
  };
});

const formErrors = ref<{
  type?: string;
  login?: string;
  password?: string;
}>({});
function validate() {
  // Не валидирую labels по тз - "происходит валидация обязательных полей"
  const currentErrors: typeof formErrors.value = {};

  if (!formDataFormatted.value.type) currentErrors.type = "Выберите тип записи";

  if (!formDataFormatted.value.login) currentErrors.login = "Логин обязателен";
  else if (formDataFormatted.value.login.length > 100)
    currentErrors.login = "Максимальная длина логина - 100 символов";

  if (isPasswordFieldShown.value)
    if (!formDataFormatted.value.password)
      currentErrors.password = "Пароль обязателен";
    else if (formDataFormatted.value.password.length > 100)
      currentErrors.password = "Максимальная длина пароля - 100 символов";

  formErrors.value = currentErrors;

  const isFormValid = Object.keys(currentErrors).length === 0;
  if (isFormValid) save();
}

function save() {
  emit("save", toAccount(formDataFormatted.value));
}

function remove() {
  emit("remove", toAccount(formDataFormatted.value));
}
</script>

<template>
  <div class="form-row">
    <div>
      <NInput
        v-model:value="labelsValue"
        @blur="validate"
        maxlength="50"
        show-count
        type="text"
        placeholder="Метки"
      />
    </div>
    <div>
      <NSelect
        v-model:value="accountTypeValue"
        :options="accountTypeOptions"
        @blur="validate"
        :status="formErrors.type ? 'error' : undefined"
      />
      <div class="error-desc">{{ formErrors.type }}</div>
    </div>
    <div :style="{ gridColumn: isPasswordFieldShown ? '' : 'span 2' }">
      <NInput
        v-model:value="loginValue"
        @blur="validate"
        maxlength="100"
        type="text"
        placeholder="Логин"
        :status="formErrors.login ? 'error' : undefined"
      />
      <div class="error-desc">{{ formErrors.login }}</div>
    </div>
    <div v-if="isPasswordFieldShown">
      <NInput
        v-model:value="passwordValue"
        @blur="validate"
        maxlength="100"
        type="password"
        show-password-on="mousedown"
        placeholder="Пароль"
        :status="formErrors.password ? 'error' : undefined"
      />
      <div class="error-desc">{{ formErrors.password }}</div>
    </div>
    <div>
      <NButton @click="remove" quaternary circle>
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
.error-desc {
  color: var(--сolor-error);
  font-size: 12px;
  height: 1.2em;
}
</style>
