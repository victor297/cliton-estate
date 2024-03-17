import { useState } from "react";

import styled from "styled-components";
import DataTable from "react-data-table-component";
import Sidebar from "../../../components/dashboard/Sidebar";
import MobileAdminNav from "../../../components/navbar/MobileAdminNav";
import Modal from "../../../components/dashboard/Modal";
import useGetAllUsers from "../../../app/services/users/useGetAllUsers";
import AddUserForm from "../../../components/dashboard/modals/AddUserForm";
import EditUserForm from "../../../components/dashboard/modals/EditUserForm";
import { DashboardContainer } from "./AdminDashboardStyles";
import { dashboardTableSyles } from "../../../utils/styles/tableStyles";
import editButton from "../../../assets/dashboard/EditButton.svg";
import ActionButton from "../../../components/button/ActionButton";
import TableMobile from "../../../components/dashboard/TableMobile";
import ToggleUserType from "../../../components/dashboard/ToggleUserType";
import moment from "moment";

const Dashboard = () => {
  const [openAddUserForm, setOpenAddUserForm] = useState(false);
  const [openEditUserForm, setOpenEditUserForm] = useState(false);

  const [userId, setUserId] = useState("");
  const [user, setUser] = useState(null);

  const [showUserOption, setShowUserOption] = useState(false);
  const [userType, setUserType] = useState("user");
  const toggleUser = () =>
    showUserOption ? setShowUserOption(false) : setShowUserOption(true);

  const [reloadCount, setReloadCount] = useState(0);
  const reloadData = () => {
    setReloadCount((prevKey) => prevKey + 1);
  };

  const { userList, loading } = useGetAllUsers(userType, reloadCount);
  console.log("userList", userList);
  const handleSelectUser = (userType) => {
    if (userType === "user") {
      setUserType("user");
    }
    if (userType === "admin") {
      setUserType("admin");
    }
    reloadData();
    setShowUserOption(false);
  };
  const handleOpenAddUserForm = () => {
    setOpenAddUserForm(true);
  };
  const handleCloseAddUserForm = () => {
    setOpenAddUserForm(false);
  };
  const handleOpenEditUserForm = () => {
    setOpenEditUserForm(true);
  };
  const handleCloseEditUserForm = () => {
    setOpenEditUserForm(false);
  };

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id.substring(0, 5),
      grow: 0.2,
    },
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },

    // {
    //   name: "Assigned Property",
    //   selector: (row) => "Placeholder Estate",
    // },
    {
      name: "Created",
      selector: (row) => moment(row.created).format("DD/MM/YYYY"),
    },

    {
      name: "",
      cell: (row) => (
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            setUserId(row.id);
            setUser(row);
            handleOpenEditUserForm();
          }}
        >
          <img src={editButton} alt="edit" />
        </div>
      ),
      grow: 0.5,
    },
  ];

  return (
    <>
      <Modal
        modalOpenCondition={openAddUserForm}
        headerPrimaryText="Add User"
        isFullWidth={true}
        maxWidth="sm"
        handleClose={handleCloseAddUserForm}
      >
        <AddUserForm triggerReload={() => reloadData()} />
      </Modal>
      <Modal
        modalOpenCondition={openEditUserForm}
        headerPrimaryText="Edit User"
        isFullWidth={true}
        maxWidth="sm"
        handleClose={handleCloseEditUserForm}
      >
        <EditUserForm
          userId={userId}
          user={user}
          triggerReload={() => reloadData()}
          handleClose={handleCloseEditUserForm}
        />
      </Modal>
      <DashboardContainer>
        <Sidebar />
        <MobileAdminNav />
        <DashboardMain>
          <div className="navbar">
            <ToggleUserType
              showUserOption={showUserOption}
              toggleUser={toggleUser}
              userType={userType}
              handleSelectUser={handleSelectUser}
            />
            <ActionButton
              text="Add New User"
              handleAction={handleOpenAddUserForm}
            />
          </div>
          <TableContainer>
            <DataTable
              data={userList}
              columns={columns}
              customStyles={dashboardTableSyles}
              noDataComponent={<h4>No users available</h4>}
              progressPending={loading}
            />
          </TableContainer>
          {loading ? null : <TableMobile list={userList} />}
        </DashboardMain>
      </DashboardContainer>
    </>
  );
};

export default Dashboard;

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
  }
`;

const TableContainer = styled.div`
  margin: 24px;
  padding: 24px;

  @media only screen and (max-width: 768px) {
    display: none;
  }
`;
