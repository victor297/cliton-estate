import React, { useState, useEffect, useCallback, useRef } from "react";
import env from "../../../env";
import styled from "styled-components";
import { dashboardTableSyles } from "../../../utils/styles/tableStyles";
import { http, httpCloudinary } from "../../../app/services/axios-https";
import Spinner from "../../../assets/common/spinner.svg";
import { useNavigate, useParams } from "react-router-dom";
import {
  DashboardContainer,
  DashboardMain,
  Title,
  FormContainer,
  ImageContainer,
  AddImagesContainer,
  TableContainer,
} from "./AdminDashboardStyles";
import AddUnitVideos from "../../../components/dashboard/AddUnitVideos";
import { CardsWrapper } from "../../userPages/dashboardStyles";
import editButton from "../../../assets/dashboard/EditButton.svg";
import updateButton from "../../../assets/dashboard/updateIcon.svg";
import ActionButton from "../../../components/button/ActionButton";
import uploadButton from "../../../assets/common/upload.svg";
import Notification from "../../../components/Notification";
import toast from "react-hot-toast";
import Sidebar from "../../../components/dashboard/Sidebar";
import InputCommon from "../../../components/inputField/InputCommon";
import ButtonCommon from "../../../components/button/ButtonCommon";
import useGetOneUnit from "../../../app/services/units/useGetOneUnit";
import useGetUnitUser from "../../../app/services/users/useGetUnitUser";
import useGetUnitTransactions from "../../../app/services/Transactions/useGetUnitTransactions";
import { useDropzone } from "react-dropzone";
import InputCommonWithIcon from "../../../components/inputField/InputCommonWithIcon";
import MobileAdminNav from "../../../components/navbar/MobileAdminNav";
import Modal from "../../../components/dashboard/Modal";
import AssignUserForm from "../../../components/dashboard/modals/AssignUserForm";
import UpdatePaymentForm from "../../../components/dashboard/modals/updatePaymentForm";
import AssignAdminForm from "../../../components/dashboard/modals/AssignAdminForm";
import DataTable from "react-data-table-component";
import ProjectUnitTable from "../../../components/dashboard/TableMobile/ProjectUnitTable";
import UnitTransactionsTable from "../../../components/dashboard/TableMobile/UnitTransactionsTable";
import UnitGallery from "../../../components/gallery/UnitGallery";
import { formatNumber } from "../../../utils/styles/formatNumber";

