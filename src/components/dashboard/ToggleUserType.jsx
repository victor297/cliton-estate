import React, { useState } from "react";
import styled from "styled-components";
import { ReactComponent as ArrowDown } from "../../assets/common/arrow-down-01-round.svg";

const ToggleUserType = ({
  showUserOption,
  toggleUser,
  userType,
  handleSelectUser,
}) => {
  return (
    <ToggleUserContainer>
      <ToggleUser onClick={toggleUser} showUserOption={showUserOption}>
        <h3>{userType}</h3>
        <ArrowDown style={{ marginTop: "2px" }} />
      </ToggleUser>
      {showUserOption && (
        <ToggleUserOption showUserOption={showUserOption} userType={userType}>
          <h3
            className={`${userType === "user" && "active"}`}
            onClick={() => handleSelectUser("user")}
          >
            User
          </h3>
          <h3
            className={`${userType === "admin" && "active"}`}
            onClick={() => handleSelectUser("admin")}
          >
            Admin
          </h3>
        </ToggleUserOption>
      )}
    </ToggleUserContainer>
  );
};

export default ToggleUserType;

const ToggleUserContainer = styled.div`
  position: relative;
  width: fit-content;
  cursor: default;

  h3 {
    text-transform: capitalize;
  }
`;

const ToggleUser = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  border-radius: 5px;
  ${({ showUserOption }) => showUserOption && "border-radius: 5px 5px 0px 0px;"}
  background-color: #f1e9ed;
  padding: 8px 16px;
  width: 100%;
  h3 {
    color: #721f4b;
    font-size: 16px;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 0.016px;
  }
`;

const ToggleUserOption = styled.div`
  border-radius: 5px;
  background-color: #f1e9ed;
  cursor: pointer;
  height: 65px;
  position: absolute;
  top: 100%;
  left: 0%;
  bottom: 50px;
  z-index: 10;
  border-radius: 0px 0px 5px 5px;
  width: 100%;
  ${({ showUserOption }) => showUserOption && "border-top: 0.3px solid #fff;"}
  :hover {
    background-color: #fff;
  }
  h3 {
    color: #721f4b;
    font-size: 16px;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 0.016px;
    padding: 5px;
    padding-left: 15px;
  }

  .active {
    background-color: #fff;
  }
`;
