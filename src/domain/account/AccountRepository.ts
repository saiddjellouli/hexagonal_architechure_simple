import { AccountAttributes } from "./Account.js";

export interface AccountRepository {
    create(account: AccountAttributes): Promise<AccountAttributes>;
    update(account: AccountAttributes): Promise<AccountAttributes>;
    findByAccountId(accountId: string): Promise<AccountAttributes | null>;
    listAll(): Promise<AccountAttributes[]>;
    withdraw(accountId: string, value: number, description: string): Promise<void>;
    deposit(accountId: string, value: number, description: string): Promise<void>;
    transfer(originId: string, destinationId: string, value: number, description: string): Promise<void>;
  }
  