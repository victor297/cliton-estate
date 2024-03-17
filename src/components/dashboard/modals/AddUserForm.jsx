import React, { useState } from "react";

import { http } from "../../../app/services/axios-https";
import env from "../../../env";
import InputCommon from "../../inputField/InputCommon";
import SelectCommon from "../../inputField/SelectCommon";
import ButtonCommon from "../../button/ButtonCommon";
import Notification from "../../Notification";
import spinner from "../../../assets/common/spinner.svg";
import toast from "react-hot-toast";

const AddUserForm = ({ triggerReload }) => {
  const [userType, setUserType] = useState("user");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [addingUser, setAddingUser] = useState(false);

  const clearFields = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhoneNumber("");
  };

  const addUser = () => {
    setAddingUser(true);
    const formdata = {
      firstName,
      lastName,
      phoneNumber,
      email,
    };

    http
      .post(`${env.clinton_homes_base_url}/admin/create-user`, formdata)
      .then((response) => {
        console.log(response);
        toast.success("User Added");
        clearFields();
        setAddingUser(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error?.response?.data?.message || "An Error Occured");
        setAddingUser(false);
      });

    // console.log(formdata);
  };

  const makeAdmin = () => {
    setAddingUser(true);
    const formdata = {
      firstName,
      lastName,
      phoneNumber,
      email,
      userType: "admin",
    };

    http
      .post(`${env.clinton_homes_base_url}/admin/create-user`, formdata)
      .then((response) => {
        // console.log(response);
        toast.success("Admin Created");
        clearFields();
        setAddingUser(false);
      })
      .catch((error) => {
        // console.log(error);
        setAddingUser(false);
        toast.error(error?.response?.data?.message || "An Error Occured");
      });
  };

  const handleAddUser = () => {
    if (userType === "user") {
      addUser();
    } else {
      makeAdmin();
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

      {/* <InputCommon placeholder="Type:" marginBottom="24px" /> */}
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
        onClick={handleAddUser}
      />
    </div>
  );
};

export default AddUserForm;
