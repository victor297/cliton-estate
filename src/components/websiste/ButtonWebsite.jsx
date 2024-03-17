import React from "react";
import styled from "styled-components";
import diagonal_arrow from "../../assets/home/arrow_diagonal_up.svg";
import { useNavigate } from "react-router-dom";

const ButtonWebsite = ({ text, path }) => {
  const navigate = useNavigate();

  return (
    <ButtonStyle>
      <div className="btn-wrapper" onClick={() => navigate(path)}>
        <p>{text}</p>
        <div>
          <img src={diagonal_arrow} alt="" style={{ marginTop: "6px" }} />
        </div>
      </div>
    </ButtonStyle>
  );
};

export default ButtonWebsite;

const ButtonStyle = styled.div`
  border: 1px solid #721f4b;
  width: fit-content;
  border-radius: 50px;
  cursor: pointer;

  .btn-wrapper {
    background-color: #721f4b;
    padding: 14px 26px;
    width: fit-content;
    color: #fff;
    border: 1px solid white;
    border-radius: 50px;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
  }
`;
