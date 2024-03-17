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

const AssignAdminForm = ({ unitId, triggerReload, handleClose }) => {
  const { userList, loading } = useGetAllUsers("admin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [addingAdmin, setAddingAdmin] = useState(false);

  const userOptions = userList?.map((user) => {
    return {
      value: user?.email,
      label: user?.name,
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
  };

  const addPropertyManager = () => {
    setAddingAdmin(true);

    const formdata = {
      email,
    };

    http
      .put(
        `${env.clinton_homes_base_url}/admin/add-project-manager/${unitId}`,
        formdata
      )
      .then((response) => {
        // console.log(response);
        toast.success("Admin Assigned to Property");
        clearFields();
        triggerReload();
        setAddingAdmin(false);
        handleClose();
      })
      .catch((error) => {
        // console.log(error.response.data.message);
        toast.error(error?.response?.data?.message || "An Error Occured");
        setAddingAdmin(false);
      });

    // console.log(formdata);
  };

  return (
    <div
      className="input-container"
      style={{
        height: "300px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        // gap: "20px",
      }}
    >
      <Notification />
      <SearchableDropdown
        options={userOptions}
        placeholder="Select Admin"
        // handleInputChange={handleAccountSelectChange}
        handleInputChange={handleUserSelection}
        // selectedOption={selectedAccount}
      />

      <ButtonCommon
        content={addingAdmin ? <img src={spinner} /> : "Add"}
        backgroundColor="#F8F4F6"
        textColor="#721F4B"
        marginTop="16px"
        onClick={addPropertyManager}
      />
    </div>
  );
};

export default AssignAdminForm;
