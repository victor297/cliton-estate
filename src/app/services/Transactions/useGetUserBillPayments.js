import { useState, useEffect } from "react";

import env from "../../../env";
import { http } from "../axios-https";

const useGetUserBillPayments = (unitId) => {
  const [gettingPayments, setGettingPayments] = useState(false);
  const [userPaymentsList, setUserPaymentsList] = useState([]);

  const getUserPayments = () => {
    setGettingPayments(true);
    http
      .get(`${env.clinton_homes_base_url}/user/get-bill-payments/${unitId}`)
      .then((response) => {
        // console.log(response.data.data);
        setUserPaymentsList([...response?.data?.data]);
        setGettingPayments(false);
      })
      .catch((error) => {
        console.log(error);
        setGettingPayments(false);
      });
  };

  useEffect(() => {
    getUserPayments();
  }, []);

  return { gettingPayments, userPaymentsList };
};

export default useGetUserBillPayments;
