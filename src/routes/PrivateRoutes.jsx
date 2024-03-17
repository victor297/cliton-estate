import React from "react";
import { useEffect } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDashboard from "../pages/adminPages/dashboard/AdminDashboard";
import UserDashboard from "../pages/userPages/UserDashboard";
import AdminProjectDetail from "../pages/adminPages/dashboard/AdminProjectDetail";
import UnitDetail from "../pages/userPages/UnitDetail";
import ProjectDetail from "../pages/userPages/ProjectDetail";
import Projects from "../pages/userPages/Projects";
import AddProjects from "../pages/adminPages/dashboard/AddProjects";
import AddUnits from "../pages/adminPages/dashboard/AddUnits";
import AdminProjects from "../pages/adminPages/dashboard/AdminProjects";
import AdminUnitDetails from "../pages/adminPages/dashboard/AdminUnitDetails";
import Messages from "../pages/userPages/Messages";
import AdminMessage from "../pages/adminPages/dashboard/AdminMessage";
import ElectricityBill from "../pages/userPages/ElectricityBill";
import { useNavigate } from "react-router-dom";

const PrivateRoutes = () => {
  const navigate = useNavigate();
  //Log user out if token doesn't exist
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/sign-in");
    }
  }, []);
  return (
    <Routes>
      {/* private routes routes */}

      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/admin-dashboard/projects" element={<AdminProjects />} />
      <Route
        path="/admin-dashboard/projects/:projectId"
        element={<AdminProjectDetail />}
      />
      <Route path="/admin-dashboard/messages" element={<AdminMessage />} />
      <Route
        path="/admin-dashboard/units/:unitId"
        element={<AdminUnitDetails />}
      />
      <Route
        path="/admin-dashboard/projects/create"
        element={<AddProjects />}
      />
      <Route
        path="/admin-dashboard/projects/:projectId/add-units"
        element={<AddUnits />}
      />
      <Route path="/user-dashboard" element={<UserDashboard />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/projects/:projectId" element={<ProjectDetail />} />
      <Route path="/projects/units/:unitId" element={<UnitDetail />} />
      <Route path="/projects/owned-units/:unitId" element={<UnitDetail />} />
      <Route path="/messages" element={<Messages />} />
      <Route path="/pay-electricity-bill" element={<ElectricityBill />} />
    </Routes>
  );
};

export default PrivateRoutes;
