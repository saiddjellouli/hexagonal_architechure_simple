import AccountModel from "./models/AccountModel.js";
class SequelizeAccountRepository {
  async create(accountId, clientId, balance) {
    const createdAccount = await AccountModel.create({
      accountId,
      clientId,
      balance,
    });
    return createdAccount.toJSON();
  }
  async listAll() {
    const accounts = await AccountModel.findAll();
    console.log(accounts.length);
    return accounts;
  }
  async update(account) {
    const [_, [updatedAccount]] = await AccountModel.update(account, {
      returning: true,
      where: { accountId: account.accountId },
    });
    return updatedAccount?.toJSON();
  }
  async findByAccountId(accountId) {
    const account = await AccountModel.findOne({
      where: {
        accountId: accountId,
      },
    });
    return account ? account : null;
  }

  async save(account) {
    const { accountId, ...updateData } = account;
    console.log(account.dataValues);
    await AccountModel.update(updateData, {
      where: { accountId: account.dataValues.accountId },
    });
  }
  async deposit(accountId, value) {
    const account = await this.findByAccountId(accountId);
    if (account) {
      const updatedBalance = account.balance + value;
      await this.save({ ...account, balance: updatedBalance });
    }
  }
  async withdraw(accountId, value) {
    const account = await this.findByAccountId(accountId);
    if (account) {
      if (account.balance >= value) {
        const updatedBalance = account.balance - value;
        await this.save({ ...account, balance: updatedBalance });
      } else {
        throw new Error("Insufficient balance");
      }
    }
  }
  async transfer(originAccountId, destinationAccountId, value) {
    const originAccount = await this.findByAccountId(originAccountId);
    const destinationAccount = await this.findByAccountId(destinationAccountId);
    if (!originAccount || !destinationAccount) {
      throw new Error("Accounts not found");
    }
    if (originAccount.balance >= value) {
      const updatedOriginBalance = originAccount.balance - value;
      const updatedDestinationBalance = destinationAccount.balance + value;
      await this.save({ ...originAccount, balance: updatedOriginBalance });
      await this.save({
        ...destinationAccount,
        balance: updatedDestinationBalance,
      });
    } else {
      throw new Error("Insufficient balance");
    }
  }
}
export { SequelizeAccountRepository };
