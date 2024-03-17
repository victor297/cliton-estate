import React from "react";

import { DashboardContainer } from "./AdminDashboardStyles";
import Sidebar from "../../../components/dashboard/Sidebar";
import MobileAdminNav from "../../../components/navbar/MobileAdminNav";
import { DashboardMain } from "./AdminDashboardStyles";
import Messages from "../../userPages/Messages";

const AdminMessage = () => {
  return (
    <>
      <DashboardContainer>
        <Sidebar />
        <MobileAdminNav />

        <Messages />
      </DashboardContainer>
    </>
  );
};

export default AdminMessage;
