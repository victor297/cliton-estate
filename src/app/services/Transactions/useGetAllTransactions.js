import { useState, useEffect } from "react";

import env from "../../../env";
import { http } from "../axios-https";

const useGetAllTransactions = () => {
  const [transactionLoading, setLoading] = useState(false);
  const [transactionList, setTransactionList] = useState([]);

  const getAllTransactions = () => {
    setLoading(true);
    http
      .get(`${env.clinton_homes_base_url}/admin/all-transactions`)
      .then((response) => {
        // console.log(response.data.data);
        setTransactionList([...response?.data?.data]);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllTransactions();
  }, []);

  return { transactionLoading, transactionList };
};

export default useGetAllTransactions;
