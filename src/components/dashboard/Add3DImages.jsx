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

import { useDropzone } from "react-dropzone";

const Add3DImages = ({ projectId, reloadData }) => {
  const [uploaded3DImages, setUploaded3DImages] = useState([]);
  const [uploaded3DImagesUrl, setUploaded3DImagesUrl] = useState([]);
  const [adding3DImage, setAdding3DImage] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    const newImages = acceptedFiles.map((file) => ({
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
          `https://api.cloudinary.com/v1_1/${env.cloudinary_cloud_name}/image/upload`,
          formdata
        )
        .then((response) => {
          // console.log(response?.data?.url);
          toast.success("Images uploaded");
          setUploaded3DImagesUrl((prevImagesUrl) => [
            ...prevImagesUrl,
            response.data.url,
          ]);
        })
        .catch((error) =>
          toast.error(error?.response?.data?.message || "Image upload error")
        );
    });

    setUploaded3DImages((prevImages) => [...prevImages, ...newImages]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const add3DProjectImages = () => {
    setAdding3DImage(true);
    const formdata = { fileType: "3D-image", images: uploaded3DImagesUrl };

    http
      .post(
        `${env.clinton_homes_base_url}/admin/project/${projectId}/images`,
        formdata
      )
      .then((response) => {
        toast.success("New 3D Images Added");
        // console.log(response?.data?.data);
        setAdding3DImage(false);
        reloadData();
      })
      .catch((error) => {
        // console.log(error);
        toast.error(error?.response?.data?.message || "An Error Occured");
      });
  };

  return (
    <>
      {" "}
      {/* For 3D Images */}
      <AddImagesContainer style={{}}>
        <Notification />
        <div className="header-wrapper">
          <h3>3D Images</h3>

          <div {...getRootProps()} style={{ textAlign: "end" }}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <img src={addImageButton} alt="" />
            )}
          </div>
        </div>
      </AddImagesContainer>
      {uploaded3DImages.length > 0 && (
        <AddImagesContainer>
          <CardsWrapper>
            {uploaded3DImages.map((image, index) => {
              return (
                <ImageContainer>
                  <img src={image.preview} alt={`Preview-${index}`} />
                </ImageContainer>
              );
            })}
          </CardsWrapper>

          {uploaded3DImages.length > 0 && (
            <div style={{ textAlign: "end" }}>
              <ButtonCommon
                content={adding3DImage ? <img src={Spinner} /> : "Save"}
                backgroundColor="#F8F4F6"
                textColor="#721F4B"
                marginTop="16px"
                onClick={add3DProjectImages}
                width="20%"
              />
            </div>
          )}
        </AddImagesContainer>
      )}
    </>
  );
};

export default Add3DImages;

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

  img {
    width: 100%;
    height: 100%;
    display: block;
  }
`;
