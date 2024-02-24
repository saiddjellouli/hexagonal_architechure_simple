import { Model, DataTypes } from "sequelize";

export default class AccountModel extends Model {
  accountId;
  clientId;
  balance;
  static associate(TransactionModel) {
    AccountModel.hasMany(TransactionModel, {
      sourceKey: "accountId",
      foreignKey: "transactionId",
      as: "transactions",
    });
  }
  toJSON() {
    return {
      ...this.get(),
      updatedAt: undefined,
      createdAt: undefined,
    };
  }
}

export function initAccount(sequelize) {
  AccountModel.init(
    {
      accountId: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      clientId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      balance: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "account",
      modelName: "Account",
      timestamps: true,
    }
  );
}
