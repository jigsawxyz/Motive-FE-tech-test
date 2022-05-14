export type SingleMerchantTransaction = {
  count: number;
  transactions: any[]; // TO-DO: Change to proper type
};

export type TransactionsGroupedByMerchant = {
  [merchantName: string]: SingleMerchantTransaction;
};
