import React from "react";
import Sidebar from "../../../components/dashboard/Sidebar";
import { useNavigate } from "react-router-dom";
import InfoContainer from "../../../components/InfoContainer";
import InfoCard from "../../../components/dashboard/InfoCard";
import { CardsWrapper } from "../../userPages/dashboardStyles";
import useGetAllProjects from "../../../app/services/projects/useGetAllProjects";

import { DashboardContainer } from "./AdminDashboardStyles";

import MobileAdminNav from "../../../components/navbar/MobileAdminNav";

const AdminProjects = () => {
  const navigate = useNavigate();
  const { loading, projectList } = useGetAllProjects();
  const completedProjects = projectList.filter(
    (project) => project.status === "completed"
  );

  return (
    <div>
      <DashboardContainer>
        <Sidebar />
        <MobileAdminNav />
        <div>
          {loading ? (
            <div style={{ marginTop: "50px" }}>
              <h3 style={{ textAlign: "center", color: "#e8e8e8" }}>
                Loading...
              </h3>
            </div>
          ) : projectList.length === 0 ? (
            <InfoContainer
              title="Ongoing Projects"
              action={() => navigate("/admin-dashboard/projects/create")}
            >
              <div style={{ marginTop: "50px" }}>
                <h3 style={{ textAlign: "center", color: "#e8e8e8" }}>
                  No Projects Available
                </h3>
              </div>
            </InfoContainer>
          ) : null}

          {projectList.length > 0 && (
            <>
              <InfoContainer
                title="Ongoing Projects"
                action={() => navigate("/admin-dashboard/projects/create")}
              >
                <CardsWrapper>
                  {loading ? (
                    <h3 style={{ textAlign: "center", color: "#e8e8e8" }}>
                      Loading...
                    </h3>
                  ) : projectList.length === 0 ? (
                    <h3 style={{ textAlign: "center", color: "#e8e8e8" }}>
                      No Projects Available
                    </h3>
                  ) : (
                    projectList.map(
                      (project) =>
                        project.status === "ongoing" && (
                          <InfoCard
                            name={project.name}
                            imgSrc={project.image}
                            tagInfo={
                              project["unit count"].length === 0
                                ? "0 Units"
                                : `${project["unit count"][0].count} units`
                            }
                            location={project.location}
                            link={`/admin-dashboard/projects/${project._id}`}
                          />
                        )
                    )
                  )}
                </CardsWrapper>
                <br />
              </InfoContainer>

              <InfoContainer title="Completed Projects">
                <CardsWrapper>
                  {loading ? (
                    <h3 style={{ textAlign: "center", color: "#e8e8e8" }}>
                      Loading...
                    </h3>
                  ) : completedProjects.length === 0 ? (
                    <h3 style={{ textAlign: "center", color: "#e8e8e8" }}>
                      No Projects Available
                    </h3>
                  ) : (
                    completedProjects.map(
                      (project) =>
                        project.status === "completed" && (
                          <InfoCard
                            name={project.name}
                            imgSrc={project.image}
                            tagInfo={
                              project["unit count"].length === 0
                                ? "0 Units"
                                : `${project["unit count"][0].count} units`
                            }
                            location={project.location}
                            link={`/admin-dashboard/projects/${project._id}`}
                          />
                        )
                    )
                  )}
                </CardsWrapper>
                <br />
              </InfoContainer>
            </>
          )}
        </div>
      </DashboardContainer>
    </div>
  );
};

export default AdminProjects;
