import React, { useState } from "react";

import { http } from "../../../app/services/axios-https";
import env from "../../../env";
import InputCommon from "../../inputField/InputCommon";
import ButtonCommon from "../../button/ButtonCommon";
import SelectCommon from "../../inputField/SelectCommon";
import Notification from "../../Notification";
import spinner from "../../../assets/common/spinner.svg";
import toast from "react-hot-toast";
import { useEffect } from "react";

const EditUserForm = ({ userId, triggerReload, handleClose, user }) => {
  const [userType, setUserType] = useState("user");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [addingUser, setAddingUser] = useState(false);
  console.log("user", user);
  const clearFields = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhoneNumber("");
  };
  useEffect(() => {
    setFirstName(user?.firstName);
    setLastName(user?.lastName);
    setEmail(user?.email);
    setPhoneNumber(user?.phoneNumber);
  }, []);
  const editUser = () => {
    setAddingUser(true);
    const formdata = {
      firstName,
      lastName,
      phoneNumber,
      email: email.trim(""),
    };

    http
      .put(`${env.clinton_homes_base_url}/admin/edit-user/${userId}`, formdata)
      .then((response) => {
        // console.log(response);
        toast.success("User Edited");
        triggerReload();
        handleClose();
        clearFields();
        setAddingUser(false);
      })
      .catch((error) => {
        // console.log(error);
        setAddingUser(false);
        toast.error(
          error?.response?.data?.message ||
            error?.response?.data[0]?.errors?.issues[0]?.message ||
            "An Error Occured"
        );
      });

    // console.log(formdata);
  };

  const editAdmin = () => {
    setAddingUser(true);
    const formdata = {
      firstName,
      lastName,
      phoneNumber,
      email,
      userType: "admin",
    };

    http
      .post(`${env.clinton_homes_base_url}/admin/edit-user/${userId}`, formdata)
      .then((response) => {
        // console.log(response);
        toast.success("Admin Created");
        handleClose();
        clearFields();
        triggerReload();
        setAddingUser(false);
      })
      .catch((error) => {
        // console.log(error);
        setAddingUser(false);
        toast.error(error?.response?.data?.message || "An Error Occured");
      });
  };

  const handleEditUser = () => {
    if (userType === "user") {
      editUser();
    } else {
      editAdmin();
    }
  };

  return (
    <div className="input-container">
      <Notification />
      <InputCommon
        placeholder="First name:"
        marginBottom="24px"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <InputCommon
        placeholder="Last name:"
        value={lastName}
        marginBottom="24px"
        onChange={(e) => setLastName(e.target.value)}
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

      <SelectCommon
        marginBottom="24px"
        value={userType}
        onChange={(e) => setUserType(e.target.value)}
      />

      <ButtonCommon
        content={addingUser ? <img src={spinner} /> : "Add"}
        backgroundColor="#F8F4F6"
        textColor="#721F4B"
        marginTop="16px"
        // onClick={editUser}
        onClick={() => handleEditUser()}
      />
    </div>
  );
};

export default EditUserForm;
