import React from "react";
import DashboardNav from "../../components/navbar/DashboardNav";
import styled from "styled-components";
import InfoCard from "../../components/dashboard/InfoCard";
import InfoContainer from "../../components/InfoContainer";
import DataTable from "react-data-table-component";
import { TableContainer } from "../adminPages/dashboard/AdminDashboardStyles";
import bed from "../../assets/dashboard/bed-icon.svg";
import { ReactComponent as Spinner } from "../../assets/common/spinner-large.svg";
import { CardsWrapper } from "./dashboardStyles";
import env from "../../env";
import { dashboardTableSyles } from "../../utils/styles/tableStyles";
import moment from "moment";
import MobileTransactionsTable from "../../components/dashboard/TableMobile/MobileTransactionsTable";
import useGetAllProjects from "../../app/services/projects/useGetAllProjects";
import useGetUserOwnedUnit from "../../app/services/units/useGetUserOwnedUnit";
import useGetUserTransactions from "../../app/services/Transactions/useGetUserTransactions";

//move to services where you will feetch it from

const UserDashboard = () => {
  const user = env?.getUser();
  const { unitsLoading, ownedUnits } = useGetUserOwnedUnit();
  const { transactionLoading, userTransactionList } = useGetUserTransactions();
  const { loading, projectList } = useGetAllProjects();
  const columns = [
    {
      name: "",
      selector: (row, index) => index + 1,
    },
    {
      name: "ID",
      selector: (row) => row.txId,
    },
    {
      name: "Name",
      selector: (row) => row.txTitle,
      grow: 2,
    },

    {
      name: "Amount",
      selector: (row) => row.amount,
    },
    {
      name: "Type",
      selector: (row) => row.txType,
    },
    {
      name: "Date",
      selector: (row) => moment(row.createdAt).format("MM/DD/YYYY"),
    },
  ];

  return (
    <>
      <DashboardNav />

      <Welcome>
        <h3 onClick={() => console.log(ownedUnits)}>
          Welcome {user?.firstName}
        </h3>
        <p>
          You currently have ({ownedUnits.length ? ownedUnits.length : "0"})
          properties
        </p>
      </Welcome>

      <InfoContainer title="My Properties">
        <CardsWrapper>
          {unitsLoading ? (
            <Spinner />
          ) : ownedUnits ? (
            ownedUnits?.map((unit, index) => {
              return (
                <InfoCard
                  linkToMessage="/messages"
                  ownedUnitId={unit._id}
                  name={unit.unitId.name}
                  imgSrc={unit.unitId.image}
                  price={unit.unitId.price}
                  tagInfo={
                    <Tag>
                      <img src={bed} alt="" />
                      {unit.unitId.numberOfRooms}
                    </Tag>
                  }
                  // location={project.location}
                  link={`/projects/owned-units/${unit.unitId._id}`}
                  stateObj={{ state: { unitId: ownedUnits[index]?._id } }}
                />
              );
            })
          ) : (
            <h3>You currently have no properties</h3>
          )}
        </CardsWrapper>
        <br />
      </InfoContainer>

      <InfoContainer title="Recent Transactions">
        <TableContainer style={{ padding: "16px", backgroundColor: "#fafafa" }}>
          <DataTable
            data={userTransactionList}
            columns={columns}
            customStyles={dashboardTableSyles}
            progressPending={transactionLoading}
            noDataComponent={
              <h4 style={{ color: "e8e8e8" }}>No Transactions Available</h4>
            }
            progressComponent={<Spinner />}
          />
        </TableContainer>
      </InfoContainer>

      {transactionLoading ? null : (
        <MobileTransactionsTable list={userTransactionList} />
      )}

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
        <br />
      </InfoContainer>
    </>
  );
};

export default UserDashboard;

const Welcome = styled.div`
  background-color: #fafafa;
  padding: 64px 0px 40px 32px;

  h3 {
    color: #192861;
    font-size: 32px;
    font-weight: 700;
    line-height: 30px; /* 93.75% */
    letter-spacing: 0.032px;
    margin-bottom: 16px;
  }

  p {
    color: #192861;
    font-size: 16px;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.016px;
  }
`;

const Tag = styled.div`
  display: flex;
  gap: 6px;
`;
