import React, { useState, useCallback } from "react";
import styled from "styled-components";
import Notification from "../../../components/Notification";
import Sidebar from "../../../components/dashboard/Sidebar";
import toast from "react-hot-toast";
import InputCommon from "../../../components/inputField/InputCommon";
import InputCommonWithIcon from "../../../components/inputField/InputCommonWithIcon";
import AddFloorPlan from "../../../components/dashboard/AddFloorPlan";
import ButtonCommon from "../../../components/button/ButtonCommon";
import AddUser from "../../../components/dashboard/AddUser";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../../assets/common/spinner.svg";
import env from "../../../env";
import { http, httpCloudinary } from "../../../app/services/axios-https";
import { DashboardContainer } from "./AdminDashboardStyles";

import { useDropzone } from "react-dropzone";
import AddUnitVideos from "../../../components/dashboard/AddUnitVideos";

const AddUnits = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();

  const [unitName, setUnitName] = useState("");
  const [noOfRooms, setNoOfRooms] = useState();
  const [noOfBathrooms, setNoOfBathRooms] = useState();
  const [price, setPrice] = useState();
  const [paymentPlan, setPaymentPlan] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [addingUnit, setAddingUnit] = useState(false);
  const [unitId, setUnitId] = useState("");

  const onDrop = useCallback((acceptedFiles) => {
    // console.log(acceptedFiles);
    setCoverImage(acceptedFiles[0]);

    const formdata = new FormData();
    formdata.append("file", acceptedFiles[0]);
    formdata.append("upload_preset", env.cloudinary_upload_preset);
    formdata.append("cloud_name", env.cloudinary_cloud_name);
    formdata.append("folder", "Cloudinary-ClintonDevs");

    httpCloudinary
      .post(
        `https://api.cloudinary.com/v1_1/${env.cloudinary_cloud_name}/image/upload`,
        formdata
      )
      .then((response) => setCoverImageUrl(response.data.url))
      .catch((error) =>
        toast.error(error.response.data.message || "Image upload error")
      );
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const addUnit = () => {
    setAddingUnit(true);
    const formdata = {
      name: unitName,
      numberOfBathRooms: parseInt(noOfBathrooms),
      paymentPlan: paymentPlan,
      image: coverImageUrl,
      numberOfRooms: parseInt(noOfRooms),
      price: parseInt(price),
    };
    http
      .post(
        `${env.clinton_homes_base_url}/admin/project/${projectId}/create-unit`,
        formdata
      )
      .then((response) => {
        toast.success("Unit Successfully Created");
        console.log(response.data.data._id);
        setUnitId(response.data.data._id);
        setAddingUnit(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message || "An Error Occured");
      });
  };

  return (
    <>
      <DashboardContainer>
        <Notification />
        <Sidebar />
        <DashboardMain>
          <div className="navbar">
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

              <h4>Add Unit</h4>
            </Title>
          </div>

          <div style={{ margin: "24px" }}>
            <FormContainer>
              <InputCommon
                placeholder="Name:"
                marginBottom="24px"
                value={unitName}
                onChange={(e) => setUnitName(e.target.value)}
              />
              <InputCommon
                placeholder="Number of rooms:"
                marginBottom="24px"
                value={noOfRooms}
                onChange={(e) => setNoOfRooms(e.target.value)}
              />
              <InputCommon
                placeholder="Number of bathrooms:"
                marginBottom="24px"
                value={noOfBathrooms}
                onChange={(e) => setNoOfBathRooms(e.target.value)}
              />
              <InputCommon
                placeholder="Price:"
                marginBottom="24px"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <InputCommon
                placeholder="Payment plan:"
                marginBottom="24px"
                value={paymentPlan}
                onChange={(e) => setPaymentPlan(e.target.value)}
              />

              <div {...getRootProps()}>
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p>Drop the files here ...</p>
                ) : (
                  <InputCommonWithIcon
                    placeholder={coverImage ? coverImage.name : "Cover Image"}
                    icon={
                      <>
                        <p>Icon</p>
                      </>
                    }
                    marginBottom={"32px"}
                    readOnly={true}
                  />
                )}
              </div>
              <div style={{ textAlign: "end" }}>
                <ButtonCommon
                  content={addingUnit ? <img src={Spinner} /> : "Add"}
                  backgroundColor="#F8F4F6"
                  textColor="#721F4B"
                  marginTop="16px"
                  onClick={addUnit}
                  width="20%"
                />
              </div>
            </FormContainer>
            {unitId && <AddUser unitId={unitId} />}
            {unitId && <AddFloorPlan unitId={unitId} />}
            {unitId && <AddUnitVideos unitId={unitId} />}
          </div>
        </DashboardMain>
      </DashboardContainer>
    </>
  );
};

export default AddUnits;

const DashboardMain = styled.div`
  background-color: #fafafa;
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 40px auto 71px auto;
    /* height: 80px; */
    width: 70%;

    h4 {
      color: #721f4b;
      font-size: 18px;
      font-weight: 700;
      letter-spacing: 0.018px;
    }

    button {
      padding: 8px 14px;
      background-color: #f8f4f6;
      border: none;
      color: #721f4b;

      font-family: Satoshi;
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

const FormContainer = styled.div`
  padding: 24px;
  background-color: rgba(255, 255, 255, 1);
  width: 70%;
  margin: 0px auto 104px auto;
`;

const ImagesContainer = styled.div`
  background-color: #fff;
  margin: 100px auto 20px auto;
  width: 80%;

  height: 300px;

  .container-header {
    display: flex;
    justify-content: space-between;
  }
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;

  h4 {
    color: #721f4b;
    font-size: 18px;
    font-weight: 700;
    letter-spacing: 0.018px;
    margin-bottom: 6px;
  }
`;
