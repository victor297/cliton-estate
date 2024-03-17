import React from "react";
import banner from "../../assets/home/banner_home.png";
import styled from "styled-components";

const Background = () => {
  return (
    <BackgroundStyle className="banner">
      <img src={banner} alt="" />
    </BackgroundStyle>
  );
};

export default Background;

const BackgroundStyle = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;

  img {
    width: 100%;
    height: 100%;
    z-index: 0;
  }
`;
