export interface AccountAttributes {
    toJSON(): AccountAttributes;
    accountId: string;
    clientId: string;
    balance: number;
  }