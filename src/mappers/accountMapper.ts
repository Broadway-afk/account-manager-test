import type { Account, AccountFormDTO } from "@/types/account";

export function toAccount(dto: AccountFormDTO): Account {
  if (!dto.type) {
    throw new Error("Тип аккаунта не указан");
  }

  if (dto.type === "LOCAL" && !dto.password) {
    throw new Error("Для локального аккаунта пароль обязателен");
  }

  return {
    ...dto,
    type: dto.type,
    password: dto.type === "LDAP" ? null : (dto.password ?? ""),
  };
}
