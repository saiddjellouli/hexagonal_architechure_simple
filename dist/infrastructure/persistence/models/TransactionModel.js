import { Model, DataTypes } from "sequelize";
import { TransactionType } from "../../../domain/transaction/Transaction.js";

export default class TransactionModel extends Model {
  transactionId;
  value;
  description;
  transactionType;
  transactionDate;
  toJSON() {
    return {
      ...this.get(),
      updatedAt: undefined,
      createdAt: undefined,
    };
  }
}
export function initTransaction(sequelize) {
  TransactionModel.init(
    {
      transactionId: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      value: {
        type: DataTypes.DECIMAL(10, 2),
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
