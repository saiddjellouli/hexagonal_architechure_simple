import { AccountAttributes } from "domain/account/Account.js";
import { AccountRepository } from "domain/account/AccountRepository.js";

export class AccountService {
  private accountRepository: AccountRepository;

  constructor(accountRepository: AccountRepository) {
    this.accountRepository = accountRepository;
  }

  // Create a new account
  createAccount = async (clientId: string): Promise<AccountAttributes> => {
    const account = await this.accountRepository.create({
        clientId, balance: 0,
        accountId: "",
        toJSON: function (): AccountAttributes {
            throw new Error("Function not implemented.");
        }
    });
    return account;
  };

  // Retrieve an account by account ID
  getAccount = async (accountId: string): Promise<AccountAttributes | null> => {
    const account = await this.accountRepository.findByAccountId(accountId);
    return account ? account.toJSON() as AccountAttributes : null;
  };

  // Retrieve a list of all accounts
  listAccounts = async (): Promise<AccountAttributes[]> => {
    const accounts = await this.accountRepository.listAll();
    return accounts.map((account) => account.toJSON() as AccountAttributes);
  };

  // Save an account
  saveAccount = async (account: AccountAttributes): Promise<AccountAttributes> => {
    const updatedAccount = await this.accountRepository.update(account);
    return updatedAccount ? updatedAccount.toJSON() as AccountAttributes : account;
  };

  // Deposit an amount to an account
  deposit = async (accountId: string, value: number, description: string): Promise<void> => {
    await this.accountRepository.deposit(accountId, value, description);
  };

  // Withdraw an amount from an account
  withdraw = async (accountId: string, value: number, description: string): Promise<void> => {
    await this.accountRepository.withdraw(accountId, value, description);
  };

  // Transfer an amount from one account to another
  transfer = async (originId: string, destinationId: string, value: number, description: string): Promise<void> => {
    await this.accountRepository.transfer(originId, destinationId, value, description);
  };
}
