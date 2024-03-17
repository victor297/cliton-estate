import React, { useEffect } from "react";
import WebsiteNav from "../../components/navbar/WebsiteNav";
import styled from "styled-components";
import Background from "../../components/websiste/Background";
import helmet_pic from "../../assets/about_us/about_us_helmet.png";
import setsquare_pic from "../../assets/about_us/about_us_sets_square.png";
import hands_pic from "../../assets/about_us/about_us_hands.png";
import men_pic from "../../assets/about_us/about_us_men_thumbsup.png";
import ButtonWebsite from "../../components/websiste/ButtonWebsite";
import Footer from "../../components/Footer";

import projects_image_1 from "../../assets/about_us/about_us_pic_1.png";
import projects_image_2 from "../../assets/about_us/about_us_pic_2.png";
import projects_image_3 from "../../assets/about_us/about_us_pic_3.png";
import projects_image_4 from "../../assets/about_us/about_us_pic_4.png";
import projects_image_5 from "../../assets/about_us/about_us_pic_5.png";
import projects_image_6 from "../../assets/about_us/about_us_pic_6.png";

const AboutUs = () => {
  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);
  return (
    <AboutUsStyle>
      <WebsiteNav activePage="about-us" />

      <div className="about-us-container">
        <section id="section-1" className="section-1">
          <Background />
          <h3>About Us</h3>
          <p className="paragraph">
            Our journey began with a vision to transform skylines and create not
            just buildings, but communities that thrive. Clinton’s Developers
            Ltd is more than just a property development company. We are
            innovators in space creation, dedicated to crafting environments
            that inspire and elevate everyday living.{" "}
          </p>
          <p className="paragraph">
            With a portfolio that spans across residential, commercial and
            mixed-use properties, we have become a trusted name in delivering
            excellence and value to our clients and stakeholders. We understand
            that a home is not just a structure, it's a sanctuary.
          </p>

          <div className="section-1-img">
            <img src={helmet_pic} alt="helmet" />
          </div>

          <p className="paragraph">
            We collaborate with top architects and designers to ensure that
            every project is a masterpiece in efficiency, design and comfort.
            Our unwavering dedication to customer satisfaction and our proactive
            approach to problem-solving make us the partner you can depend on
            for your property needs.{" "}
          </p>
        </section>

        <section className="section-2">
          <div className="section-text">
            <h3>Our Mission</h3>
            <p className="paragraph">
              Our mission is to create spaces that enhance the human experience.
              We strive to push the boundaries of design and technology to build
              not just properties, but elevated experiences. Our focus on
              innovation, sustainability, and community enrichment drives us to
              excel in every project we undertake. Choosing Clinton Developers
              Ltd means opting for a legacy of quality and innovation.
            </p>
          </div>

          <div className="section-images">
            <img src={setsquare_pic} alt="our mission" />
          </div>
        </section>
        <section className="section-3">
          <div className="section-images">
            <img src={hands_pic} alt="hands_working" />
          </div>
          <div className="section-text">
            <h3>Why Choose Us</h3>
            <p className="paragraph">
              Integrity, competence and forthrightness set us apart from the
              rest. As a company, we want to be profitable, but this comes well
              after the satisfaction of our clients. We know that if the client
              is happy, profitability will be inevitable. We are dogged in our
              resolve to always put our clients first and this, we think is the
              best reason why Clinton’s Developers Ltd should always be your
              first and only choice.
            </p>
          </div>
        </section>
        <section className="section-4">
          <div className="section-text">
            <h3>Meet the Team</h3>
            <p className="paragraph">
              Our team is the foundation of our success. We have a group of
              passionate professionals, each an expert in their field. From
              visionary architects to dedicated construction experts, our team
              works in unison to bring our ambitious projects to life. Their
              diverse skills and unwavering commitment ensure that we meet and
              exceed the expectations of our clients and the communities we
              serve.
            </p>
          </div>

          <div className="section-images">
            <img src={men_pic} alt="men_giving_thumbs_up" />
          </div>
        </section>

        <section className="section-5">
          <div className="projects-header">
            <h3>Our Projects</h3>
            <p className="text">
              Our portfolio showcases a range of projects that mirror our
              versatility and expertise.
            </p>
            <ButtonWebsite text="View Projects in Offers" path="/offers" />
          </div>

          <div className="projects-gallery">
            <div className="project-images">
              <img src={projects_image_1} alt="" />
            </div>
            <div className="project-images">
              <img src={projects_image_2} alt="" />
            </div>
            <div className="project-images">
              <img src={projects_image_3} alt="" />
            </div>
            <div className="project-images">
              <img src={projects_image_4} alt="" />
            </div>
            <div className="project-images">
              <img src={projects_image_5} alt="" />
            </div>
            <div className="project-images">
              <img src={projects_image_6} alt="" />
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </AboutUsStyle>
  );
};

export default AboutUs;

const AboutUsStyle = styled.div`
  width: 100%;
  .about-us-container {
    width: 100%;
    padding: 120px 0px;
    h3 {
      font-weight: 500;
      font-size: 48px;
      letter-spacing: 0.001em;
      color: #192861;
      margin-bottom: 40px;
    }
    .paragraph {
      font-weight: 400;
      font-size: 24px;
      letter-spacing: 0.001em;
      margin-bottom: 40px;
      line-height: 40px;
      color: #192861;
    }

    .section-1 {
      margin-bottom: 215px;
      padding: 0px 112px;
      .section-1-img {
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        img {
          width: 100%;
          object-fit: cover;
        }
        margin-bottom: 40px;
      }
    }

    .section-2,
    .section-3,
    .section-4 {
      width: 100%;
      padding: 0px 112px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 66px;
      text-align: justify;
      width: 100%;
      margin-bottom: 215px;

      .section-text {
        width: 50%;
      }

      .section-images {
        width: 50%;
        img {
          width: 100%;
          object-fit: cover;
        }
      }
    }

    .section-5 {
      .projects-header {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-bottom: 92px;
        h3 {
          font-weight: 500;
          font-size: 48px;
          letter-spacing: 0.001em;
          color: #192861;
          margin-bottom: 16px;
        }
        .text {
          font-weight: 400;
          font-size: 20px;
          letter-spacing: 0.001em;
          margin-bottom: 56px;
          line-height: 40px;
          color: #192861;
        }
      }

      .projects-gallery {
        display: grid;
        gap: 30px;
        grid-template-columns: 1fr 1fr 1fr;
        width: 100%;
        margin: 0px auto;
        /* overflow: hidden; */

        .project-images {
          width: 100%;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
      }
    }
  }

  @media only screen and (max-width: 1100px) {
    .about-us-container {
      padding: 10px;
      h3 {
        font-size: 30px;
      }
      .paragraph {
        font-size: 16px;
      }
      .section-1 {
        margin-bottom: 115px;
        padding: 0px;
      }
      .section-2,
      .section-3,
      .section-4 {
        flex-wrap: wrap;
        text-align: center;
        margin-bottom: 115px;
        padding: 0px;
      }

      .section-2,
      .section-3,
      .section-4 {
        .section-text {
          width: 100%;
        }

        .section-images {
          width: 100%;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      .section-3 {
        flex-direction: column-reverse;
      }
      .section-5 {
        .projects-header {
          h3 {
            font-weight: 500;
            font-size: 30px;
          }
          .text {
            font-weight: 400;
            font-size: 16px;
            text-align: center;
          }
        }

        .projects-gallery {
          grid-template-columns: 1fr;
        }
      }
    }
  }
`;
