import React, { useEffect } from "react";

import env from "../../env";
import WebsiteNav from "../../components/navbar/WebsiteNav";
import QnA from "../../components/websiste/QnA";
import Footer from "../../components/Footer";
import styled from "styled-components";
import ButtonWebsite from "../../components/websiste/ButtonWebsite";
import GallerySection from "../../components/websiste/GallerySection";
import pic from "../../assets/home/stock_img_1.png";
import Background from "../../components/websiste/Background";

import project_card from "../../assets/home/projec_card.svg";

const Home = () => {
  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <HomeStyle>
      <WebsiteNav activePage="home" />
      <div className="home-header">
        <Background />
        <div className="home-header-copy">
          <h3>
            Building Dreams into Reality - Explore Our World-Class Properties
          </h3>
          <p className="home-p">
            At Clinton’s Developers Ltd, we don't just build structures, we
            craft environments that enhance lifestyles. Discover how we make
            your property dreams come true.
          </p>
          <ButtonWebsite text="View our projects" path="/offers" />
        </div>

        <div className="success-stats">
          <div className="success-stats-details">
            <h3>100</h3>
            <p>
              Properties <br /> Sold
            </p>
          </div>
          <div className="success-stats-details">
            <h3>100</h3>
            <p>
              Happy <br /> Customers
            </p>
          </div>
          <div className="success-stats-details">
            <h3>100</h3>
            <p>
              Total <br /> Projects
            </p>
          </div>
        </div>
      </div>

      <div className="what-you-should-know">
        <div className="what-you-should-know-text">
          <h3>What You Should Know About Us</h3>
          <div className="text">
            {" "}
            <p>
              Clinton’s Developers Ltd has been at the forefront of innovative
              property development. With a focus on quality, sustainability, and
              customer satisfaction, we've transformed skylines and lives.
            </p>
            <ul>
              <li>
                {" "}
                Mission: To develop properties that blend extraordinary design
                with sustainability and community wellbeing.
              </li>
              <li>
                {" "}
                Vision: To be the leading property developer recognized for
                transforming spaces into vibrant, sustainable communities.
              </li>
            </ul>
          </div>

          <ButtonWebsite text="Learn more" path="/about-us" />
        </div>
        <div className="what-you-should-know-img">
          <img src={pic} alt="" />
        </div>
      </div>
      <GallerySection />
      <div className="ongoing-projects">
        <div className="ongoing-projects-container">
          <div className="ongoing-projects-text">
            <h3>Ongoing Projects - Explore Our Projects In Details</h3>
            <p className="ongoing-projects-text-p">
              Our portfolio includes a range of ongoing and completed projects,
              each embodying our dedication to design and quality. Browse
              through our meticulously designed residential and commercial
              spaces, we have something that aligns with your choice.
            </p>

            <ButtonWebsite text="View offers" path="/offers" />
          </div>
          <div className="ongoing-projects-image">
            <img src={project_card} alt="project_image" />
          </div>
        </div>
      </div>
      <QnA />
      <Footer />
    </HomeStyle>
  );
};

export default Home;

