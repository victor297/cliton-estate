import { useState, useEffect } from "react";

import env from "../../../env";
import { http } from "../axios-https";

const useGetUserOwnedUnit = () => {
  const [unitsLoading, setUnitsLoading] = useState(false);
  const [ownedUnits, setOwnedUnits] = useState(false);

  const getOwnedUnits = () => {
    setUnitsLoading(true);
    http
      .get(`${env.clinton_homes_base_url}/user/owned-units`)
      .then((response) => {
        // console.log(response.data.data);
        setOwnedUnits([...response.data.data]);
        setUnitsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setUnitsLoading(false);
      });
  };

  useEffect(() => {
    getOwnedUnits();
  }, []);

  return {
    unitsLoading,
    ownedUnits,
  };
};

export default useGetUserOwnedUnit;
