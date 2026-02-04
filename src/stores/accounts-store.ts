import { ref } from "vue";
import { defineStore } from "pinia";
import type { Account } from "@/types/account.ts";

export const useAccountsStore = defineStore(
  "accounts",
  () => {
    const accounts = ref<Account[]>([]);

    function getAccountIndex(uid: string) {
      return accounts.value.findIndex((account) => account.uid === uid);
    }

    function addAccount(account: Account) {
      accounts.value.push(account);
    }
    function updateAccount(account: Account) {
      accounts.value[getAccountIndex(account.uid)] = account;
    }
    function removeAccount(account: Account) {
      accounts.value.splice(getAccountIndex(account.uid), 1);
    }

    return {
      accounts,
      addAccount,
      updateAccount,
      removeAccount,
    };
  },
  {
    persist: true,
  },
);
