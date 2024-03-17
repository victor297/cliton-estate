import React, { useState, useCallback } from "react";
import styled from "styled-components";
import addImageButton from "../../assets/dashboard/addImageIcon.svg";
import { CardsWrapper } from "../../pages/userPages/dashboardStyles";
import useGetOneProject from "../../app/services/projects/useGetOneProject";
import Spinner from "../../assets/common/spinner.svg";
import { http, httpCloudinary } from "../../app/services/axios-https";
import Notification from "../Notification";
import toast from "react-hot-toast";
import env from "../../env";
import ButtonCommon from "../button/ButtonCommon";
import ActionButton from "../button/ActionButton";
import PlayButton from "../../assets/common/play-button.svg";
import { ImageContainer } from "../../pages/adminPages/dashboard/AdminDashboardStyles";

import { useDropzone } from "react-dropzone";

const AddUnitVideos = ({ unitId, reloadData }) => {
  const [uploadedVideos, setUploadedVideos] = useState([]);
  const [uploadedVideosUrl, setUploadedVideosUrl] = useState([]);
  const [uploadedVideosPreviewUrl, setUploadedVideosPreviewUrl] = useState([]);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [addingVideo, setAddingVideo] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    const maxSize = 20971520;
    if (acceptedFiles[0]?.size > maxSize) {
      toast.error("Maximum file size (100mb) exceeded");
      return;
    }
    setUploadingVideo(true);
    const newVideos = acceptedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file), // Create a preview URL for the image
    }));

    const formdata = new FormData();
    acceptedFiles.forEach((file) => {
      formdata.append("file", file);
      formdata.append("upload_preset", env.cloudinary_upload_preset);
      formdata.append("cloud_name", env.cloudinary_cloud_name);
      formdata.append("folder", "Cloudinary-ClintonDevs");

      httpCloudinary
        .post(
          `https://api.cloudinary.com/v1_1/${env.cloudinary_cloud_name}/video/upload`,
          formdata
        )
        .then((response) => {
          // console.log(response?.data?.url);
          toast.success("Videos uploaded");
          setUploadedVideosUrl((prevVideosUrl) => [
            ...prevVideosUrl,
            response.data.url,
          ]);
          setUploadedVideosPreviewUrl((prevVideosPreviewUrl) => [
            ...prevVideosPreviewUrl,
            response.data.secure_url,
          ]);
          setUploadingVideo(false);
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message || "Image upload error");
          setUploadingVideo(false);
        });
    });

    setUploadedVideos((prevVideos) => [...prevVideos, ...newVideos]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const addUnitVideos = () => {
    setAddingVideo(true);
    const formdata = {
      fileType: "unit-video",
      images: uploadedVideosUrl,
    };

    http
      .post(
        `${env.clinton_homes_base_url}/admin/unit/${unitId}/floor-plan`,
        formdata
      )
      .then((response) => {
        toast.success("New Videos Added");
        // console.log(response?.data?.data);
        setAddingVideo(false);
        reloadData();
      })
      .catch((error) => {
        console.log(error);
        toast.error(error?.response?.data?.message || "An Error Occured");
      });
  };

  return (
    <>
      <AddImagesContainer>
        <Notification />
        <div className="header-wrapper">
          <h3 onClick={() => console.log(uploadedVideos)}>Unit Videos</h3>

          <div {...getRootProps()} style={{ textAlign: "end" }}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <ActionButton
                text="Add Videos"
                loading={uploadingVideo}
                loadingText="Uploading video..."
              />
            )}
          </div>
        </div>
      </AddImagesContainer>

      {uploadedVideosUrl.length > 0 && (
        <AddImagesContainer>
          <CardsWrapper>
            {uploadedVideos.map((video, index) => {
              return (
                <ImageContainer>
                  <Play>
                    <img src={PlayButton} alt="play_button" />
                  </Play>
                  <video autoPlay loop muted>
                    <source src={video.preview + "#t=0,5"} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </ImageContainer>
              );
            })}
          </CardsWrapper>

          {uploadedVideos.length > 0 && (
            <div style={{ textAlign: "end" }}>
              <ButtonCommon
                content={addingVideo ? <img src={Spinner} /> : "Save"}
                backgroundColor="#F8F4F6"
                textColor="#721F4B"
                marginTop="16px"
                onClick={addUnitVideos}
                width="20%"
              />
            </div>
          )}
        </AddImagesContainer>
      )}
    </>
  );
};

export default AddUnitVideos;

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

// const ImageContainer = styled.div`
//   max-width: 100%;
//   height: 200px;

//   img,
//   video {
//     width: 100%;
//     height: 100%;
//     object-fit: cover;
//     display: block;
//   }
// `;
