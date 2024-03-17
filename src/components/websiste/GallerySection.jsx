import React, { useRef } from "react";

import pic1 from "../../assets/home/gallery_img_1.png";
import pic2 from "../../assets/home/gallery_img_2.png";
import pic3 from "../../assets/home/gallery_img_3.png";
import gallery_arrow from "../../assets/home/gallery_arrow.svg";

import ButtonWebsite from "./ButtonWebsite";
import styled from "styled-components";

const GallerySection = () => {
  const scrollContainerRef = useRef(null);

  const scrollToRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += 400; // Adjust the scroll distance as needed
    }
  };

  const scrollToLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft -= 400; // Adjust the scroll distance as needed
    }
  };

  return (
    <GalleryStyle>
      <div className="gallery-header">
        <h3>Look Through Our Gallery</h3>
        <p className="text">
          Your Dream, Our Design - Find Inspiration in Our Gallery
        </p>
        <ButtonWebsite text="See more" path="/gallery" />
      </div>

      <div className="image-showcase" ref={scrollContainerRef}>
        <div className="gallery-arrow-right" onClick={() => scrollToRight()}>
          <img src={gallery_arrow} alt="" />
        </div>
        <div className="gallery-arrow-left" onClick={() => scrollToLeft()}>
          <img src={gallery_arrow} alt="" />
        </div>
        <div className="img-container">
          <img src={pic2} alt="" />
        </div>
        <div className="img-container">
          <img src={pic3} alt="" />
        </div>
        <div className="img-container">
          <img src={pic1} alt="" />
        </div>
        <div className="img-container">
          <img src={pic2} alt="" />
        </div>
        <div className="img-container">
          <img src={pic3} alt="" />
        </div>

        <div className="img-container">
          <img src={pic2} alt="" />
        </div>
        <div className="img-container">
          <img src={pic3} alt="" />
        </div>
        <div className="img-container">
          <img src={pic1} alt="" />
        </div>
        <div className="img-container">
          <img src={pic2} alt="" />
        </div>
        <div className="img-container">
          <img src={pic3} alt="" />
        </div>

        <div className="img-container">
          <img src={pic2} alt="" />
        </div>
        <div className="img-container">
          <img src={pic3} alt="" />
        </div>
        <div className="img-container">
          <img src={pic1} alt="" />
        </div>
        <div className="img-container">
          <img src={pic2} alt="" />
        </div>
        <div className="img-container">
          <img src={pic3} alt="" />
        </div>
      </div>
    </GalleryStyle>
  );
};

export default GallerySection;

const GalleryStyle = styled.div`
  position: relative;
  margin-bottom: 150px;
  .gallery-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 92px;
    h3 {
      font-weight: 500;
      font-size: 48px;
      letter-spacing: 0.001em;
      color: #192861;
      margin-bottom: 16px;
    }
    .text {
      font-weight: 400;
      font-size: 20px;
      letter-spacing: 0.001em;
      margin-bottom: 56px;
      color: #192861;
    }
  }

  .image-showcase {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;

    overflow-x: hidden;
    overflow-y: hidden;
    scroll-behavior: smooth;
    scroll-snap-type: x mandatory; /* Enable horizontal scrolling with mandatory snap points */
    -webkit-overflow-scrolling: touch;

    .gallery-arrow-right {
      position: absolute;
      bottom: 3%;
      right: 5%;
      cursor: pointer;
    }
    .gallery-arrow-left {
      position: absolute;
      bottom: 3%;
      left: 5%;
      cursor: pointer;
      transform: scale(-1);
    }

    .img-container {
      width: 482px;
      height: 490px;
      border-radius: 6px;

      img {
        border-radius: 6px;
      }
    }
  }

  @media only screen and (max-width: 768px) {
    .gallery-header {
      h3 {
        font-weight: 500;
        font-size: 30px;
      }
      .text {
        font-weight: 400;
        font-size: 16px;
      }
    }
  }
`;
