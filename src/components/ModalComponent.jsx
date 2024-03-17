import { useState } from "react";

import { forwardRef } from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import styled from "styled-components";
import Close from "../assets/common/cancel.svg";

import InputCommon from "./inputField/InputCommon";
import SelectCommon from "./inputField/SelectCommon";
import ButtonCommon from "./button/ButtonCommon";

import { http } from "../app/services/axios-https";
import env from "../env";
import { CircularProgress, Input } from "@mui/material";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfirmationModalWithInput({
  open,
  handleClose,
  //   HeaderText,
  //   onClickConfirmButton,
  //   disableConfirmButton,
  //   loading,
  //   confirmationBody,
  //   confirmationText,
  //   onChangeReasonBody,
  //   reason,
}) {
  // const [open, setOpen] = useState(false);
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState("sm");
  const [userType, setUserType] = useState("user");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [isError, setIsError] = useState(false);

  const [userAdded, setUserAdded] = useState(false);

  const addUser = () => {
    const formdata = {
      firstName,
      lastName,
      email,
    };

    http
      .post(`${env.clinton_homes_base_url}/admin/create-user`, formdata)
      .then((response) => {
        // console.log(response);
        setUserAdded(true);
        setTimeout(() => {
          setUserAdded(false);
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
        setIsError(true);
        setTimeout(() => {
          setIsError(false);
        }, 3000);
      });

    // console.log(formdata);
  };

  const makeAdmin = () => {
    const formdata = {
      firstName,
      lastName,
      email,
    };

    http
      .post(`${env.clinton_homes_base_url}/admin/make-admin`, formdata)
      .then((response) => {
        console.log(response);
        setUserAdded(true);
        setTimeout(() => {
          setUserAdded(false);
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
        setIsError(true);
        setTimeout(() => {
          setIsError(false);
        }, 3000);
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
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        // TransitionComponent={Transition}
        // keepMounted
        aria-describedby="alert-dialog-slide-description"
        fullWidth={true}
        maxWidth="sm"
      >
        {userAdded ? (
          <>
            <ModalContainer>
              <ModalHeader>
                <div>
                  <h4>Add User</h4>
                </div>
                <img src={Close} alt="close" onClick={handleClose} />
                {/* <img src={} alt="cancel" onClick={} /> */}
              </ModalHeader>
              <ModalBody>
                <h4>User Added!</h4>
              </ModalBody>
            </ModalContainer>
          </>
        ) : isError ? (
          <ModalContainer>
            <ModalHeader>
              <div>
                <h4>Add User</h4>
              </div>
              <img src={Close} alt="close" onClick={handleClose} />
              {/* <img src={} alt="cancel" onClick={} /> */}
            </ModalHeader>
            <ModalBody>
              <h4 style={{ color: "red" }}>An Error Occured</h4>
            </ModalBody>
          </ModalContainer>
        ) : (
          <>
            <ModalContainer>
              <ModalHeader>
                <div>
                  <h4>Add User</h4>
                </div>
                <img src={Close} alt="close" onClick={handleClose} />
                {/* <img src={} alt="cancel" onClick={} /> */}
              </ModalHeader>
              <ModalBody>
                <div className="input-container">
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
                    content="Add"
                    backgroundColor="#E6E8EF"
                    marginTop="16px"
                    onClick={handleAddUser}
                  />
                </div>
              </ModalBody>
            </ModalContainer>
          </>
        )}
      </Dialog>
    </div>
  );
}

const ModalContainer = styled.div`
  /* width: 60vw;
  height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; */
  /* width: 600px; */
`;

const ModalHeader = styled.div`
  width: 100%;
  margin: 0px auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 24px 20px;
  box-sizing: border-box;

  h4 {
    color: #6976a1;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.02px;
  }

  p {
    margin: 0px;
    color: #98a2b3;
    font-size: 12px;
    font-weight: 400;
    line-height: 18px; /* 150% */
  }

  img {
    cursor: pointer;
    margin-top: 4px;
  }
`;

const ModalBody = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  margin: 0px auto;

  .input-container {
    width: 100%;
    margin: 32px auto;
  }

  h4 {
    color: #6976a1;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.02px;
    margin-bottom: 30px;
  }
`;

const InputField = styled.textarea`
  width: 98%;
  height: 80px;
  border: 0.0625rem solid #d3d3d3;
  border-radius: 0.25rem;
  padding: 16px;
  box-sizing: border-box;
  outline: none;
`;

const PersonalInformation = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  h4 {
    font-weight: 700;
    font-size: 14.4px;
    line-height: 17.6px;
    color: #000000;
    margin: 0;
    padding-bottom: 8px;
    width: 100%;
    padding-bottom: 16px;
  }
`;

//loading info style
const LoadingInfo = styled.div`
  display: flex;
  align-items: center;

  img {
    animation: spin infinite 2s linear;
    margin-right: 0.3125rem;
  }

  p {
    margin: 0.3125rem;
    color: #98a2b3;
    font-size: 0.75rem;
    font-weight: 500;
    line-height: 16px;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

//agent details style

const AgentDetails = styled.div`
  background-color: #fdf6f2;
  margin-top: 1.25rem;
  padding: 0.5rem 1.5rem;
  border-radius: 0.5rem;
  width: 80%;
  h3 {
    color: #1c2c02;
    font-size: 1rem;
    font-weight: 500;
    letter-spacing: 0.01rem;
  }

  p {
    color: #2b3241;
    font-size: 12px;
    font-weight: 400;
    letter-spacing: 0.12px;
  }
`;

const ActionButton = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 44.8px;

  a {
    background: #ffffff;
    color: #933d0c;
    border: 0.0625rem solid #933d0c;
    height: 48px;
    border-radius: 0.25rem;
    width: ${(props) =>
      props.transactionStatus === "FAILED" ? "49%" : "100%"};
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    text-decoration: none;

    img {
      margin-right: 8px;
    }
  }

  button {
    display: block;
    border-radius: 0.375rem;
    height: 48px;
    width: 49%;
  }
`;

const AcceptButton = styled.button`
  background: #933d0c;
  border: none;
  color: #ffffff;

  &:disabled {
    background: #7a7a7a;
  }
`;

const CancelButton = styled.button`
  background: #ffffff;
  color: #933d0c;
  border: 0.0625rem solid #933d0c;
`;
