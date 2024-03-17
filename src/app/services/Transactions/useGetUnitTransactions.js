import { useState, useEffect } from "react";

import env from "../../../env";
import { http } from "../axios-https";

const useGetUnitTransactions = (unitId, reloadProp) => {
  const [transactionLoading, setTransactionLoading] = useState(false);
  const [unitTransactionList, setUnitTransactionList] = useState([]);

  const getUnitTransactions = () => {
    setTransactionLoading(true);
    http
      .get(`${env.clinton_homes_base_url}/admin/unit-transactions/${unitId}`)
      .then((response) => {
        // console.log(response.data.data);
        setUnitTransactionList([...response?.data?.data]);
        setTransactionLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getUnitTransactions();
  }, [reloadProp]);

  return { transactionLoading, unitTransactionList };
};

export default useGetUnitTransactions;
