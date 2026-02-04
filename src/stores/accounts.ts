import { ref } from "vue";
import { defineStore } from "pinia";
import type { Account } from "@/types/account.ts";

export const useAccountsStore = defineStore(
  "accounts",
  () => {
    const accounts = ref<Account[]>([]);

    function addAccount(account: Account) {
      accounts.value.push(account);
    }
    function updateAccount(account: Account, index: number) {
      accounts.value[index] = account;
    }
    function removeAccount(index: number) {
      accounts.value.splice(index, 1);
    }

    return { accounts, addAccount, updateAccount, removeAccount };
  },
  {
    persist: true,
  },
);
