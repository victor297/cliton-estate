import React, { useState, useCallback } from "react";
import styled from "styled-components";
import Sidebar from "../../../components/dashboard/Sidebar";
import InputCommon from "../../../components/inputField/InputCommon";
import InputCommonWithIcon from "../../../components/inputField/InputCommonWithIcon";
import ButtonCommon from "../../../components/button/ButtonCommon";
import AddImages from "../../../components/dashboard/AddImages";
import Add3DImages from "../../../components/dashboard/Add3DImages";
import AddProjectVideos from "../../../components/dashboard/AddProjectVideos";
import uploadButton from "../../../assets/common/upload.svg";
import Spinner from "../../../assets/common/spinner.svg";
import { http, httpCloudinary } from "../../../app/services/axios-https";
import env from "../../../env";
import { useDropzone } from "react-dropzone";
import { DashboardContainer, FormContainer } from "./AdminDashboardStyles";
import Notification from "../../../components/Notification";
import toast from "react-hot-toast";
import MobileAdminNav from "../../../components/navbar/MobileAdminNav";
import { useNavigate } from "react-router-dom";

const AddProjects = () => {
  const navigate = useNavigate();
  const [projectName, setProjectName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [creatingProject, setCreatingProject] = useState(false);
  const [projectId, setProjectId] = useState("");

  const [coverImageUrl, setCoverImageUrl] = useState("");

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
      .then((response) => {
        setCoverImageUrl(response.data.url);
        toast.success("Image uploaded");
      })
      .catch((error) =>
        toast.error(error.response.data.message || "Image upload error")
      );
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const createProject = () => {
    setCreatingProject(true);
    const formdata = {
      name: projectName,
      description,
      image: coverImageUrl,
      address,
      location,
      status: "ongoing",
    };
    http
      .post(`${env.clinton_homes_base_url}/admin/project`, formdata)
      .then((response) => {
        toast.success("Project Successfully Created");
        // console.log(response.data?.data._id);
        setProjectId(response.data?.data._id);
        setCreatingProject(false);
      })
      .catch((error) => {
        setCreatingProject(false);
        console.log(error);
        toast.error(error.response.data.message || "An Error Occured");
      });
  };

  return (
    <>
      <DashboardContainer>
        <Notification />
        <Sidebar />
        <MobileAdminNav />
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

              <h4>Add Project</h4>
            </Title>

            {projectId && (
              <button
                onClick={() =>
                  navigate(`/admin-dashboard/projects/${projectId}/add-units`)
                }
              >
                <span>+</span>Add Unit
              </button>
            )}
          </div>
          <div style={{ margin: "24px" }}>
            {/* <DataTable
              data={data}
              columns={columns}
              customStyles={customStyles}
            /> */}

            <FormContainer>
              <InputCommon
                placeholder="Project name:"
                marginBottom="24px"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
              <InputCommon
                placeholder="Description:"
                marginBottom="24px"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <InputCommon
                placeholder="Address:"
                marginBottom="24px"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <InputCommon
                placeholder="Location:"
                marginBottom="24px"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />

              <div {...getRootProps()}>
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p>Drop the files here ...</p>
                ) : (
                  <InputCommonWithIcon
                    placeholder={coverImage ? coverImage.name : "Upload Image"}
                    icon={uploadButton}
                    marginBottom={"32px"}
                  />
                )}
              </div>
              <div style={{ textAlign: "end" }}>
                <ButtonCommon
                  content={creatingProject ? <img src={Spinner} /> : "Save"}
                  backgroundColor="#F8F4F6"
                  textColor="#721F4B"
                  marginTop="16px"
                  onClick={createProject}
                  width="20%"
                />
              </div>
            </FormContainer>
            {projectId && <AddImages projectId={projectId} />}
            {projectId && <Add3DImages projectId={projectId} />}
            {projectId && <AddProjectVideos projectId={projectId} />}
          </div>
        </DashboardMain>
      </DashboardContainer>
    </>
  );
};

export default AddProjects;

const DashboardMain = styled.div`
  background-color: #fafafa;
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin: 40px 35px auto 35px;
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
