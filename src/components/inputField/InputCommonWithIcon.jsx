import styled from "styled-components";

const InputCommonWithIcon = ({
  inputType,
  inputLabel,
  marginBottom,
  icon,
  onChange,
  value,
  onClickIcon,
  placeholder,
  disabled,
  iconMarginTop,
}) => {
  return (
    <Container marginBottom={marginBottom} iconMarginTop={iconMarginTop}>
      <label htmlFor={inputType}>{inputLabel}</label>
      <div className="inputWithIcon">
        <input
          type={inputType}
          name={inputType}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
        />
        <img src={icon} alt="" onClick={onClickIcon} />
      </div>
    </Container>
  );
};

export default InputCommonWithIcon;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  ${(props) => props.marginBottom && `margin-bottom: ${props.marginBottom};`}

  .inputWithIcon {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;

    img {
      cursor: pointer;
      position: absolute;
      right: 1rem;
      top: 1.2rem;
      margin-top: 4px;
      ${({ iconMarginTop }) => iconMarginTop && `margin-top: ${iconMarginTop}`}
    }
  }

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
    padding: 13px 20px;
    border-radius: 5px;
    border: 1px solid #eaecf0;
    box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
    margin-top: 12px;
    box-sizing: border-box;
  }

  input:focus {
    border: none;
    border: 1px solid #2753e8;
    outline: none;
  }
`;
