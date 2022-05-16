import { fetchTransactionsData } from "../api";
import { TransactionGroupedByDate } from "../types/transactions-by-date";
import { TransactionsGroupedByMerchant } from "../types/transactions-by-merchant";
import { format } from "date-fns";

// Data to be fetched from https://gist.githubusercontent.com/simeor/5dd52dccdf5c4b4183ab2f2e80728bec/raw/5d042617ce514687fedffba35ec04539cb173481/data.json

export const groupTransactionsByMerchant = async () => {
  const data = await fetchTransactionsData();

  const reducedData = data.reduce(
    (accumulatedGroup: TransactionsGroupedByMerchant, currentTransaction) => {
      const merchantKey = currentTransaction.merchant;

      if (merchantKey in accumulatedGroup) {
        accumulatedGroup[merchantKey].count += 1;
        accumulatedGroup[merchantKey].transactions.push(currentTransaction);
      } else {
        accumulatedGroup = {
          ...accumulatedGroup,
          [merchantKey]: {
            count: 1,
            transactions: [currentTransaction]
          }
        };
      }

      return accumulatedGroup;
    },
    {}
  );
  return reducedData;
};

export const groupTransactionsByDate = async () => {
  const data = await fetchTransactionsData();

  const reducedData = data.reduce(
    (accumulatedGroup: TransactionGroupedByDate[], currentTransaction) => {
      const existingGroupWithCurrentDate = accumulatedGroup.find(
        el =>
          el.date ===
          format(new Date(currentTransaction.paymentDate), "dd/MM/yyyy")
      );
      if (existingGroupWithCurrentDate) {
        existingGroupWithCurrentDate.count += 1;
        existingGroupWithCurrentDate.transactions.push(currentTransaction);
      } else {
        accumulatedGroup.push({
          date: format(new Date(currentTransaction.paymentDate), "dd/MM/yyyy"),
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
