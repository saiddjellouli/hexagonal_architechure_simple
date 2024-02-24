import { Model, DataTypes, Association, Sequelize } from "sequelize";
import {
  TransactionAttributes,
  TransactionType,
} from "domain/transaction/Transaction.js";

export default class TransactionModel
  extends Model<TransactionAttributes>
  implements TransactionAttributes
{
  public transactionId!: string;
  public value!: number;
  public description: string;
  public transactionType: TransactionType;
  public transactionDate: Date;

  toJSON() {
    return {
      ...this.get(),
      updatedAt: undefined,
      createdAt: undefined,
    };
  }
}

export function initTransaction(sequelize: Sequelize) {
  TransactionModel.init(
    {
      transactionId: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      value: {
        type: DataTypes.NUMBER,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      transactionDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      transactionType: {
        type: DataTypes.ENUM(
          TransactionType.Credit.toString(),
          TransactionType.Debit.toString()
        ),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "transaction",
      modelName: "Transaction",
      timestamps: true,
    }
  );
}
