import React, { useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import DashboardNav from "../../components/navbar/DashboardNav";
import InputCommon from "../../components/inputField/InputCommon";
import ButtonCommon from "../../components/button/ButtonCommon";
import Spinner from "../../assets/common/spinner.svg";
import { http } from "../../app/services/axios-https";
import env from "../../env";
import toast from "react-hot-toast";
import Notification from "../../components/Notification";
import InfoContainer from "../../components/InfoContainer";
import DataTable from "react-data-table-component";
import { dashboardTableSyles } from "../../utils/styles/tableStyles";
import { ReactComponent as LoadingSpinner } from "../../assets/common/spinner-large.svg";
import useGetUserBillPayments from "../../app/services/Transactions/useGetUserBillPayments";
import moment from "moment";

import { DashboardMain } from "../adminPages/dashboard/AdminDashboardStyles";

const ElectricityBill = () => {
  const { state } = useLocation();
  const [name, setName] = useState();
  const [meterNumber, setMeterNumber] = useState();
  const [amount, setAmount] = useState();
  const [paying, setPaying] = useState();

  const { gettingPayments, userPaymentsList } = useGetUserBillPayments(
    state.unitId
  );

  const columns = [
    {
      name: "",
      selector: (row, index) => index + 1,
    },
    {
      name: "ID",
      selector: (row) => row.paymentId,
    },
    {
      name: "Meter Number",
      selector: (row) => row.metre_number,
      grow: 2,
    },

    {
      name: "Amount",
      selector: (row) => row.amount,
    },

    {
      name: "Date",
      selector: (row) => moment(row.createdAt).format("MM/DD/YYYY"),
    },
  ];

  const openPopup = (url) => {
    window.open(url, "_blank");
  };

  const payElectricityBill = () => {
    setPaying(true);
    const formData = {
      name,
      metre_number: meterNumber,
      amount: +amount,
      unitId: state.unitId,
    };
    http
      .post(`${env.clinton_homes_base_url}/user/make-bill-payment`, formData)
      .then((response) => {
        toast.success("Payment initiated successfully");
        const authorizationUrl = response.data.data.data.data.authorization_url;
        setPaying(false);

        openPopup(authorizationUrl);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error?.response?.data?.message || "An Error Occured");
        setPaying(false);
      });
  };

  return (
    <>
      <Notification />
      <DashboardNav />
      <DashboardMain>
        <Title>
          <h4>Pay Electricity Bill</h4>
        </Title>

        <div>
          {/* <DataTable
              data={data}
              columns={columns}
              customStyles={customStyles}
            /> */}

          <FormContainer>
            <InputCommon
              placeholder="Name:"
              marginBottom="24px"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <InputCommon
              placeholder="Meter Number:"
              marginBottom="24px"
              value={meterNumber}
              onChange={(e) => setMeterNumber(e.target.value)}
            />
            <InputCommon
              placeholder="Amount:"
              marginBottom="24px"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <div style={{ textAlign: "end" }}>
              <ButtonCommon
                content={paying ? <img src={Spinner} /> : "Pay"}
                backgroundColor="#F8F4F6"
                textColor="#721F4B"
                marginTop="16px"
                onClick={payElectricityBill}
                width="20%"
                disabled={!name || !amount || !meterNumber}
              />
            </div>
          </FormContainer>
        </div>

        <TransactionsContainer>
          <InfoContainer title="Recent Transactions">
            <div style={{ padding: "16px", backgroundColor: "#fafafa" }}>
              <DataTable
                data={userPaymentsList}
                columns={columns}
                customStyles={dashboardTableSyles}
                progressPending={gettingPayments}
                noDataComponent={
                  <h4 style={{ color: "e8e8e8" }}>No Transactions Available</h4>
                }
                progressComponent={<LoadingSpinner />}
              />
            </div>
          </InfoContainer>
        </TransactionsContainer>
      </DashboardMain>
    </>
  );
};

export default ElectricityBill;

const Title = styled.div`
  display: flex;
  align-items: center;
  width: 60%;
  margin: 0px auto;
  margin-bottom: 48px;
  gap: 40px;

  @media only screen and (max-width: 768px) {
    width: 90%;
    margin-top: 45px;
  }

  h4 {
    margin-bottom: 6px;

    color: rgb(114, 31, 75);
    font-size: 18px;
    font-weight: 700;
    line-height: 26px;
    letter-spacing: 0.018px;
  }
`;

const FormContainer = styled.div`
  padding: 24px;
  background-color: rgba(255, 255, 255, 1);
  width: 60%;
  margin: 0px auto 104px auto;
  border-radius: 6px;

  .form-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;
  }

  @media only screen and (max-width: 768px) {
    width: 90%;
  }

  h4 {
    color: #721f4b;
    font-size: 18px;
    font-weight: 700;
    letter-spacing: 0.018px;
    margin-bottom: 32px;
  }
`;

const TransactionsContainer = styled.div`
  width: 60%;
  margin: 0px auto;

  @media only screen and (max-width: 768px) {
    width: 90%;
  }
`;
