import React, { useState } from "react";

import { http } from "../../../app/services/axios-https";
import env from "../../../env";
import InputCommon from "../../inputField/InputCommon";
import ButtonCommon from "../../button/ButtonCommon";
import Notification from "../../Notification";
import spinner from "../../../assets/common/spinner.svg";
import SearchableDropdown from "../../inputField/SearchableDropdown";
import useGetAllUsers from "../../../app/services/users/useGetAllUsers";
import toast from "react-hot-toast";

const AssignUserForm = ({ unitId, triggerReload, handleClose }) => {
  const { userList, loading } = useGetAllUsers("user");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [pricePaid, setPricePaid] = useState("");
  const [addingUser, setAddingUser] = useState(false);

  const userOptions = userList?.map((user) => {
    return {
      value: user?.email,
      label: user?.name,
      phoneNumber: user?.phoneNumber ? user?.phoneNumber : "",
    };
  });

  const handleUserSelection = (selectedOption) => {
    // console.log(selectedOption);
    setName(selectedOption.label);
    setEmail(selectedOption.value);
  };

  const clearFields = () => {
    setName("");
    setEmail("");
    setPhoneNumber("");
    setPricePaid("");
  };

  const addUserToUnit = () => {
    setAddingUser(true);
    const [firstName, lastName] = name.split(" ");
    const formdata = {
      firstName,
      lastName,
      email,
      pricePaid: parseInt(pricePaid),
    };

    http
      .post(
        `${env.clinton_homes_base_url}/admin/unit/${unitId}/add-user`,
        formdata
      )
      .then((response) => {
        // console.log(response);
        toast.success("Unit Assigned to user");
        clearFields();
        triggerReload();
        setAddingUser(false);
        handleClose();
      })
      .catch((error) => {
        console.log(error?.response?.status);
        // console.log(error.response.data[0].errors.issues[0].message);

        if (error?.response?.status === 400) {
          toast.error(
            error?.response?.data[0]?.errors?.issues[0]?.message ||
              "An Error Occured"
          );
        } else {
          toast.error(error?.response?.data?.message || "An Error Occured");
        }

        setAddingUser(false);
      });

    // console.log(formdata);
  };

  return (
    <div className="input-container">
      <Notification />
      <SearchableDropdown
        options={userOptions}
        placeholder="Select User"
        // handleInputChange={handleAccountSelectChange}
        handleInputChange={handleUserSelection}
        // selectedOption={selectedAccount}
      />
      <InputCommon
        placeholder="Name:"
        marginBottom="24px"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <InputCommon
        placeholder="Phone Number:"
        marginBottom="24px"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <InputCommon
        placeholder="Email:"
        marginBottom="24px"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputCommon
        placeholder="Price Paid:"
        marginBottom="24px"
        value={pricePaid}
        onChange={(e) => setPricePaid(e.target.value)}
      />

      <ButtonCommon
        content={addingUser ? <img src={spinner} /> : "Add"}
        backgroundColor="#F8F4F6"
        textColor="#721F4B"
        marginTop="16px"
        onClick={addUserToUnit}
        disabled={!pricePaid}
      />
    </div>
  );
};

export default AssignUserForm;
