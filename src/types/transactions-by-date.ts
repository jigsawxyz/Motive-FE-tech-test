import { RawTransaction } from "./raw-transactions";

export type TransactionGroupedByDate = {
  date: string;
  count: number;
  transactions: RawTransaction[];
};
