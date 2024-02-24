export enum TransactionType { Credit, Debit};

export interface TransactionAttributes {
    transactionId: string;
    value: number;
    description: string;
    transactionType: TransactionType;
    transactionDate: Date;
  }