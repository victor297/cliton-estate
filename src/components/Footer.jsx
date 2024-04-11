import React from "react";
import styled from "styled-components";
import Logo from "../assets/common/clinton_logo_original.svg";
import top_icon from "../assets/home/top_icon.svg";
import instagram_icon from "../assets/home/instagram_icon.svg";
import facbook_icon from "../assets/home/facebook_icon.svg";
import linkedin_icon from "../assets/home/linkedin_icon.svg";
import twitter_icon from "../assets/home/twitter_icon.svg";
import Background from "./websiste/Background";

import { Link, useNavigate } from "react-router-dom";
import { WhatsApp } from "@mui/icons-material";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <FooterStyle>
      <Background />
      <div className="layer-1">
        <div className="logo">
          <img src={Logo} alt="" />
        </div>
        <div className="top" onClick={() => window.scrollTo(0, 0)}>
          <p>Top</p>
          <img src={top_icon} alt="" />
        </div>
      </div>
      <div className="layer-2">
        <div className="vision ">
          {/* <h5 className="footer-subtitle">The vision</h5> */}
          <p className="footer-text">
            <b>Address:</b> Westlink clinton's court, 8, Palm groove close,
            Iyaganku GRA Ibadan, Oyo.
          </p>
          <p className="footer-text">
            <b>Mobile:</b> +234 813 487 7860
          </p>
          <p className="footer-text">
            <b>Mail:</b> info@clintonsdevelopers.com
          </p>
          <p className="footer-text">
            <WhatsApp color="green" fontSize="45" />
            <Link to={"https://wa.me/+2348134877860"}> Chat Us </Link>
          </p>
        </div>
        <div className="about">
          <h5 className="footer-subtitle" onClick={() => navigate("/about-us")}>
            About
          </h5>
          <p className="footer-text" onClick={() => navigate("/about-us")}>
            Who we are
          </p>
          {/* <p className="footer-text">Privacy policy</p>
          <p className="footer-text">Terms of use</p> */}
        </div>
        <div className="gallery">
          <h5 className="footer-subtitle" onClick={() => navigate("/gallery")}>
            Gallery
          </h5>
          <p className="footer-text" onClick={() => navigate("/offers")}>
            Project View
          </p>
          {/* <p className="footer-text">Unit View</p> */}
        </div>
        <div className="offers">
          <h5 className="footer-subtitle" onClick={() => navigate("/offers")}>
            Offers
          </h5>
          <p className="footer-text" onClick={() => navigate("/offers")}>
            All Projects
          </p>
          <p className="footer-text" onClick={() => navigate("/offers")}>
            Ongoing Projects
          </p>
          <p className="footer-text" onClick={() => navigate("/offers")}>
            Completed Projects
          </p>
        </div>
      </div>
      <div className="layer-3">
        <p>Clinton’s Developers Limited &copy; 2024. All Rights Reserved.</p>

        <div className="socials">
          <Link className="social-link" to="https://www.instagram.com">
            <img src={instagram_icon} alt="" />
          </Link>
          <Link className="social-link" to="https://www.twitter.com">
            <img src={twitter_icon} alt="" />
          </Link>
          <Link className="social-link" to="https://www.facebook.com">
            <img src={facbook_icon} alt="" />
          </Link>
          <Link className="social-link" to="https://www.linkedin.com">
            <img src={linkedin_icon} alt="" />
          </Link>
        </div>
      </div>
    </FooterStyle>
  );
};

export default Footer;

const FooterStyle = styled.footer`
  background-color: aliceblue;
  background: url("src/assets/home/banner_home.png") no-repeat;
  padding: 90px 112px 48px;
  position: relative;

  .layer-1 {
    display: flex;
    gap: 10px;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 56px;
    .logo {
      img {
        width: 130px;
      }
    }

    .top {
      display: flex;
      align-items: center;
      gap: 10px;
      p {
        font-weight: 400;
        font-size: 18px;
        letter-spacing: 0.001em;
        color: #192861;
      }
    }
  }

  .layer-2 {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 30px;
    padding-bottom: 56px;
    margin-bottom: 35px;
    border-bottom: 1px solid #e2e4ed;
    .vision {
      .footer-text {
        margin-bottom: 24px;
      }
    }

    .about,
    .gallery,
    .offers {
      p {
        margin-bottom: 24px;
      }
    }

    .footer-subtitle {
      font-weight: 500;
      font-size: 16px;
      letter-spacing: 0.001em;
      color: #192861;
      margin-bottom: 24px;
      cursor: pointer;
    }
    .footer-text {
      font-weight: 400;
      cursor: pointer;
      line-height: 19px;
      letter-spacing: 0.001em;
      color: #192861;
    }
  }

  //Breakpoint
  @media only screen and (max-width: 768px) {
    padding: 20px;
    .layer-1 {
      .logo {
        img {
          width: 130px;
        }
      }
    }

    .layer-2 {
      gap: 10px;
      .vision {
        .footer-text {
        }
      }

      .about,
      .gallery,
      .offers {
        p {
        }
      }

      .footer-subtitle {
        font-size: 14px;
      }
      .footer-text {
        font-size: 12px;
      }
    }
  }

  .layer-3 {
    display: flex;
    justify-content: space-between;
    align-items: center;

    p {
      font-weight: 400;
      font-size: 12px;
      line-height: 24px;
      letter-spacing: 0.001em;
    }

    .socials {
      display: flex;
      gap: 15px;

      .social-link {
        cursor: pointer;
      }
    }
  }
`;
