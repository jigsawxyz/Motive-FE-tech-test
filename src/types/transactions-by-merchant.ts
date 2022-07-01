import { RawTransaction } from "./raw-transactions";

export type SingleMerchantTransaction = {
  count: number;
  transactions: RawTransaction[];
};

export type TransactionsGroupedByMerchant = {
  [merchantName: string]: SingleMerchantTransaction;
};
