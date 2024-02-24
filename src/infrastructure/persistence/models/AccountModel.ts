import { Model, DataTypes, Sequelize } from "sequelize";
import { AccountAttributes } from "domain/account/Account.js";

export default class AccountModel
  extends Model<AccountAttributes>
  implements AccountAttributes
{
  public accountId!: string;
  public clientId!: string;
  public balance!: number;

  public static associate(TransactionModel): void {
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

export function initAccount(sequelize: Sequelize) {
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
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      toJSON: "",
    },
    {
      sequelize,
      tableName: "account",
      modelName: "Account",
      timestamps: true,
    }
  );
}
