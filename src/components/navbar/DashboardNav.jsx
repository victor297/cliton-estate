import React, { useState } from "react";
import styled from "styled-components";
import Logo from "../../assets/common/clinton_logo_original.svg";
import debitCard from "../../assets/dashboard/debit-card-icon.svg";
import messageIcon from "../../assets/dashboard/message-icon.svg";
import houseIcon from "../../assets/dashboard/house-icon.svg";
import { useNavigate, useLocation, Link } from "react-router-dom";
import env from "../../env";
import { toast } from "react-hot-toast";
import Notification from "../Notification";

const DashboardNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const user = env?.getUser();
  const selectActiveMenu = (option) => {
    navigate(`/${option}`);
  };

  const handleLogout = () => {
    env.logOut();
    navigate("/sign-in");
  };
  const handlePayBill = () => {
    toast.success(
      "go to My Properties click on a Property, click Pay Electricity Bill",
      { duration: 10000 }
    );
  };
  return (
    <>
      <Nav>
        <Notification />
        <div
          onClick={() => selectActiveMenu("user-dashboard")}
          style={{ cursor: "pointer" }}
          className="logo-wrapper"
        >
          <img src={Logo} alt="" />
        </div>

        <div className="dashboard-menu-tray">
          <div className="menu-list">
            <div
              className="menu-item"
              onClick={() => selectActiveMenu("projects")}
            >
              <img src={houseIcon} alt="" />
              {location.pathname === "/projects" && (
                <MenuItemSelected></MenuItemSelected>
              )}
            </div>
            <MenuItemWrapper onClick={handlePayBill}>
              <img src={debitCard} alt="" />
              <HoverText>Pay electricity bill</HoverText>
              {location.pathname === "/pay-electricity-bill" && (
                <MenuItemSelected></MenuItemSelected>
              )}
            </MenuItemWrapper>
            <div
              className="menu-item last"
              onClick={() => selectActiveMenu("messages")}
            >
              <img src={messageIcon} alt="" />
              {location.pathname === "/messages" && (
                <MenuItemSelected></MenuItemSelected>
              )}
            </div>
          </div>

          <div className="logout">
            <p>{`${user?.firstName} ${user?.lastName}`}</p>
            <h4 style={{ cursor: "pointer" }} onClick={handleLogout}>
              (Logout)
            </h4>
          </div>
        </div>
      </Nav>
    </>
  );
};

export default DashboardNav;

const Nav = styled.nav`
  background: #fff;
  box-shadow: 0px 4px 6px -2px #f1f2f4, 0px 12px 16px -4px #f1f2f4;
  padding: 20px 32px;
  display: flex;
  gap: 6px;
  justify-content: space-between;
  align-items: center;
  position: relative;
  margin-bottom: 64px;

  .logo-wrapper {
    img {
      width: 130px;
    }
  }

  .dashboard-menu-tray {
    display: flex;
    align-items: center;
    gap: 32px;

    .menu-list {
      border-right: 1px solid #e2e4ed;
      display: flex;
      gap: 24px;
      cursor: pointer;

      .last {
        margin-right: 32px;
      }
    }

    .logout {
      display: flex;
      gap: 8px;

      a {
        color: #721f4b;
        font-weight: 700;
      }
    }

    p {
      color: #192861;
      font-size: 12px;
      font-weight: 500;
      line-height: 24px; /* 200% */
      letter-spacing: 0.012px;
    }
  }

  @media only screen and (max-width: 768px) {
    padding: 10px;
    margin-bottom: 20px;

    .logo-wrapper {
      img {
        width: 70px;
      }
    }

    .dashboard-menu-tray {
      gap: 12px;
      .menu-list {
        gap: 12px;

        .last {
          margin-right: 4px;
        }
      }

      .logout {
        a {
        }
      }

      p {
        @media only screen and (max-width: 768px) {
          display: none;
        }
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
const MenuItemWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const HoverText = styled.span`
  visibility: hidden;
  width: 200px;
  background-color: #333;
  color: #fff;
  text-align: center;
  border-radius: 5px;
  padding: 5px;
  position: absolute;
  z-index: 1;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: opacity 0.3s ease, visibility 0.3s ease;

  ${MenuItemWrapper}:hover & {
    visibility: visible;
    opacity: 1;
  }
`;