const HomeStyle = styled.div`
  width: 100%;
  .home-header {
    position: relative;
    margin-bottom: 204px;

    .success-stats {
      background-color: white;
      position: absolute;
      left: 50%;
      transform: translate(-50%, 50%);
      bottom: 0;
      display: flex;
      justify-content: center;
      gap: 80px;
      padding: 30px;
      box-shadow: 0px -10px 50px 4px rgba(0, 0, 0, 0.03),
        1px -4px 50px 4px rgba(16, 24, 40, 0.01),
        0px 20px 50px -4px rgba(16, 24, 40, 0.03),
        0px 8px 50px -4px rgba(16, 24, 40, 0.01);
      border-radius: 20px;

      h3 {
        font-weight: 400;
        font-size: 40px;
        letter-spacing: 0.001em;
        color: #192861;
      }

      p {
        font-weight: 400;
        font-size: 16px;
        letter-spacing: 0.001em;
      }
      .success-stats-details {
        display: flex;
        gap: 10px;
        align-items: center;
      }
    }
    .home-header-copy {
      width: 60%;
      margin: 0px auto;
      padding-top: 120px;
      padding-bottom: 190px;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      h3 {
        font-weight: 500;
        font-size: 48px;
        letter-spacing: 0.001em;
        color: #192861;
        margin-bottom: 42px;
      }

      .home-p {
        font-weight: 400;
        font-size: 20px;
        letter-spacing: 0.001em;
        line-height: 40px;
        width: 60%;
        margin: 0px auto;
        margin-bottom: 90px;
        color: #192861;
      }
    }
  }

  .what-you-should-know {
    padding: 90px 112px;
    /* display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 66px; */
    display: flex;
    gap: 67px;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    margin-bottom: 140px;

    .what-you-should-know-text {
      width: 50%;
      h3 {
        font-weight: 500;
        font-size: 48px;
        letter-spacing: 0.001em;
        color: #192861;
        margin-bottom: 42px;
      }
      .text {
        font-weight: 400;
        font-size: 20px;
        letter-spacing: 0.001em;
        margin-bottom: 56px;
        line-height: 40px;
        color: #192861;

        ul {
          margin-left: 35px;
        }
      }
    }
    .what-you-should-know-img {
      width: 50%;

      img {
        width: 100%;
        object-fit: cover;
      }
    }
  }

  .ongoing-projects {
    position: relative;

    z-index: 1;
    /* margin: 90px 112px; */
    margin-top: 90px;
    padding-bottom: 90px;
    /* padding-left: 112px;
    padding-right: 112px; */

    .ongoing-projects-container {
      display: flex;
      justify-content: space-between;
      gap: 67px;
      width: 100%;
    }

    .ongoing-projects-text {
      display: flex;
      flex-direction: column;
      height: 100%;
      line-height: 40px;
      padding-left: 112px;
      width: 50%;

      h3 {
        font-weight: 500;
        font-size: 48px;
        letter-spacing: 0.001em;
        color: #192861;
        margin-bottom: 42px;
        line-height: 60px;
      }
      .ongoing-projects-text-p {
        font-weight: 400;
        font-size: 20px;
        letter-spacing: 0.001em;
        margin-bottom: 56px;
        color: #192861;
      }
    }

    .ongoing-projects-image {
      display: flex;
      justify-content: center;
      width: 50%;
      height: 100%;
      padding-right: 112px;
      /* display: none; */
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }

  @media only screen and (max-width: 1100px) {
    .home-header {
      .success-stats {
        gap: 30px;
        padding: 30px;
        width: 100%;
        h3 {
          font-weight: 400;
          font-size: 20px;
          letter-spacing: 0.001em;
          color: #192861;
        }

        p {
          font-size: 12px;
        }
        .success-stats-details {
          display: flex;
          gap: 10px;
          align-items: center;
        }
      }
      .home-header-copy {
        width: 90%;
        margin: 0px auto;

        h3 {
          font-size: 30px;
        }

        .home-p {
          font-size: 16px;
          width: 90%;
        }
      }
    }

    .what-you-should-know {
      padding: 20px;
      flex-wrap: wrap;

      img {
        display: none;
      }

      .what-you-should-know-text {
        width: 100%;
        h3 {
          font-size: 30px;
          letter-spacing: 0.001em;
          color: #192861;
          margin-bottom: 42px;
          text-align: center;
        }
        .text {
          font-weight: 400;
          font-size: 16px;

          ul {
            margin-left: 15px;
          }
        }
      }
      .what-you-should-know-img {
        width: 100%;
      }
    }

    .ongoing-projects {
      margin-top: 20px;
      margin-bottom: 20px;
      padding-left: 20px;
      padding-right: 20px;
      .ongoing-projects-container {
        flex-wrap: wrap;
        justify-content: center;
        .ongoing-projects-text {
          justify-content: center;
          align-items: center;
          text-align: center;
          width: 100%;
          padding: 20px;

          h3 {
            font-size: 30px;
            letter-spacing: 0.001em;
            color: #192861;
            margin-bottom: 42px;
          }
          .ongoing-projects-text-p {
            font-weight: 400;
            font-size: 16px;
            letter-spacing: 0.001em;
            margin-bottom: 56px;
          }
        }

        .ongoing-projects-image {
          padding: 20px;
          width: 100%;
        }
      }
    }
  }
`;
