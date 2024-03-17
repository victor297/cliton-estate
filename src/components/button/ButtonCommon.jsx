import styled from "styled-components";
// import CircularProgress from "@mui/material/CircularProgress";

const ButtonCommon = ({
  content,
  onClick,
  width,
  //   marginTop,
  backgroundColor,
  textColor,
  disabled,
  //   isLoading,
}) => {
  return (
    <ButtonContainer
      onClick={onClick}
      //   marginTop={marginTop}
      backgroundColor={backgroundColor}
      textColor={textColor}
      disabled={disabled}
      width={width}
    >
      {/* {isLoading ? <CircularProgress size={20} color="inherit" /> : text} */}
      {content}
    </ButtonContainer>
  );
};

export default ButtonCommon;

const ButtonContainer = styled.button`
  /* width: 100%; */
  ${(props) => (props.width ? `width: ${props.width};` : `width: 100%;`)}
  height: 54px;
  border-radius: 9px;
  border: none;
  font-weight: 700;
  font-size: 1rem;
  line-height: 28px; /* 175% */
  letter-spacing: 0.016px;
  cursor: pointer;
  ${(props) =>
    props.textColor ? `color: ${props.textColor};` : `color: #ffffff;`}
  ${(props) => props.marginTop && `margin-top: ${props.marginTop};`}
    ${(props) =>
    props.backgroundColor
      ? `background-color: ${props.backgroundColor};`
      : `background-color: #933d0c;`} /* 
    &:disabled {
    background-color: #7a7a7a;
    cursor: not-allowed;
  } */
`;
