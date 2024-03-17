import React from "react";
import styled from "styled-components";
import editButton from "../../assets/dashboard/EditButton.svg";

const TableMobileItem = ({ id, name, email, assignedProperty }) => {
  return (
    <>
      <div>
        <p>ID: {id}</p>
      </div>
      <div>
        <p>
          <b>Name:</b> {name}
        </p>
      </div>
      <div>
        <p>
          <b>Email:</b> {email}
        </p>
      </div>
      {/* <div>
        <p>
          <b>Assigned Property:</b> {assignedProperty}
        </p>
      </div> */}
      <div>
        <p>
          <b>Date:</b> 12/12/24
        </p>
      </div>
      <div style={{ marginBottom: "16px" }}>
        <img
          src={editButton}
          alt="edit"
          style={{ width: "70%", height: "70%" }}
        />
      </div>
    </>
  );
};

const TableMobile = ({ list }) => {
  return (
    <TableMobileStyle>
      {list.length === 0 ? (
        <h3>No User Available</h3>
      ) : (
        list.map((item, index) => {
          return (
            <div className="table-item-wrapper" key={index + 1}>
              <p>{index + 1}</p>
              <div className="table-item">
                <TableMobileItem
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  email={item.email}
                  // assignedProperty="Placeholder Estate"
                />
              </div>
            </div>
          );
        })
      )}
    </TableMobileStyle>
  );
};

export default TableMobile;

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
      justify-content: center;
      align-items: center;
      margin: 16px 20px;
      background: #fff;
      padding: 20px 16px;
      box-shadow: 0px 8px 50px -4px rgba(16, 24, 40, 0.01),
        0px 20px 50px -4px rgba(16, 24, 40, 0.03),
        1px -4px 50px 4px rgba(16, 24, 40, 0.01),
        0px -10px 50px 4px rgba(0, 0, 0, 0.03);
      border-radius: 8px;
      /* width: 70%; */

      .table-item {
        display: flex;
        flex-wrap: wrap;
        justify-content: start;
        align-items: center;
      }
    }
  }
`;
