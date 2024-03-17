import { useState, useEffect } from "react";

import env from "../../../env";
import { http } from "../axios-https";

const useGetUserTransactions = (unitId) => {
  const [transactionLoading, setTransactionLoading] = useState(false);
  const [userTransactionList, setUserTransactionList] = useState([]);

  const getUserTransactions = () => {
    setTransactionLoading(true);
    http
      .get(`${env.clinton_homes_base_url}/user/user-transactions`)
      .then((response) => {
        // console.log(response.data.data);
        setUserTransactionList([...response?.data?.data]);
        setTransactionLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getUserTransactions();
  }, []);

  return { transactionLoading, userTransactionList };
};

export default useGetUserTransactions;
