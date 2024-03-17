import React from "react";
import styled from "styled-components";

const TextArea = ({
  inputType,
  inputLabel,
  placeholder,
  marginBottom,
  onChange,
  value,
  disabled,
}) => {
  return (
    <Container marginBottom={marginBottom}>
      <label htmlFor={inputType}>{inputLabel}</label>
      <textarea
        name=""
        id=""
        cols="30"
        rows="10"
        type={inputType}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
      ></textarea>
    </Container>
  );
};

export default TextArea;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  ${(props) => props.marginBottom && `margin-bottom: ${props.marginBottom};`}

  label {
    color: #001660;
    font-size: 14px;
    font-weight: 500;
    line-height: 26px; /* 185.714% */
    letter-spacing: 0.014px;
  }

  textarea {
    border-radius: 13px;
    border: 1px solid #eaecf0;
    background: #fff;
    box-shadow: 0px 8px 50px -4px rgba(16, 24, 40, 0.01),
      0px 20px 50px -4px rgba(16, 24, 40, 0.03),
      1px -4px 50px 4px rgba(16, 24, 40, 0.01),
      0px -10px 50px 4px rgba(0, 0, 0, 0.03);
    width: 100%;
    padding: 20px 25px;
  }

  textarea:focus {
    border: none;
    border: 1px solid #721f4b;
    outline: none;
  }
`;
