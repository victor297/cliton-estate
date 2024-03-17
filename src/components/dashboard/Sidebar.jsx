import React from "react";
import styled from "styled-components";
import logo from "../../assets/common/clinton_logo.svg";
import userIcon from "../../assets/dashboard/user-multiple.svg";
import projectsIcon from "../../assets/dashboard/house-01.svg";
import messageIcon from "../../assets/dashboard/bubble-chat.png";
import logout_button from "../../assets/dashboard/logout.svg";
import { useLocation, useNavigate } from "react-router-dom";
import env from "../../env";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const handleLogout = () => {
    env.logOut();
    navigate("/sign-in");
  };
  return (
    <SidebarStyle>
      <div className="sidebar-container">
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <div
          style={{
            height: "70vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <ul>
            <li
              className={`${
                (location.pathname === "/admin-dashboard" ||
                  location.pathname === "/admin-dashboard/user") &&
                "active"
              }`}
              onClick={() => navigate("/admin-dashboard")}
            >
              <img src={userIcon} alt="" style={{ marginRight: "10px" }} />
              User
            </li>
            <li
              className={`${
                (location.pathname.includes("/admin-dashboard/projects") ||
                  location.pathname.includes("/admin-dashboard/units")) &&
                "active"
              }`}
              onClick={() => navigate("/admin-dashboard/projects")}
            >
              <img src={projectsIcon} alt="" style={{ marginRight: "10px" }} />
              Projects
            </li>
            <li
              className={`${
                location.pathname === "/admin-dashboard/messages" && "active"
              }`}
              onClick={() => navigate("/admin-dashboard/messages")}
            >
              <img src={messageIcon} alt="" style={{ marginRight: "10px" }} />
              Messages
            </li>
          </ul>

          {/* <div className="log-out" onClick={() => navigate("/")}> */}
          <div className="log-out" onClick={handleLogout}>
            <img src={logout_button} alt="" />
          </div>
        </div>
      </div>
    </SidebarStyle>
  );
};

export default Sidebar;

const SidebarStyle = styled.div`
  min-height: 100vh;
  background-color: #f8f4f6;
  padding-left: 30px;

  @media only screen and (max-width: 768px) {
    display: none;
  }

  .sidebar-container {
    position: fixed;
    overflow: auto;
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    .logo {
      margin: 42px 0px 48px 0px;
    }

    li {
      margin-bottom: 30px;
      width: 200px;
      list-style: none;
      color: #6976a1;
      font-size: 18px;
      font-weight: 500;
      letter-spacing: 0.018px;
      border-radius: 20px;
      display: flex;
      align-items: center;
      padding: 12px 0px 12px 32px;
      cursor: pointer;
    }

    li:hover {
      background-color: #fff;
    }

    .log-out {
      cursor: pointer;
    }
  }

  .active {
    background-color: #fff;
  }
`;
