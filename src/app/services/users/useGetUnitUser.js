import { useState, useEffect } from "react";

import env from "../../../env";
import { http } from "../axios-https";

const useGetUnitUser = (unitId, reloadProp) => {
  const [userLoading, setUserLoading] = useState(false);
  const [userDetail, setUserDetail] = useState([]);
  const [ownedUnitId, setOwnedUnitId] = useState("");

  const getUnitUser = () => {
    setUserLoading(true);
    http
      .get(`${env.clinton_homes_base_url}/admin/unit-owner-details/${unitId}`)
      .then((response) => {
        // console.log(response.data.data[0]._id);
        setUserDetail([...response?.data?.data]);
        setOwnedUnitId(response?.data?.data[0]?._id);
        setUserLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getUnitUser();
  }, [reloadProp]);

  return {
    userLoading,
    userDetail,
    ownedUnitId,
  };
};

export default useGetUnitUser;
