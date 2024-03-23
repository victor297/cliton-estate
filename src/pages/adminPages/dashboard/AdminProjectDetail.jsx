import React, { useState, useCallback, useRef, useEffect } from "react";
import env from "../../../env";
import { http, httpCloudinary } from "../../../app/services/axios-https";
import Spinner from "../../../assets/common/spinner.svg";
import { useNavigate, useParams } from "react-router-dom";
import DataTable from "react-data-table-component";
import ProjectUnitTable from "../../../components/dashboard/TableMobile/ProjectUnitTable";
import styled from "styled-components";
import {
  DashboardContainer,
  DashboardMain,
  Title,
  FormContainer,
  TableContainer,
} from "./AdminDashboardStyles";
import editButton from "../../../assets/dashboard/EditButton.svg";
import ActionButton from "../../../components/button/ActionButton";
import uploadButton from "../../../assets/common/upload.svg";
import Notification from "../../../components/Notification";
import toast from "react-hot-toast";
import Sidebar from "../../../components/dashboard/Sidebar";
import InputCommon from "../../../components/inputField/InputCommon";
import TextArea from "../../../components/inputField/TextArea";
import ButtonCommon from "../../../components/button/ButtonCommon";
import useGetOneProject from "../../../app/services/projects/useGetOneProject";
import { useDropzone } from "react-dropzone";
import InputCommonWithIcon from "../../../components/inputField/InputCommonWithIcon";
import MobileAdminNav from "../../../components/navbar/MobileAdminNav";
import { dashboardTableSyles } from "../../../utils/styles/tableStyles";
import Modal from "../../../components/dashboard/Modal";
import AddUnitForm from "../../../components/dashboard/modals/AddUnitForm";

import ProjectGallery from "../../../components/gallery/ProjectGallery";

