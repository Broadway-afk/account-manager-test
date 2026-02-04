export type AccountType = "LDAP" | "LOCAL";

export interface AccountLabel {
  text: string;
}
export interface Account {
  uid: string;
  labels: AccountLabel[];
  type: AccountType;
  login: string;
  password: string | null;
}

export type AccountFormDTO = {
  uid: string;
  labels: AccountLabel[];
  type: AccountType | "";
  login: string;
  password: string | null;
};
