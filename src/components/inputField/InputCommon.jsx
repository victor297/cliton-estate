import styled from "styled-components";

const InputCommon = ({
  inputType,
  inputLabel,
  placeholder,
  marginBottom,
  onChange,
  value,
  disabled,
  // inputMode,
  // pattern,
}) => {
  return (
    <Container marginBottom={marginBottom}>
      <label htmlFor={inputType}>{inputLabel}</label>
      <input
        type={inputType}
        name={inputType}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        // inputMode={inputMode}
        // pattern={pattern}
      />
    </Container>
  );
};

export default InputCommon;

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

  input {
    width: 100%;
    height: 52px;
    padding: 20px 25px;
    /* border-radius: 5px; */
    border: 1px solid #eaecf0;
    /* box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05); */
    margin-top: 12px;
    box-sizing: border-box;

    border-radius: 13px;
    background: #fff;
    box-shadow: 0px 8px 50px -4px rgba(16, 24, 40, 0.01),
      0px 20px 50px -4px rgba(16, 24, 40, 0.03),
      1px -4px 50px 4px rgba(16, 24, 40, 0.01),
      0px -10px 50px 4px rgba(0, 0, 0, 0.03);
  }

  input:focus {
    border: none;
    border: 1px solid #721f4b;
    outline: none;
  }
`;
