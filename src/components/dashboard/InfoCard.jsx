import React, { useState } from "react";
import styled from "styled-components";
import env from "../../env";
import locationIcon from "../../assets/common/location-icon.svg";
import messageButton from "../../assets/dashboard/message-cta.svg";
import { Link, useNavigate } from "react-router-dom";
import { http } from "../../app/services/axios-https";
import toast from "react-hot-toast";
import Notification from "../Notification";
import { formatNumber } from "../../utils/styles/formatNumber";

const InfoCard = ({
  imgSrc,
  tagInfo,
  link,
  name,
  location,
  price,
  linkToMessage,
  ownedUnitId,
  stateObj,
}) => {
  const navigate = useNavigate();

  const [creatingChatRoom, setCreatingChatRoom] = useState(false);

  const goToMessage = () => {
    setCreatingChatRoom(true);

    http
      .post(
        `${env.clinton_homes_base_url}/user/create-chat-room/${ownedUnitId}`
      )
      .then((response) => {
        navigate(linkToMessage, { state: { unitId: ownedUnitId } });
        setCreatingChatRoom(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message || "An Error Occured");
      });
  };

  creatingChatRoom && toast("Loading Chats..");

  return (
    <CardContainer>
      <Notification />
      <div className="main-image" onClick={() => navigate(link, stateObj)}>
        <img
          src={imgSrc}
          alt="house"
          height="200"
          style={{
            maxHeight: "150px",
            objectFit: "cover",
            width: "100%",
            height: "250px",
            aspectRatio: "Square",
          }}
        />
        <div className="info-tag">{tagInfo}</div>
      </div>

      <div className="name-and-price" onClick={() => navigate(link)}>
        <h5>{name}</h5>
        <p>{formatNumber.formatZeroes(price)}</p>
      </div>

      <p className="location">
        <span>
          <img src={locationIcon} alt="" style={{ marginTop: "5px" }} />
        </span>{" "}
        {location}
      </p>

      <div className="message-bar">
        <p>Clinton's Developers Ltd</p>

        {ownedUnitId && (
          <img src={messageButton} alt="" onClick={() => goToMessage()} />
        )}
      </div>
    </CardContainer>
  );
};

export default InfoCard;

const CardContainer = styled.div`
  background-color: #fff;
  max-width: 100%;
  /* margin: 0 auto; */
  padding: 16px;
  border-radius: 10px;
  box-shadow: 0px 8px 50px -4px rgba(16, 24, 40, 0.01),
    0px 20px 50px -4px rgba(16, 24, 40, 0.03),
    1px -4px 50px 4px rgba(16, 24, 40, 0.01),
    0px -10px 50px 4px rgba(0, 0, 0, 0.03);

  .main-image {
    margin-bottom: 20px;
    position: relative;
    cursor: pointer;
    img {
      width: 100%;
      display: block;
    }

    .info-tag {
      background-color: #fff;
      position: absolute;
      bottom: 5%;
      left: 0;
      border-radius: 0px 10px 10px 0px;
      color: #6976a1;
      font-size: 12px;
      font-weight: 500;
      letter-spacing: 0.012px;
      padding: 9px 8px 8px 7px;
    }
  }

  .name-and-price {
    display: flex;
    justify-content: space-between;
    margin-bottom: 7px;
    cursor: pointer;

    h5,
    p {
      color: #192861;
      line-height: 30px; /* 187.5% */
    }

    h5 {
      font-size: 16px;
      font-weight: 700;
      letter-spacing: 0.016px;
    }

    p {
      font-size: 12px;
      font-weight: 500;
      letter-spacing: 0.012px;
    }
  }

  .location {
    color: #192861;
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0.014px;
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 32px;
  }

  .message-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
    cursor: pointer;

    p {
      color: #192861;
      font-size: 12px;
      font-weight: 400;
      letter-spacing: 0.012px;
    }
  }
`;
