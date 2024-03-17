import React from "react";
import styled from "styled-components";
import ActionButton from "../../button/ActionButton";
import { useNavigate } from "react-router-dom";

const ProjectTableItem = ({ title, amount, date }) => {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <p>
          <b>Title:</b> {title}
        </p>
      </div>
      <div>
        <p>
          <b>Amount Paid:</b> {amount}
        </p>
      </div>
      <div>
        <p>
          <b>Date:</b> {date}
        </p>
      </div>
    </>
  );
};

const UnitTransactionsTable = ({ list }) => {
  return (
    <TableMobileStyle>
      {list.length === 0 ? (
        <h3>No Unit Avaible</h3>
      ) : (
        list.map((item, index) => {
          return (
            <div className="table-item-wrapper">
              <p>{index + 1}</p>
              <div className="table-item">
                <ProjectTableItem
                  title={item.txTitle}
                  amount={item.amount}
                  date={item.date}
                />
              </div>
            </div>
          );
        })
      )}
    </TableMobileStyle>
  );
};

export default UnitTransactionsTable;

const TableMobileStyle = styled.div`
  display: none;

  @media only screen and (max-width: 768px) {
    display: block;
    /* gap: 40px; */

    padding-top: 24px;

    p {
      color: #192861;
      font-size: 10px;
      font-weight: 400;
      letter-spacing: 0.01px;
      margin-bottom: 16px;
      margin-right: 16px;
    }

    h3 {
      text-align: center;
    }

    .table-item-wrapper {
      display: flex;
      gap: 8px;
      align-items: center;
      margin: 16px 8px;
      background: #fff;
      padding: 20px 16px;
      box-shadow: 0px 8px 50px -4px rgba(16, 24, 40, 0.01),
        0px 20px 50px -4px rgba(16, 24, 40, 0.03),
        1px -4px 50px 4px rgba(16, 24, 40, 0.01),
        0px -10px 50px 4px rgba(0, 0, 0, 0.03);
      border-radius: 8px;

      .table-item {
        display: flex;
        flex-wrap: wrap;
        justify-content: start;
        align-items: center;
      }
    }

    .view-btn {
      padding: 8px 32px;
      border-radius: 5px;
      background: #f8f4f6;
      margin-bottom: 16px;

      p {
        color: #192861;
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        letter-spacing: 0.016px;
        margin: 0;
        padding: 0;
      }
    }
  }
`;
