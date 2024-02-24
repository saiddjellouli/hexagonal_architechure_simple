import { SequelizeAccountRepository } from "../../infrastructure/persistence/AccountRepository.js";

const accountRepository = new SequelizeAccountRepository();

export class AccountService {
  // Create a new account
  createAccount = async (accountId, balance, clientId) => {
    const account = await accountRepository.create(
      accountId,
      balance,
      clientId
    );
    return account;
  };
  // Retrieve an account by account ID
  getAccount = async (accountId) => {
    console.log("get Account " + accountId);
    const account = await accountRepository.findByAccountId(accountId);
    return account ? account.toJSON() : null;
  };
  // Retrieve a list of all accounts
  listAccounts = async () => {
    const accounts = await accountRepository.listAll();
    return accounts;
  };
  // Save an account
  saveAccount = async (accountId, balance, clientId) => {
    const updatedAccount = await accountRepository.update(
      accountId,
      balance,
      clientId
    );
    return updatedAccount ? updatedAccount.toJSON() : null;
  };
  // Deposit an amount to an account
  deposit = async (accountId, value, description) => {
    await accountRepository.deposit(accountId, value, description);
  };
  // Withdraw an amount from an account
  withdraw = async (accountId, value, description) => {
    await accountRepository.withdraw(accountId, value, description);
  };
  // Transfer an amount from one account to another
  transfer = async (originId, destinationId, value, description) => {
    await accountRepository.transfer(
      originId,
      destinationId,
      value,
      description
    );
  };
}
