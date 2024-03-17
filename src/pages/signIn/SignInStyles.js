import styled from "styled-components";
import { devices } from "../../utils/styles/breakpoints";

const LoginPageStyle = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  /* margin: 150px 100px; */

  ${`@media only screen and ${devices.lg}`} {
    /* Styles for small devices */

    grid-template-columns: 1fr 1fr;
    justify-items: center;
  }
`;

const LoginLeftColumn = styled.div`
  background-color: #f8f4f6;
  width: 100%;
  height: 100%;

  .images-container-text {
    /* width: 500px; */
    padding: 40px 50px;

    ${`@media only screen and ${devices.lg}`} {
      padding: 90px 50px;
    }

    h3 {
      color: #721f4b;
      font-size: 32px;
      font-weight: 700;
      line-height: normal;
      letter-spacing: 0.032px;
      margin-bottom: 32px;
    }

    p {
      color: #001660;
      font-size: 20px;
      font-weight: 400;
      line-height: 30px; /* 150% */
      letter-spacing: 0.02px;
    }
  }
`;

const HouseImagesContainer = styled.div`
  position: relative;
  height: 600px;
  margin-top: 90px;
  display: none;

  ${`@media only screen and ${devices.lg}`} {
    display: block;
  }
  .house-1 {
    position: absolute;
    top: 0px;
    left: 10%;
    z-index: 2;
    /* top: 100px;
    left: 15%; */

    /* ${`@media only screen and ${devices.xxxl}`} {
      left: 30%;
    } */
  }

  .house-2 {
    /* text-align: center; */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .house-3 {
    position: absolute;
    /* bottom: 100px;
    left: 60%; */
    bottom: 0px;
    right: 10%;
    z-index: 2;
  }
`;

const LoginRightColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  .login-inputs {
    margin-top: 80px;

    .input-message {
      margin-bottom: 32px;
      color: #721f4b;
      font-size: 12px;
      font-weight: 500;
      line-height: 28px; /* 233.333% */
      letter-spacing: 0.012px;
    }
    .error-message {
      margin-bottom: 32px;
      color: red;
      font-size: 12px;
      font-weight: 500;
      line-height: 28px; /* 233.333% */
      letter-spacing: 0.012px;
    }
  }
  .login-welcome-message {
    text-align: center;
    h3 {
      color: #721f4b;
      font-size: 32px;
      font-weight: 700;
      letter-spacing: 0.032px;
    }

    p {
      color: #6976a1;
      font-size: 18px;
      font-weight: 400;
      letter-spacing: 0.018px;
    }
  }

  .support-text {
    color: #721f4b;
    font-size: 18px;
    font-weight: 400;
    letter-spacing: 0.018px;
    justify-self: flex-end;
    margin: 30px auto 30px auto;

    a {
      color: inherit;
      text-decoration-line: underline;
    }

    ${`@media only screen and ${devices.lg}`} {
      margin: auto auto 90px auto;
    }
  }
`;

const LoginContainer = styled.div`
  padding-top: 30px;
  width: 90%;
  box-sizing: border-box;

  ${`@media only screen and ${devices.lg}`} {
    padding-top: 90px;
    width: 60%;
  }
`;

const LoginLabel = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const LoginInput = styled.input`
  /* width: 100%; */
  padding: 8px;
  margin-bottom: 15px;
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

export {
  LoginPageStyle,
  LoginLeftColumn,
  LoginRightColumn,
  HouseImagesContainer,
  LoginContainer,
  LoginLabel,
  LoginInput,
  LoginButton,
};
