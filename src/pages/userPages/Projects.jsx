import React from "react";
import DashboardNav from "../../components/navbar/DashboardNav";
import InfoCard from "../../components/dashboard/InfoCard";
import InfoContainer from "../../components/InfoContainer";
import { ReactComponent as Spinner } from "../../assets/common/spinner-large.svg";
import { CardsWrapper } from "./dashboardStyles";

import useGetAllProjects from "../../app/services/projects/useGetAllProjects";

const Projects = () => {
  const { loading, projectList } = useGetAllProjects();

  return (
    <div>
      <DashboardNav />
      <InfoContainer title="Ongoing Projects">
        <CardsWrapper>
          {loading ? (
            <Spinner />
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
                    link={`/projects/${project._id}`}
                  />
                )
            )
          )}
        </CardsWrapper>
      </InfoContainer>

      <InfoContainer title="Completed Projects">
        <CardsWrapper>
          {loading ? (
            <Spinner />
          ) : (
            projectList.map(
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
                    link={`/projects/${project._id}`}
                  />
                )
            )
          )}
        </CardsWrapper>
        <br />
      </InfoContainer>
    </div>
  );
};

export default Projects;