const AdminProjectDetail = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [reloadCount, setReloadCount] = useState(0);
  const { loading, projectDetail, projectUnits } = useGetOneProject(
    projectId,
    reloadCount
  );

  const triggerReload = () => {
    // Update refreshKey to trigger a re-render
    setReloadCount((prevKey) => prevKey + 1);
  };

  const [readOnly, setReadOnly] = useState(true);

  const [coverImage, setCoverImage] = useState(null);
  const [coverImageUrl, setCoverImageUrl] = useState("");

  const [newProjectName, setNewProjectName] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [updatingProject, setUpdatingProject] = useState(false);
  const [openAddUnitForm, setOpenAddUnitForm] = useState(false);

  const handleOpenAddUnitForm = () => {
    setOpenAddUnitForm(true);
  };
  const handleCloseAddUnitForm = () => {
    setOpenAddUnitForm(false);
  };

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (readOnly == true) {
        console.log("readOnly", readOnly);
        return toast.error("click on edit to upload");
      }
      console.log(acceptedFiles);
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
    },
    [readOnly]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  const updateProject = () => {
    setUpdatingProject(true);
    const formdata = {
      ...projectDetail[0],
      name: newProjectName,
      description: newDescription,
      image: coverImageUrl,
      location: newLocation,
      address: newAddress,
    };
    http
      .put(
        `${env.clinton_homes_base_url}/admin/update-project/${projectId}`,
        formdata
      )
      .then((response) => {
        toast.success("Project Successfully Updated");
        setUpdatingProject(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message || "An Error Occured");
        setUpdatingProject(false);
      });
  };
  const HandleComplete = () => {
    // console.log("projectDetail", projectDetail);
    // setReadOnly(false);
    // if (!readOnly) {
    setUpdatingProject(true);
    const formdata = {
      ...projectDetail[0],
      status: "completed",
    };
    http
      .put(
        `${env.clinton_homes_base_url}/admin/update-project/${projectId}`,
        formdata
      )
      .then((response) => {
        toast.success("Project marked Completed");
        setUpdatingProject(false);
        triggerReload();
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message || "An Error Occured");
        setUpdatingProject(false);
      });
    // }
  };

  const columns = [
    {
      name: "ID",
      selector: (row) => row._id.substring(0, 5),
      grow: 0.2,
    },
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Type",
      selector: (row) => (row.type ? row.type : "---"),
      grow: 0.5,
    },

    {
      name: "No of Rooms",
      selector: (row) => row.numberOfRooms,
    },

    {
      name: "",
      cell: (row) => (
        <ActionButton
          text="View"
          handleAction={() => navigate(`/admin-dashboard/units/${row._id}`)}
        />
      ),
      grow: 0.5,
    },
  ];

  useEffect(() => {
    if (!readOnly) {
      toast("Project can now be edited!", {
        icon: "🖊️",
      });
      setNewProjectName(projectDetail[0].name);
      setNewAddress(projectDetail[0].address);
      setNewDescription(projectDetail[0].description);
      setNewLocation(projectDetail[0].location);
      setCoverImageUrl(projectDetail[0].image);
    }
  }, [readOnly]);

  useEffect(() => {}, []);

  return (
    <>
      <Modal
        modalOpenCondition={openAddUnitForm}
        headerPrimaryText="Add Unit"
        isFullWidth={true}
        maxWidth="sm"
        handleClose={handleCloseAddUnitForm}
      >
        <AddUnitForm projectId={projectId} triggerReload={triggerReload} />
      </Modal>
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

              <h4>Project Detail</h4>
            </Title>

            {projectId && (
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                {projectDetail[0]?.status === "completed" ? (
                  <div style={{ color: "#721F4B" }}>Completed</div>
                ) : (
                  <div
                    onClick={HandleComplete}
                    style={{
                      background: "green",
                      padding: "7px",
                      borderRadius: "5px",
                      color: "white",
                      cursor: "pointer",
                    }}
                  >
                    Mark Completed
                  </div>
                )}

                <div
                  onClick={() => setReadOnly(false)}
                  style={{ cursor: "pointer" }}
                >
                  <img src={editButton} alt="" />
                </div>
              </div>
            )}
          </div>

          <FormContainer>
            <InputCommon
              placeholder={`Project name: ${
                loading ? "fetching..." : projectDetail[0]?.name
              }`}
              marginBottom="24px"
              disabled={readOnly}
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
            />
            <TextArea
              placeholder={`Description: ${
                loading ? "fetching..." : projectDetail[0]?.description
              }`}
              disabled={readOnly}
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
            <InputCommon
              placeholder={`Address: ${
                loading ? "fetching..." : projectDetail[0]?.address
              }`}
              marginBottom="24px"
              disabled={readOnly}
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
            />

            <InputCommon
              placeholder={`Location: ${
                loading ? "fetching..." : projectDetail[0]?.location
              }`}
              marginBottom="24px"
              disabled={readOnly}
              value={newLocation}
              onChange={(e) => setNewLocation(e.target.value)}
            />

            <div {...getRootProps()} style={{ cursor: "default" }}>
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
                content={
                  readOnly ? (
                    "UnEditable"
                  ) : updatingProject ? (
                    <img src={Spinner} />
                  ) : (
                    "Save"
                  )
                }
                backgroundColor="#F8F4F6"
                textColor="#721F4B"
                marginTop="16px"
                onClick={updateProject}
                width="20%"
                disabled={readOnly}
              />
            </div>
          </FormContainer>

          <FormContainer>
            <SectionHeader>
              <h4 style={{ marginBottom: "0px" }}>Project Units</h4>
              <ActionButton
                text="Add Unit"
                handleAction={handleOpenAddUnitForm}
              />
            </SectionHeader>
            <TableContainer>
              {" "}
              <DataTable
                data={projectUnits}
                columns={columns}
                customStyles={dashboardTableSyles}
                noDataComponent={
                  <h3 style={{ textAlign: "center", color: "#e8e8e8" }}>
                    No units available
                  </h3>
                }
                // progressPending={loading}
              />
            </TableContainer>

            {loading ? (
              <h3 style={{ textAlign: "center", color: "#e8e8e8" }}>
                Loading...
              </h3>
            ) : (
              <ProjectUnitTable list={projectUnits} />
            )}
          </FormContainer>

          <ProjectGallery projectId={projectId} fileType="2D-image" />
          <ProjectGallery projectId={projectId} fileType="3D-image" />
          <ProjectGallery projectId={projectId} fileType="project-video" />
        </DashboardMain>
      </DashboardContainer>
    </>
  );
};

export default AdminProjectDetail;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
