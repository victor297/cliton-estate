import React from "react";
import WebsiteNav from "../../components/navbar/WebsiteNav";
import styled from "styled-components";
import PlayButton from "../../assets/common/play-button.svg";
import InfoContainer from "../../components/InfoContainer";
import InfoCard from "../../components/dashboard/InfoCard";
import { CardsWrapper } from "../userPages/dashboardStyles";
import { ImageContainer } from "../adminPages/dashboard/AdminDashboardStyles";
import { useNavigate } from "react-router-dom";
import bed from "../../assets/dashboard/bed-icon.svg";
import project_card_1 from "../../assets/offers/project_card_1.png";
import project_card_2 from "../../assets/offers/project_card_2.png";
import project_card_3 from "../../assets/offers/project_card_3.png";
import project_card_4 from "../../assets/offers/project_card_4.png";
import project_card_5 from "../../assets/offers/project_card_5.png";
import project_card_6 from "../../assets/offers/project_card_6.png";
import project_card_7 from "../../assets/offers/project_card_7.png";
import project_card_8 from "../../assets/offers/project_card_8.png";
import project_card_9 from "../../assets/offers/project_card_9.png";
import project_card_10 from "../../assets/offers/project_card_10.png";

import project_card_11 from "../../assets/offers/project_card_11.png";
import project_card_12 from "../../assets/offers/project_card_12.png";
import project_card_13 from "../../assets/offers/project_card_13.png";
import project_card_14 from "../../assets/offers/project_card_14.png";
import project_card_15 from "../../assets/offers/project_card_15.png";

import img_1 from "../../assets/offers/detail.png";

