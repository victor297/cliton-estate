import React, { useRef } from "react";
import env from "../../env";
import { useParams, useNavigate } from "react-router-dom";
import DashboardNav from "../../components/navbar/DashboardNav";
import WebsiteNav from "../../components/navbar/WebsiteNav";
import styled from "styled-components";
import { ReactComponent as Spinner } from "../../assets/common/spinner-large.svg";
import InfoContainer from "../../components/InfoContainer";
import InfoCard from "../../components/dashboard/InfoCard";
import bed from "../../assets/dashboard/bed-icon.svg";
import PlayButton from "../../assets/common/play-button.svg";
import useGetOneProject from "../../app/services/projects/useGetOneProject";

import { CardsWrapper } from "./dashboardStyles";
import { ImageContainer } from "../adminPages/dashboard/AdminDashboardStyles";

const ProjectDetail = () => {
  const user = env?.getUser();
  const navigate = useNavigate();
  const { projectId } = useParams();
  const {
    loading,
    projectDetail,
    projectImages,
    project3DImages,
    projectVideos,
    projectUnits,
  } = useGetOneProject(projectId);

  const projectImagesUrl = projectImages.map((image) => {
    return image.url;
  });

  const projectName = projectDetail[0]?.name;

  const videoRef = useRef(null);

  const handleVideoClick = () => {
    const videoElement = videoRef.current;

    if (videoElement) {
      if (videoElement.requestFullscreen) {
        videoElement.requestFullscreen();
      } else if (videoElement.mozRequestFullScreen) {
        videoElement.mozRequestFullScreen();
      } else if (videoElement.webkitRequestFullscreen) {
        videoElement.webkitRequestFullscreen();
      } else if (videoElement.msRequestFullscreen) {
        videoElement.msRequestFullscreen();
      }

      videoElement.play();
    }
  };

  return (
    <>
      {user ? <DashboardNav /> : <WebsiteNav activePage="offers" />}

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

            <p>{loading ? "" : projectName}</p>
          </Title>
        }
      >
        {loading ? (
          <Spinner />
        ) : (
          <>
            {projectImages.length === 0 ? (
              <h3 style={{ textAlign: "center", color: "#e8e8e8" }}>
                No Images Available
              </h3>
            ) : (
              <ProjectMainImages>
                <img src={projectImagesUrl[0]} alt="" className="left" />
                <img src={projectImagesUrl[1]} alt="" className="right-top" />
                <img
                  src={projectImagesUrl[2]}
                  alt=""
                  className="right-bottom"
                />
              </ProjectMainImages>
            )}

            <Description>
              <h3>Description</h3>
              <p>{projectDetail[0]?.description}</p>
            </Description>
          </>
        )}
      </InfoContainer>

      <InfoContainer
        title={
          loading
            ? ""
            : `${projectName} - ${projectUnits.length} Unit${
                projectUnits.length > 1 ? "s" : ""
              }`
        }
      >
        {loading ? (
          <Spinner />
        ) : (
          <>
            <CardsWrapper>
              {projectUnits.map((unit) => {
                return (
                  <InfoCard
                    linkToMessage="/messages"
                    unitId={unit._id}
                    name={unit.name}
                    imgSrc={unit.image}
                    price={unit.price}
                    tagInfo={
                      <Tag>
                        <img src={bed} alt="" />
                        {unit.numberOfRooms}
                      </Tag>
                    }
                    link={`/projects/units/${unit._id}`}
                  />
                );
              })}
            </CardsWrapper>
          </>
        )}
      </InfoContainer>

      <InfoContainer title="3D Images">
        {loading ? (
          <Spinner />
        ) : (
          <>
            <CardsWrapper>
              {project3DImages.length === 0 ? (
                <h3 style={{ textAlign: "center", color: "#e8e8e8" }}>
                  No Images Available
                </h3>
              ) : (
                project3DImages.map((image) => {
                  return (
                    <div>
                      <img
                        src={image.url}
                        alt=""
                        style={{ maxWidth: "100%", height: "100%" }}
                      />
                    </div>
                  );
                })
              )}
            </CardsWrapper>

            <Description>
              <h3>Description</h3>
              <p>{projectDetail[0]?.description}</p>
            </Description>
          </>
        )}
      </InfoContainer>

      <InfoContainer title="Project Videos">
        {loading ? (
          <Spinner />
        ) : (
          <>
            <CardsWrapper>
              {projectVideos.length === 0 ? (
                <h3 style={{ textAlign: "center", color: "#e8e8e8" }}>
                  No Video Available
                </h3>
              ) : (
                projectVideos.map((video) => {
                  return (
                    <ImageContainer>
                      <Play onClick={handleVideoClick}>
                        <img src={PlayButton} alt="play_button" />
                      </Play>
                      <video muted onClick={handleVideoClick} ref={videoRef}>
                        <source src={video.url} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </ImageContainer>
                  );
                })
              )}
            </CardsWrapper>

            <Description>
              <h3>Description</h3>
              <p>{projectDetail[0]?.description}</p>
            </Description>
          </>
        )}
      </InfoContainer>
    </>
  );
};

export default ProjectDetail;

const ProjectMainImages = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
  grid-template-areas:
    "left left rightTop"
    "left left rightBottom";

  padding: 24px;

  .left {
    grid-area: left;
  }
  .right-top {
    grid-area: rightTop;
  }
  .right-bottom {
    grid-area: rightBottom;
  }

  img {
    width: 100%;
    height: 100%;
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
