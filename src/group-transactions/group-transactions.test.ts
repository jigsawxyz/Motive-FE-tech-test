import {
  groupTransactionsByMerchant,
  groupTransactionsByDate,
  data
} from "./group-transactions";

test("Group transactions by merchant", () => {
  const result = groupTransactionsByMerchant();
  const mAndSCount = result["Marks & Spencer"]?.count;
  const totalTransactions = Object.values(result).reduce(
    (acc, curr) => acc + curr.transactions.length,
    0
  );
  expect(mAndSCount).toBe(8);
  expect(totalTransactions).toBe(data.length);
});

test("Group transactions by merchant", () => {
  const result = groupTransactionsByDate();

  const totalTransactions = result?.reduce(
    (acc, curr) => acc + curr?.transactions?.length || 0,
    0
  );

  expect(result?.[0]?.date).toBe("09/10/2020");
  expect(result.length).toBe(13);
  expect(totalTransactions).toBe(data.length);
});
