import { fetchTransactionsData } from "../api";
import { RawTransaction } from "../types/raw-transactions";
import { TransactionGroupedByDate } from "../types/transactions-by-date";
import { TransactionsGroupedByMerchant } from "../types/transactions-by-merchant";
import { getFormattedDate } from "../util";

// To be fetched from https://gist.githubusercontent.com/simeor/5dd52dccdf5c4b4183ab2f2e80728bec/raw/5d042617ce514687fedffba35ec04539cb173481/data.json
let data: RawTransaction[] = [];

(async () => {
  data = await fetchTransactionsData();
})();

const groupTransactionsByMerchant = (): TransactionsGroupedByMerchant => {
  const reducedData = data.reduce(
    (accumulatedGroup: TransactionsGroupedByMerchant, currentTransaction) => {
      if (currentTransaction.merchant in accumulatedGroup) {
        accumulatedGroup[currentTransaction.merchant].count += 1;
        accumulatedGroup[currentTransaction.merchant].transactions.push(
          currentTransaction
        );
      } else {
        accumulatedGroup[currentTransaction.merchant].count = 1;
        accumulatedGroup[currentTransaction.merchant].transactions = [
          currentTransaction
        ];
      }

      return accumulatedGroup;
    },
    {}
  );
  return reducedData;
};

const groupTransactionsByDate = (): TransactionGroupedByDate[] => {
  const reducedData = data.reduce(
    (accumulatedGroup: TransactionGroupedByDate[], currentTransaction) => {
      const existingGroupWithCurrentDate = accumulatedGroup.find(
        el => el.date === getFormattedDate(currentTransaction.paymentDate)
      );
      if (existingGroupWithCurrentDate) {
        existingGroupWithCurrentDate.count += 1;
        existingGroupWithCurrentDate.transactions.push(currentTransaction);
      } else {
        accumulatedGroup.push({
          date: getFormattedDate(currentTransaction.paymentDate),
          count: 1,

          transactions: [currentTransaction]
        });
      }

      return accumulatedGroup;
    },
    []
  );
  return reducedData;
};

console.log(data);

export { data, groupTransactionsByDate, groupTransactionsByMerchant };
