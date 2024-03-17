import React from "react";
import styled from "styled-components";

const ActionButton = ({ text, loading, loadingText, handleAction, sign }) => {
  return (
    <ActionButtonDiv onClick={handleAction}>
      {sign && <span>+</span>}
      {loading ? loadingText : text}
    </ActionButtonDiv>
  );
};

export default ActionButton;

const ActionButtonDiv = styled.button`
  padding: 8px 14px;
  background-color: #f1e9ed;
  border: none;
  border-radius: 5px;
  color: #721f4b;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: 0.016px;

  span {
    margin-right: 8px;
  }
`;
