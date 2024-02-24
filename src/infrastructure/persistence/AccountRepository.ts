import { AccountAttributes } from "domain/account/Account.js";
import { AccountRepository } from "domain/account/AccountRepository.js";
import AccountModel from "./models/AccountModel.js";

class SequelizeAccountRepository implements AccountRepository {
  async create(account: AccountAttributes): Promise<AccountAttributes> {
    const { accountId, clientId, balance } = account; // Extract the properties
    const createdAccount = await AccountModel.create({ accountId, clientId, balance });
    return createdAccount.toJSON() as AccountAttributes;
  }
  
  async listAll(): Promise<AccountAttributes[]> {
    const accounts = await AccountModel.findAll();
    return accounts.map((account) => account.toJSON()) as AccountAttributes[];
  }

  async update(account: AccountAttributes): Promise<AccountAttributes> {
    const [_, [updatedAccount]] = await AccountModel.update(account, {
      returning: true,
      where: { accountId: account.accountId },
    });
    return updatedAccount?.toJSON() as AccountAttributes;
  }

  async findByAccountId(accountId: string): Promise<AccountAttributes | null> {
    const account = await AccountModel.findOne({
      where: { accountId },
    });
    return account ? account.toJSON() : null;
  }

  async save(account: AccountAttributes): Promise<void> {
    const { accountId, ...updateData } = account;
    await AccountModel.update(updateData, {
      where: { accountId },
    });
  }

  async deposit(accountId: string, value: number): Promise<void> {
    const account = await this.findByAccountId(accountId);
    if (account) {
      const updatedBalance = account.balance + value;
      await this.save({ ...account, balance: updatedBalance });
    }
  }

  async withdraw(accountId: string, value: number): Promise<void> {
    const account = await this.findByAccountId(accountId);
    if (account) {
      if (account.balance >= value) {
        const updatedBalance = account.balance - value;
        await this.save({ ...account, balance: updatedBalance });
      } else {
        throw new Error('Insufficient balance');
      }
    }
  }

  async transfer(originAccountId: string, destinationAccountId: string, value: number): Promise<void> {
    const originAccount = await this.findByAccountId(originAccountId);
    const destinationAccount = await this.findByAccountId(destinationAccountId);

    if (!originAccount || !destinationAccount) {
      throw new Error('Accounts not found');
    }

    if (originAccount.balance >= value) {
      const updatedOriginBalance = originAccount.balance - value;
      const updatedDestinationBalance = destinationAccount.balance + value;

      await this.save({ ...originAccount, balance: updatedOriginBalance });
      await this.save({ ...destinationAccount, balance: updatedDestinationBalance });
    } else {
      throw new Error('Insufficient balance');
    }
  }
}

export { SequelizeAccountRepository };
