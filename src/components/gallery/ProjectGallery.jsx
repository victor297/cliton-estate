import React, { useState, useEffect, useRef } from "react";

import styled from "styled-components";

import env from "../../env";
import { http } from "../../app/services/axios-https";
import useGetOneProject from "../../app/services/projects/useGetOneProject";
import { ReactComponent as DeleteIcon } from "../../assets/common/cancel_red.svg";
import AddProjectVideos from "../dashboard/AddProjectVideos";
import PlayButton from "../../assets/common/play-button.svg";
import {
  AddImagesContainer,
  ImageContainer,
} from "../../pages/adminPages/dashboard/AdminDashboardStyles";
import AddImages from "../dashboard/AddImages";
import Add3DImages from "../dashboard/Add3DImages";
import { CardsWrapper } from "../../pages/userPages/dashboardStyles";
import ActionButton from "../button/ActionButton";

const ProjectGallery = ({ projectId, fileType }) => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [deleting, setDeleting] = useState("");

  const { loading, projectImages, project3DImages, projectVideos } =
    useGetOneProject(projectId, refreshKey);

  const [deleteMedia, setDeleteMedia] = useState(false);

  const images = [...projectImages, ...project3DImages];
  const activeImages = images.filter((image) => image.fileType === fileType);

  const reloadData = () => {
    // Update refreshKey to trigger a re-render
    setRefreshKey((prevKey) => prevKey + 1);
  };

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

  const deleteImage = (id) => {
    setDeleting(true);
    http
      .delete(`${env.clinton_homes_base_url}/admin/delete-file/${id}`)
      .then((response) => {
        console.log(response);
        reloadData();
        setDeleting(id);
      })
      .catch((error) => console.log(error));
  };

  const toggleDeleteMode = () => {
    deleteMedia ? setDeleteMedia(false) : setDeleteMedia(true);
  };

  return (
    <>
      {fileType === "project-video" ? (
        <AddImagesContainer>
          <AddProjectVideos projectId={projectId} reloadData={reloadData} />
          {projectVideos.length === 0 ? (
            <h3 style={{ textAlign: "center", color: "#e8e8e8" }}>
              {loading ? "Loading Videos..." : "No Videos Available"}
            </h3>
          ) : (
            <CardsWrapper>
              {projectVideos.map((video, index) => {
                return (
                  <ImageContainer>
                    {deleteMedia && (
                      <Delete onClick={() => deleteImage(video._id)}>
                        {deleting === video._id ? (
                          <>
                            <h3>Deleting...</h3>
                          </>
                        ) : (
                          <>
                            <h3>Delete</h3>
                            <DeleteIcon />
                          </>
                        )}
                      </Delete> //should not show when gallery is empty
                    )}

                    <Play onClick={handleVideoClick}>
                      <img src={PlayButton} alt="play_button" />
                    </Play>

                    <video muted ref={videoRef}>
                      <source src={video.url} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </ImageContainer>
                );
              })}
            </CardsWrapper>
          )}

          {projectVideos.length > 0 && (
            <div style={{ textAlign: "end", padding: "24px" }}>
              {deleteMedia ? (
                <ActionButton
                  text="Toggle View Mode"
                  handleAction={toggleDeleteMode}
                />
              ) : (
                <ActionButton
                  text="Toggle Delete Mode"
                  handleAction={toggleDeleteMode}
                />
              )}
            </div>
          )}
        </AddImagesContainer>
      ) : fileType === "2D-image" ? (
        <AddImagesContainer>
          <AddImages projectId={projectId} reloadData={reloadData} />
          {activeImages.length === 0 ? (
            <h3 style={{ textAlign: "center", color: "#e8e8e8" }}>
              {loading ? "Loading Images.." : "No Images Available"}
            </h3>
          ) : (
            <CardsWrapper>
              {activeImages.map((image, index) => {
                return (
                  <ImageContainer>
                    {deleteMedia && (
                      <Delete onClick={() => deleteImage(image._id)}>
                        {deleting === image._id ? (
                          <>
                            <h3>Deleting...</h3>
                          </>
                        ) : (
                          <>
                            <h3>Delete</h3>
                            <DeleteIcon />
                          </>
                        )}
                      </Delete> //should not show when gallery is empty
                    )}

                    <img src={image.url} alt={`Project Image -${index}`} />
                  </ImageContainer>
                );
              })}
            </CardsWrapper>
          )}

          {activeImages.length > 0 && (
            <div style={{ textAlign: "end", padding: "24px" }}>
              {deleteMedia ? (
                <ActionButton
                  text="Toggle View Mode"
                  handleAction={toggleDeleteMode}
                />
              ) : (
                <ActionButton
                  text="Toggle Delete Mode"
                  handleAction={toggleDeleteMode}
                />
              )}
            </div>
          )}
        </AddImagesContainer>
      ) : (
        <AddImagesContainer>
          <Add3DImages projectId={projectId} reloadData={reloadData} />
          {activeImages.length === 0 ? (
            <h3 style={{ textAlign: "center", color: "#e8e8e8" }}>
              {loading ? "Loading Images.." : "No Images Available"}
            </h3>
          ) : (
            <CardsWrapper>
              {activeImages.map((image, index) => {
                return (
                  <ImageContainer>
                    {deleteMedia && (
                      <Delete onClick={() => deleteImage(image._id)}>
                        {deleting === image._id ? (
                          <>
                            <h3>Deleting...</h3>
                          </>
                        ) : (
                          <>
                            <h3>Delete</h3>
                            <DeleteIcon />
                          </>
                        )}
                      </Delete> //should not show when gallery is empty
                    )}

                    <img src={image.url} alt={`Project Image -${index}`} />
                  </ImageContainer>
                );
              })}
            </CardsWrapper>
          )}

          {activeImages.length > 0 && (
            <div style={{ textAlign: "end", padding: "24px" }}>
              {deleteMedia ? (
                <ActionButton
                  text="Toggle View Mode"
                  handleAction={toggleDeleteMode}
                />
              ) : (
                <ActionButton
                  text="Toggle Delete Mode"
                  handleAction={toggleDeleteMode}
                />
              )}
            </div>
          )}
        </AddImagesContainer>
      )}
    </>
  );
};

export default ProjectGallery;

const Delete = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 4px;
  background-color: #fff;
  position: absolute;
  top: 0%;
  right: 0%;
  padding: 4px 10px;
  z-index: 10;
  cursor: pointer;

  h3 {
    margin: 0;
    color: #721f4b;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.012px;
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
