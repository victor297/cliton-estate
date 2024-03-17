import { useState } from "react";
import axios from "axios";
import env from "../../../env";

const useSendCode = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendCode = (email) => {
    setLoading(true);
    axios
      .post(`${env.clinton_homes_base_url}/public/get-code`, { email })
      .then((response) => {
        // console.log(response);
        setLoading(false);
        // setCodeSent(true);
      })
      .catch((error) => {
        // setError(error?.message || "An error occurred during sign-in.");
      });
  };

  return { loading, error, sendCode };
};

export default useSendCode;
