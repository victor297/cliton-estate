import styled from "styled-components";

const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: 270px 1fr;

  @media only screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const DashboardMain = styled.div`
  background-color: #fafafa;
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 40px 35px 70px 35px;
    /* height: 80px; */

    h4 {
      color: #721f4b;

      text-align: justify;

      font-size: 18px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      letter-spacing: 0.018px;
    }

    button {
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
    }
  }
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;

  h4 {
    margin-bottom: 6px;
  }
`;

const FormContainer = styled.div`
  padding: 24px;
  background-color: rgba(255, 255, 255, 1);
  width: 90%;
  margin: 0px auto 104px auto;
  border-radius: 6px;

  .form-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;
  }

  @media only screen and (max-width: 768px) {
    width: 90%;
  }

  h4 {
    color: #721f4b;
    font-size: 18px;
    font-weight: 700;
    letter-spacing: 0.018px;
    margin-bottom: 32px;
  }
`;

const AddImagesContainer = styled.div`
  padding: 24px;
  /* width: 100%; */
  background-color: #fff;

  .header-wrapper {
    display: flex;
    justify-content: space-between;
  }

  h3 {
    color: #721f4b;
    font-size: 18px;
    font-weight: 700;
    line-height: 26px; /* 144.444% */
    letter-spacing: 0.018px;
    margin-bottom: 32px;
  }
`;

const ImageContainer = styled.div`
  max-width: 100%;
  height: 200px;
  position: relative;

  img,
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

const TableContainer = styled.div`
  margin: 24px;
  padding: 24px;
  width: 90%;

  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

export {
  DashboardContainer,
  DashboardMain,
  Title,
  FormContainer,
  AddImagesContainer,
  ImageContainer,
  TableContainer,
};
