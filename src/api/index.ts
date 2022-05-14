import axios from "axios";
import { RawTransaction } from "../types/raw-transactions.js";

export const fetchTransactionsData = async () => {
  try {
    const response = await axios.get(
      "https://gist.githubusercontent.com/simeor/5dd52dccdf5c4b4183ab2f2e80728bec/raw/5d042617ce514687fedffba35ec04539cb173481/data.json"
    );

    const result = await response.data;
    return result as RawTransaction[];
  } catch (error) {
    return Promise.reject(error);
  }
};
