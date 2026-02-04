import type { Account, AccountFormDTO } from "@/types/account";

export function toAccount(dto: AccountFormDTO): Account {
  if (!dto.type) throw new Error("Неверный тип аккаунта");

  return {
    ...dto,
    type: dto.type,
    password: dto.type === "LDAP" ? null : dto.password,
  };
}
