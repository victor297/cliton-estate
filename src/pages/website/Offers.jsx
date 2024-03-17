import React, { useEffect } from "react";
import WebsiteNav from "../../components/navbar/WebsiteNav";
import styled from "styled-components";
import Background from "../../components/websiste/Background";
import InfoCard from "../../components/dashboard/InfoCard";

import useGetAllProjects from "../../app/services/projects/useGetAllProjects";

import Footer from "../../components/Footer";

const Offers = () => {
  const { loading, projectList } = useGetAllProjects();

  const completedProjects = projectList.filter(
    (project) => project.status === "completed"
  );

  //scroll to top of screen
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <OffersStyle>
      <WebsiteNav activePage="offers" />
      <section id="section-1" className="section-1">
        <Background />
        <h3>Offers</h3>
        <p className="paragraph">
          We understand that investing in property is a significant decision,
          and we are here to ensure that it's not only rewarding but also
          accessible. Our curated offers are designed to provide our clients
          with exceptional opportunities to own their dream property.
        </p>
      </section>
      <div className="offers-container">
        <section className="section-2" style={{ backgroundColor: "inherit" }}>
          <div className="offers-header">
            <h3>Ongoing Projects</h3>
            <p className="text">We have got lots of offers for you</p>
          </div>

          {loading ? (
            <h3 className="loading-text">Loading...</h3>
          ) : (
            <OffersWrapper>
              {projectList.map((project) => {
                if (project.status === "ongoing") {
                  return (
                    <InfoCard
                      name={project.name}
                      imgSrc={project.image}
                      tagInfo={
                        project["unit count"].length === 0
                          ? "0 Units"
                          : `${project["unit count"][0].count} units`
                      }
                      location={project.location}
                      link={`/projects/${project._id}`}
                    />
                  );
                }
              })}
            </OffersWrapper>
          )}
        </section>

        <section className="section-2">
          <div className="offers-header">
            <h3>Completed Projects</h3>
            <p className="text">We have got lots of offers for you</p>
          </div>

          {loading ? (
            <h3 className="loading-text">Loading...</h3>
          ) : completedProjects.length === 0 ? (
            <h3 className="loading-text">No projects found</h3>
          ) : (
            <OffersWrapper>
              {completedProjects.map((project) => {
                return (
                  <InfoCard
                    name={project.name}
                    imgSrc={project.image}
                    tagInfo={
                      project["unit count"].length === 0
                        ? "0 Units"
                        : `${project["unit count"][0].count} units`
                    }
                    location={project.location}
                    link={`/projects/${project._id}`}
                  />
                );
              })}
            </OffersWrapper>
          )}
        </section>
      </div>

      <Footer />
    </OffersStyle>
  );
};

export default Offers;

const OffersStyle = styled.div`
  .loading-text {
    color: #e8e8e8;
    font-size: 12px;
  }
  .section-1 {
    position: relative;
    margin-bottom: 150px;
    padding: 90px 112px;

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

  .offers-container {
    padding: 0px 0px 120px 0px;
    position: relative;
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
    }

    .section-2 {
      padding: 0px 112px;
      margin-bottom: 150px;

      .loading-text {
        color: #e8e8e8;
        font-size: 32px;
        text-align: center;
      }
      .offers-header {
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
        }
      }
    }
  }

  @media only screen and (max-width: 1500px) {
    .offers-container {
      h3 {
      }
      .paragraph {
      }
      .section-1 {
      }

      .section-2 {
        .images-header {
          h3 {
          }
          .text {
          }
        }

        .offers-grid {
          grid-template-columns: 1fr 1fr;
          row-gap: 16px;
          place-items: center;
        }
      }
    }
  }

  @media only screen and (max-width: 768px) {
    .section-1 {
      margin-bottom: 115px;
      padding: 20px;

      h3 {
        font-size: 30px;
      }
      .paragraph {
        font-size: 16px;
      }
    }
    .offers-container {
      padding: 10px;
      h3 {
        font-size: 30px;
      }
      .paragraph {
        font-size: 16px;
      }

      .section-2 {
        padding: 0px;

        .offers-header {
          h3 {
            font-weight: 500;
            font-size: 30px;
          }
          .text {
            font-weight: 400;
            font-size: 16px;
          }
        }

        .offers-grid {
          grid-template-columns: 1fr 1fr;
        }
      }
    }
  }

  @media only screen and (max-width: 1024px) {
    .offers-container {
      h3 {
      }
      .paragraph {
      }
      .section-1 {
      }

      .section-2 {
        .images-header {
          h3 {
          }
          .text {
          }
        }

        .offers-grid {
          grid-template-columns: 1fr;
        }
      }
    }
  }
`;

const OffersWrapper = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100%;
  margin: 0px auto;

  .gallery-image {
    width: 100%;
    height: 450px;
    img {
      width: 100%;
      height: 100%;
      /* object-fit: cover; */
    }
  }

  @media only screen and (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }

  @media only screen and (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  @media only screen and (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;
