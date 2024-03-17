import React from "react";
import styled from "styled-components";
import Logo from "../../assets/common/clinton_logo_original.svg";

import { useNavigate } from "react-router-dom";

const WebsiteNav = ({ activePage }) => {
  const navigate = useNavigate();

  const goToPage = (page) => {
    navigate(page);
  };

  return (
    <>
      <Nav>
        <div
          onClick={() => goToPage("/")}
          style={{ cursor: "pointer" }}
          className="logo-wrapper"
        >
          <img src={Logo} alt="" />
        </div>

        <div className="menu-list">
          <div
            className={`menu-item ${activePage === "about-us" && "active"}`}
            onClick={() => goToPage("/about-us")}
          >
            About us
          </div>
          <div
            className={`menu-item ${activePage === "gallery" && "active"}`}
            onClick={() => goToPage("/gallery")}
          >
            Gallery
          </div>
          <div
            className={`menu-item ${activePage === "offers" && "active"}`}
            onClick={() => goToPage("/offers")}
          >
            Offers
          </div>
        </div>

        <div className="suscribers" onClick={() => goToPage("/sign-in")}>
          <p>For suscribers</p>
        </div>
      </Nav>
    </>
  );
};

export default WebsiteNav;

const Nav = styled.nav`
  background: #fff;
  /* box-shadow: 0px 4px 6px -2px #f1f2f4, 0px 12px 16px -4px #f1f2f4; */
  /* padding: 20px 32px; */
  height: 100px;
  display: flex;
  gap: 6px;
  justify-content: space-between;
  padding: 0px 112px;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;

  .logo-wrapper {
    img {
      width: 130px;
    }
  }

  .menu-list {
    height: 100%;
    display: flex;
    /* align-items: center; */
    gap: 24px;
    cursor: pointer;
    list-style-type: none;

    .menu-item {
      color: #192861;
      font-weight: 400;
      font-size: 14px;
      height: 100%;
      margin: auto;
      line-height: 24px; /* 200% */
      letter-spacing: 0.012px;
      display: flex;
      align-items: center;
    }

    .active {
      border-bottom: 1px solid black;
    }
  }

  .suscribers {
    cursor: pointer;
    padding: 12px;
    border: 2px solid #721f4b;
    padding: 12px 30px;
    border-radius: 50px;

    p {
      font-weight: 500;
      font-size: 16px;
      letter-spacing: 0.001em;

      color: #721f4b;
    }
  }

  @media only screen and (max-width: 768px) {
    padding: 10px 12px;
    .logo-wrapper {
      img {
        width: 70px;
      }
    }

    .menu-list {
      gap: 12px;
      cursor: pointer;

      .menu-item {
      }

      p {
        color: #192861;
        font-size: 10px;
        font-weight: 500;
        line-height: 24px; /* 200% */
        letter-spacing: 0.012px;
      }
    }

    .suscribers {
      cursor: pointer;
      padding: 12px;
      border: 2px solid #721f4b;
      padding: 12px 16px;
      border-radius: 50px;

      p {
        font-size: 10px;
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