const AdminUnitDetails = () => {
  const navigate = useNavigate();
  const { unitId } = useParams();

  const [reloadCount, setReloadCount] = useState(0);
  const { loading, unitDetail, floorPlanImages, unitVideos } = useGetOneUnit(
    unitId,
    reloadCount
  );

  const { userLoading, userDetail, ownedUnitId } = useGetUnitUser(
    unitId,
    reloadCount
  );

  const { transactionLoading, unitTransactionList } = useGetUnitTransactions(
    unitId,
    reloadCount
  );

  const triggerReload = () => {
    setReloadCount((prevKey) => prevKey + 1);
  };

  const [readOnly, setReadOnly] = useState(true);
  const [coverImage, setCoverImage] = useState(null);
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [newUnitName, setNewUnitName] = useState("");
  const [newNoOfRooms, setNewNoOfRooms] = useState("");
  const [newNoOfBathRooms, setNewNoOfBathRooms] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newPaymentPlan, setNewPaymentPlan] = useState("");
  const [updatingUnit, setUpdatingUnit] = useState(false);

  //FOR ASSIGN USER MODAL
  const [openAssignUserForm, setOpenAssignUserForm] = useState(false);
  const handleOpenAssignUserForm = () => {
    setOpenAssignUserForm(true);
  };
  const handleCloseAssignUserForm = () => {
    setOpenAssignUserForm(false);
  };

  //FOR ASSIGN ADMIN MODAL
  const [openAssignAdminForm, setOpenAssignAdminForm] = useState(false);
  const handleOpenAssignAdminForm = () => {
    setOpenAssignAdminForm(true);
  };
  const handleCloseAssignAdminForm = () => {
    setOpenAssignAdminForm(false);
  };

  //FOR UPATE PAYMENT MODAL
  const [openUpdatePaymentForm, setOpenUpdatePaymentForm] = useState(false);
  const handleOpenUpdatePaymentForm = () => {
    setOpenUpdatePaymentForm(true);
  };
  const handleCloseUpdatePaymentForm = () => {
    setOpenUpdatePaymentForm(false);
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

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (readOnly == true) {
        // console.log("readOnly", readOnly);
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
          setCoverImageUrl(response?.data?.url);
          toast.success("Image uploaded");
        })
        .catch((error) =>
          toast.error(error.response?.data?.message || "Image upload error")
        );
    },
    [readOnly]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const updateUnit = () => {
    setUpdatingUnit(true);
    const formdata = {
      name: newUnitName,
      numberOfRooms: parseInt(newNoOfRooms),
      numberOfBathRooms: parseInt(newNoOfBathRooms),
      price: parseInt(newPrice),
      paymentPlan: newPaymentPlan,
      image: coverImageUrl,
    };
    http
      .put(
        `${env.clinton_homes_base_url}/admin/unit/${unitId}/update-unit`,
        formdata
      )
      .then((response) => {
        toast.success("Unit Successfully Updated");
        setUpdatingUnit(false);
      })
      .catch((error) => {
        console.log(error);
        setUpdatingUnit(false);
        toast.error(error.response?.data?.message || "An Error Occured");
      });
  };

  //FOR TRANSACTION TABLE
  const columns = [
    {
      name: "",
      selector: (row, index) => index + 1,
      grow: 0.2,
    },
    {
      name: "Title",
      selector: (row) => row.txTitle,
      grow: 2,
    },
    {
      name: "Amount Paid",
      selector: (row) => formatNumber.formatCurrency(row.amount),
    },

    {
      name: "Date",
      selector: (row) => row.date,
      grow: 0.5,
    },
  ];

  useEffect(() => {
    if (!readOnly) {
      toast("Unit can now be edited!", {
        icon: "🖊️",
      });
      setCoverImageUrl(unitDetail[0]?.image);
      setNewUnitName(unitDetail[0]?.name);
      setNewNoOfRooms(unitDetail[0]?.numberOfRooms);
      setNewNoOfBathRooms(unitDetail[0]?.numberOfBathRooms);
      setNewPrice(unitDetail[0]?.price);
      setNewPaymentPlan(unitDetail[0]?.paymentPlan);
    }
  }, [readOnly]);

  return (
    <>
      <Modal
        modalOpenCondition={openAssignUserForm}
        headerPrimaryText="Add User"
        isFullWidth={true}
        maxWidth="sm"
        handleClose={handleCloseAssignUserForm}
      >
        <AssignUserForm
          unitId={unitId}
          triggerReload={triggerReload}
          handleClose={handleCloseAssignUserForm}
        />
      </Modal>

      <Modal
        modalOpenCondition={openUpdatePaymentForm}
        headerPrimaryText="Update Payment"
        isFullWidth={true}
        maxWidth="sm"
        handleClose={handleCloseUpdatePaymentForm}
      >
        <UpdatePaymentForm
          ownedUnitId={ownedUnitId}
          triggerReload={triggerReload}
          handleClose={handleCloseUpdatePaymentForm}
        />
      </Modal>

      <Modal
        modalOpenCondition={openAssignAdminForm}
        headerPrimaryText="Add Admin"
        isFullWidth={true}
        maxWidth="sm"
        handleClose={handleCloseAssignAdminForm}
      >
        <AssignAdminForm
          unitId={unitId}
          triggerReload={triggerReload}
          handleClose={handleCloseAssignAdminForm}
        />
      </Modal>
      <DashboardContainer>
        <Notification />
        <Sidebar />
        <MobileAdminNav />
        <DashboardMain>
          <div className="navbar">
            {" "}
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

              <h4>Unit Details</h4>
            </Title>
            {unitId && (
              <div
                onClick={() => setReadOnly(false)}
                style={{ cursor: "pointer" }}
              >
                <img src={editButton} alt="" />
              </div>
            )}
          </div>

          {/* UNIT DETAIL */}
          <FormContainer>
            <InputCommon
              placeholder={`Name: ${
                loading ? "fetching..." : unitDetail[0]?.name
              }`}
              marginBottom="24px"
              disabled={readOnly}
              value={newUnitName}
              onChange={(e) => setNewUnitName(e.target.value)}
            />
            <InputCommon
              placeholder={`Number of Rooms: ${
                loading ? "fetching..." : unitDetail[0]?.numberOfRooms
              }`}
              marginBottom="24px"
              disabled={readOnly}
              value={newNoOfRooms}
              onChange={(e) => setNewNoOfRooms(e.target.value)}
            />
            <InputCommon
              placeholder={`Number of Bathrooms: ${
                loading ? "fetching..." : unitDetail[0]?.numberOfBathRooms
              }`}
              marginBottom="24px"
              disabled={readOnly}
              value={newNoOfBathRooms}
              onChange={(e) => setNewNoOfBathRooms(e.target.value)}
            />

            <InputCommon
              placeholder={`Price: ${
                loading
                  ? "fetching..."
                  : formatNumber.formatCurrency(unitDetail[0]?.price)
              }`}
              marginBottom="24px"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
              disabled={readOnly}
            />

            <InputCommon
              placeholder={`Payment Plan: ${
                loading ? "fetching..." : unitDetail[0]?.paymentPlan
              }`}
              marginBottom="24px"
              value={newPaymentPlan}
              onChange={(e) => setNewPaymentPlan(e.target.value)}
              disabled={readOnly}
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
                  disabled={readOnly}
                />
              )}
            </div>
            <div style={{ textAlign: "end" }}>
              <ButtonCommon
                content={updatingUnit ? <img src={Spinner} /> : "Save"}
                backgroundColor="#F8F4F6"
                textColor="#721F4B"
                marginTop="16px"
                onClick={updateUnit}
                width="20%"
              />
            </div>
          </FormContainer>

          {/* USER DETAIL */}
          <FormContainer>
            <div className="form-header">
              <h4 style={{ marginBottom: "0px" }}>User</h4>

              {!userDetail[0] && (
                <ActionButton
                  text="Add User"
                  handleAction={handleOpenAssignUserForm}
                />
              )}
            </div>

            {userDetail.length < 1 ? (
              <>
                {userLoading ? (
                  <h3 style={{ textAlign: "center", color: "#ededed" }}>
                    No user assigned
                  </h3>
                ) : (
                  <h3 style={{ textAlign: "center", color: "#ededed" }}>
                    No user assigned
                  </h3>
                )}
              </>
            ) : (
              <>
                <InputCommon
                  placeholder={`Name: ${
                    loading
                      ? "fetching..."
                      : `${userDetail[0].ownerId.firstName} ${userDetail[0].ownerId.lastName}`
                  }`}
                  marginBottom="24px"
                  disabled={readOnly}
                />
                <InputCommon
                  placeholder={`Email: ${
                    loading ? "fetching..." : userDetail[0].ownerId.email
                  }`}
                  marginBottom="24px"
                  disabled={readOnly}
                />
                {userDetail[0].phoneNumber && (
                  <InputCommon
                    placeholder={`Phone Number: ${
                      loading ? "fetching..." : userDetail[0].phoneNumer
                    }`}
                    marginBottom="24px"
                    disabled={readOnly}
                  />
                )}

                <InputCommon
                  placeholder={`Price Paid: ${
                    loading
                      ? "fetching..."
                      : formatNumber.formatCurrency(userDetail[0].pricePaid)
                  }`}
                  marginBottom="24px"
                  disabled={readOnly}
                />

                <InputCommonWithIcon
                  placeholder={`New Price Paid: ${
                    loading
                      ? "fetching..."
                      : formatNumber.formatCurrency(userDetail[0].recentPayment)
                  }`}
                  marginBottom="24px"
                  disabled={readOnly}
                  icon={updateButton}
                  onClickIcon={handleOpenUpdatePaymentForm}
                />
              </>
            )}
          </FormContainer>

          {/* {userLoading ? (
            <FormContainer>
              <h3 style={{ textAlign: "center", color: "#ededed" }}>
                Fetching user details...
              </h3>
            </FormContainer>
          ) : } */}

          {/* ADMIN */}
          <FormContainer>
            <div className="form-header">
              <h4 style={{ marginBottom: "0px" }}>Admin</h4>

              {!unitDetail[0]?.projectManager && (
                <ActionButton
                  text="Add Admin"
                  handleAction={handleOpenAssignAdminForm}
                />
              )}
            </div>

            {unitDetail[0]?.projectManager ? (
              <>
                <InputCommon
                  placeholder={`Name: ${
                    loading
                      ? "fetching..."
                      : `${unitDetail[0]?.projectManager.firstName} ${unitDetail[0]?.projectManager.lastName}`
                  }`}
                  marginBottom="24px"
                  disabled={readOnly}
                />
                <InputCommon
                  placeholder={`Email: ${
                    loading
                      ? "fetching..."
                      : `${unitDetail[0]?.projectManager.email}`
                  }`}
                  marginBottom="24px"
                  disabled={readOnly}
                />
                {unitDetail[0]?.projectManager.email && (
                  <InputCommon
                    placeholder={`Phone: ${
                      loading
                        ? "fetching..."
                        : `${unitDetail[0]?.projectManager.phoneNumber}`
                    }`}
                    marginBottom="24px"
                    disabled={readOnly}
                  />
                )}
              </>
            ) : (
              <h3 style={{ textAlign: "center", color: "#ededed" }}>
                {loading ? "Fetching Admin Details" : "No Admin assigned"}
              </h3>
            )}
          </FormContainer>

          {/* TRANSACTIONS */}
          <FormContainer>
            <SectionHeader>
              <h4 style={{ marginBottom: "0px" }}>Unit Transactions</h4>
            </SectionHeader>
            <TableContainer>
              {" "}
              <DataTable
                data={unitTransactionList}
                columns={columns}
                customStyles={dashboardTableSyles}
                noDataComponent={
                  <h3 style={{ textAlign: "center", color: "#e8e8e8" }}>
                    No transactions found
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
              <UnitTransactionsTable list={unitTransactionList} />
            )}
          </FormContainer>

          {/* IMAGES AND VIDEO */}
          <UnitGallery unitId={unitId} fileType="floor-plan" />
          <UnitGallery unitId={unitId} fileType="unit-video" />
        </DashboardMain>
      </DashboardContainer>
    </>
  );
};

export default AdminUnitDetails;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
