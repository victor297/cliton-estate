import React, { useState } from "react";

import { http } from "../../../app/services/axios-https";
import env from "../../../env";
import InputCommon from "../../inputField/InputCommon";
import ButtonCommon from "../../button/ButtonCommon";
import Notification from "../../Notification";
import spinner from "../../../assets/common/spinner.svg";

import toast from "react-hot-toast";

const UpdatePaymentForm = ({ ownedUnitId, triggerReload, handleClose }) => {
  const [updatingPayment, setUpdatingPayment] = useState(false);
  const [newPricePaid, setNewPricePaid] = useState("");

  const clearFields = () => {
    setNewPricePaid("");
  };

  const updatePayment = () => {
    setUpdatingPayment(true);

    const formdata = {
      newPrice: parseInt(newPricePaid),
    };

    http
      .put(
        `${env.clinton_homes_base_url}/admin/owned-unit/${ownedUnitId}/update-payment`,
        formdata
      )
      .then((response) => {
        // console.log(response);
        toast.success("Payment Updated");
        clearFields();
        triggerReload();
        setUpdatingPayment(false);
        handleClose();
      })
      .catch((error) => {
        // console.log(error.response.data.message);
        toast.error(error?.response?.data?.message || "An Error Occured");
        setUpdatingPayment(false);
      });
  };

  return (
    <div className="input-container">
      <Notification />

      <InputCommon
        placeholder="New Price Paid:"
        marginBottom="24px"
        value={newPricePaid}
        onChange={(e) => setNewPricePaid(e.target.value)}
      />

      <ButtonCommon
        content={updatingPayment ? <img src={spinner} /> : "Update"}
        backgroundColor="#F8F4F6"
        textColor="#721F4B"
        marginTop="16px"
        onClick={updatePayment}
      />
    </div>
  );
};

export default UpdatePaymentForm;