const OfferDetail = () => {
  const navigate = useNavigate();
  return (
    <OfferDetailStyle>
      <WebsiteNav activePage="offers" />

      <div className="detail-container">
        <InfoContainer
          title={
            <Title>
              <div onClick={() => navigate(-1)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M12.5 5C12.5 5 7.50001 8.68242 7.5 10C7.49999 11.3177 12.5 15 12.5 15"
                    stroke="#721F4B"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>

              <p>Project A</p>
            </Title>
          }
          style={{ backgroundColor: "inherit" }}
        >
          <>
            {/* <ProjectMainImages>
            <img src={projectImagesUrl[0]} alt="" className="left" />
            <img src={projectImagesUrl[1]} alt="" className="right-top" />
            <img src={projectImagesUrl[2]} alt="" className="right-bottom" />
          </ProjectMainImages> */}

            <div style={{ padding: "0px", marginBottom: "10px" }}>
              <img
                src={img_1}
                alt=""
                style={{ height: "100%", width: "100%", objectFit: "cover" }}
              />
            </div>

            <Description>
              <h3>Description</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Reiciendis assumenda dicta consectetur eveniet odio quisquam
                quibusdam voluptatibus voluptates quo sequi.
              </p>
            </Description>
          </>
        </InfoContainer>

        <InfoContainer
          title={"Project A - 9 units"}
          style={{ backgroundColor: "inherit" }}
        >
          <>
            <OffersWrapper>
              <InfoCard
                name="Minna Star Apartment"
                imgSrc={project_card_1}
                tagInfo={
                  <Tag>
                    <img src={bed} alt="" />
                    10
                  </Tag>
                }
                location="Lagos, Nigeria"
                link={`/offers/offer-detail`}
              />
              <InfoCard
                name="Minna Star Apartment"
                imgSrc={project_card_2}
                tagInfo={
                  <Tag>
                    <img src={bed} alt="" />
                    10
                  </Tag>
                }
                location="Lagos, Nigeria"
                link={`/offers/offer-detail`}
              />
              <InfoCard
                name="Minna Star Apartment"
                imgSrc={project_card_3}
                tagInfo={
                  <Tag>
                    <img src={bed} alt="" />
                    10
                  </Tag>
                }
                location="Lagos, Nigeria"
                link={`/offers/offer-detail`}
              />
              <InfoCard
                name="Minna Star Apartment"
                imgSrc={project_card_4}
                tagInfo={
                  <Tag>
                    <img src={bed} alt="" />
                    10
                  </Tag>
                }
                location="Lagos, Nigeria"
                link={`/offers/offer-detail`}
              />
              <InfoCard
                name="Minna Star Apartment"
                imgSrc={project_card_5}
                tagInfo={
                  <Tag>
                    <img src={bed} alt="" />
                    10
                  </Tag>
                }
                location="Lagos, Nigeria"
                link={`/offers/offer-detail`}
              />
              <InfoCard
                name="Minna Star Apartment"
                imgSrc={project_card_6}
                tagInfo={
                  <Tag>
                    <img src={bed} alt="" />
                    10
                  </Tag>
                }
                location="Lagos, Nigeria"
                link={`/offers/offer-detail`}
              />
              <InfoCard
                name="Minna Star Apartment"
                imgSrc={project_card_7}
                tagInfo={
                  <Tag>
                    <img src={bed} alt="" />
                    10
                  </Tag>
                }
                location="Lagos, Nigeria"
                link={`/offers/offer-detail`}
              />
              <InfoCard
                name="Minna Star Apartment"
                imgSrc={project_card_8}
                tagInfo={
                  <Tag>
                    <img src={bed} alt="" />
                    10
                  </Tag>
                }
                location="Lagos, Nigeria"
                link={`/offers/offer-detail`}
              />
              <InfoCard
                name="Minna Star Apartment"
                imgSrc={project_card_9}
                tagInfo={
                  <Tag>
                    <img src={bed} alt="" />
                    10
                  </Tag>
                }
                location="Lagos, Nigeria"
                link={`/offers/offer-detail`}
              />
            </OffersWrapper>
          </>
        </InfoContainer>

        <InfoContainer title="3D Images" style={{ backgroundColor: "inherit" }}>
          <>
            <CardsWrapper style={{ padding: "20px 0" }}>
              <div>
                <img src={project_card_5} alt="" style={{ maxWidth: "100%" }} />
              </div>
              <div>
                <img src={project_card_3} alt="" style={{ maxWidth: "100%" }} />
              </div>
              <div>
                <img src={project_card_1} alt="" style={{ maxWidth: "100%" }} />
              </div>
              <div>
                <img
                  src={project_card_10}
                  alt=""
                  style={{ maxWidth: "100%" }}
                />
              </div>
            </CardsWrapper>

            <Description>
              <h3>Description</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure
                magnam iste reprehenderit porro odio, ratione laborum aliquid
                dolorum quam praesentium libero ab, architecto et pariatur!
              </p>
            </Description>
          </>
        </InfoContainer>

        <InfoContainer
          title="Project Videos"
          style={{ backgroundColor: "inherit" }}
        >
          <>
            <CardsWrapper style={{ padding: "20px 0" }}>
              <ImageContainer>
                {/* <Play onClick={handleVideoClick}> */}
                <Play>
                  <img src={PlayButton} alt="play_button" />
                </Play>
                {/* <video muted onClick={handleVideoClick} ref={videoRef}>
                <source src={video.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video> */}
                <div style={{ filter: "brightness(0.5)" }}>
                  <img
                    src={project_card_14}
                    alt=""
                    style={{ maxWidth: "100%" }}
                  />
                </div>
              </ImageContainer>
              <ImageContainer>
                {/* <Play onClick={handleVideoClick}> */}
                <Play>
                  <img src={PlayButton} alt="play_button" />
                </Play>
                {/* <video muted onClick={handleVideoClick} ref={videoRef}>
                <source src={video.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video> */}
                <div style={{ filter: "brightness(0.5)" }}>
                  <img
                    src={project_card_13}
                    alt=""
                    style={{ maxWidth: "100%" }}
                  />
                </div>
              </ImageContainer>
              <ImageContainer>
                {/* <Play onClick={handleVideoClick}> */}
                <Play>
                  <img src={PlayButton} alt="play_button" />
                </Play>
                {/* <video muted onClick={handleVideoClick} ref={videoRef}>
                <source src={video.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video> */}
                <div style={{ filter: "brightness(0.5)" }}>
                  <img
                    src={project_card_12}
                    alt=""
                    style={{ maxWidth: "100%" }}
                  />
                </div>
              </ImageContainer>
              <ImageContainer>
                {/* <Play onClick={handleVideoClick}> */}
                <Play>
                  <img src={PlayButton} alt="play_button" />
                </Play>
                {/* <video muted onClick={handleVideoClick} ref={videoRef}>
                <source src={video.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video> */}
                <div style={{ filter: "brightness(0.5)" }}>
                  <img
                    src={project_card_11}
                    alt=""
                    style={{ maxWidth: "100%" }}
                  />
                </div>
              </ImageContainer>
            </CardsWrapper>

            <Description style={{ marginTop: "24px" }}>
              <h3>Description</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
                autem consequuntur quis consequatur labore neque inventore
                voluptatum aliquam ipsa officia.
              </p>
            </Description>
          </>
        </InfoContainer>
      </div>
    </OfferDetailStyle>
  );
};

export default OfferDetail;

const OfferDetailStyle = styled.div`
  p {
    color: #192861 !important;
  }
  .detail-container {
    padding: 0px 112px;
  }

  @media only screen and (max-width: 1500px) {
    .detail-container {
      padding: 20px;
    }
  }
`;

const OffersWrapper = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100%;
  margin: 0px auto;

  .gallery-image {
    width: 100%;
    height: 450px;
    img {
      width: 100%;
      height: 100%;
      /* object-fit: cover; */
    }
  }

  @media only screen and (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }

  @media only screen and (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  @media only screen and (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const Play = styled.div`
  position: absolute;
  top: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  z-index: 10;
  width: 64px;
  height: 64px;
  cursor: pointer;

  :hover {
    transform: scale(1.05, 1.05);
  }
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;

  p {
    margin-bottom: 6px;
  }
`;

const Description = styled.div`
  h3 {
    margin-bottom: 16px;
  }
  p {
    color: #192861;
    font-size: 16px;
    font-weight: 400;
    line-height: 30px; /* 187.5% */
    letter-spacing: 0.016px;
  }
`;

const Tag = styled.div`
  display: flex;
  gap: 6px;
`;
