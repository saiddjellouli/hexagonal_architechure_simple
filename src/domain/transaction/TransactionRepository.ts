import { TransactionAttributes } from "./Transaction.js";

export interface TransactionRepository {
    create(transaction: TransactionAttributes): Promise<TransactionAttributes>;
    findById(transactionId: string): Promise<TransactionAttributes | null>;
    listAll(): Promise<TransactionAttributes[]>;
}
  