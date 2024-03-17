import { useState } from "react";
import axios from "axios";
import env from "../../../env";
import { useNavigate } from "react-router-dom";

const useSignIn = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const signIn = (email, otp) => {
    setLoading(true);
    axios
      .post(`${env.clinton_homes_base_url}/public/login`, {
        email,
        otp: otp.trim(),
      })
      .then((response) => {
        // console.log(response.data.data);
        env.storeUser(response.data.data.token, response.data.data.user);
        setLoading(false);

        //if statement to check whether user is admin
        // if (user.userType === "admin") {
        //   navigate("/admin-dashboard");
        // } else {
        //   navigate("/user-dashboard");
        // }
      })
      .catch((error) => {
        // setError(error?.message || "An error occurred during sign-in.");
      });
  };

  return { loading, error, signIn };
};

export default useSignIn;
