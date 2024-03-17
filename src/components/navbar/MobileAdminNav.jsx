import React, { useState } from "react";
import styled from "styled-components";
import Logo from "../../assets/common/clinton_logo_original.svg";
import userIcon from "../../assets/dashboard/user-multiple.svg";
import projectsIcon from "../../assets/dashboard/house-01.svg";
import messageIcon from "../../assets/dashboard/bubble-chat.png";

import houseIcon from "../../assets/dashboard/house-icon.svg";
import { useNavigate, useLocation } from "react-router-dom";
import env from "../../env";

const MobileAdminNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const selectActiveMenu = (option) => {
    navigate(`/${option}`);
  };
  const handleLogout = () => {
    env.logOut();
    navigate("/sign-in");
  };
  return (
    <>
      <Nav>
        <div
          onClick={() => selectActiveMenu("user-dashboard")}
          style={{ cursor: "pointer" }}
        >
          <img src={Logo} alt="" style={{ width: "130px" }} />
        </div>

        <div className="dashboard-menu-tray">
          <div className="menu-list">
            <div
              className={`menu-item ${
                location.pathname === "/admin-dashboard" && "active"
              }`}
              onClick={() => selectActiveMenu("admin-dashboard")}
            >
              <img src={userIcon} alt="" />
            </div>
            <div
              className={`menu-item ${
                location.pathname.includes("projects") && "active"
              }`}
              onClick={() => selectActiveMenu("admin-dashboard/projects")}
            >
              <img src={projectsIcon} alt="" />
              {/* {location.pathname === "/projects" && (
                <MenuItemSelected></MenuItemSelected>
              )} */}
            </div>
            <div
              className={`menu-item ${
                location.pathname.includes("messages") && "active"
              }`}
              onClick={() => selectActiveMenu("admin-dashboard/messages")}
            >
              <img src={messageIcon} alt="" />
              {/* {location.pathname === "/projects" && (
                <MenuItemSelected></MenuItemSelected>
              )} */}
            </div>
            <div className="logout">
              <h4 style={{ cursor: "pointer" }} onClick={handleLogout}>
                (Logout)
              </h4>
            </div>
          </div>
        </div>
      </Nav>
    </>
  );
};

export default MobileAdminNav;

const Nav = styled.nav`
  display: none;

  @media only screen and (max-width: 768px) {
    display: flex;
    background-color: #f8f4f6;
    padding: 20px 32px;
    justify-content: space-between;
    align-items: center;
    position: relative;
    /* margin-bottom: 64px; */
  }

  .dashboard-menu-tray {
    display: flex;
    align-items: center;
    gap: 32px;

    .menu-list {
      display: flex;
      gap: 40px;
      align-items: center;

      .active {
        padding: 8px 16px;
        background-color: #fff;
        border-radius: 20px;
        align-self: center;
      }
    }

    p {
      color: #192861;
      font-size: 12px;
      font-weight: 500;
      line-height: 24px; /* 200% */
      letter-spacing: 0.012px;
    }

    .logout {
      a {
        color: #721f4b;
        font-weight: 700;
      }
    }
  }
`;

const MenuItemSelected = styled.div`
  border-bottom: 3px solid #721f4b;
  width: 45px;
  position: absolute;
  bottom: 0;
  margin-left: 8px;
`;
