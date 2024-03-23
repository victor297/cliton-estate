import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import DashboardNav from "../../components/navbar/DashboardNav";
import { http } from "../../app/services/axios-https";
import env from "../../env";

import ChatRooms from "../../components/messages/ChatRooms";
import ChatRoomsMobile from "../../components/messages/ChatRoomsMobile";
import MessageArea from "../../components/messages/MessageArea";
import MessageAreaMobile from "../../components/messages/MessageAreaMobile";
import useGetChatRooms from "../../app/services/messages/useGetChatRooms";

const Messages = () => {
  const { userType } = env?.getUser();
  const { state } = useLocation();
  const [roomId, setRoomId] = useState("");
  const [showMobileMessage, setShowMobileMessage] = useState(false);
  const { chatRoomList, initialId } = useGetChatRooms();
  const [messageInput, setMessageInput] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);
  const [senderDetails, setSenderDetails] = useState("");
  const [reloadCount, setReloadCount] = useState(0);
  const triggerReload = () => {
    setReloadCount((prevKey) => prevKey + 1);
  };

  useEffect(() => {
    const intervalId = setInterval(triggerReload, 5000); // 5000 milliseconds = 5 seconds

    return () => {
      clearInterval(intervalId); // Cleanup the interval on component unmount
    };
  }, []);

  const updateRoomId = (id) => {
    console.log(id);
    setRoomId(id);
  };

  const handleSendMessage = () => {
    if (messageInput !== "") {
      console.log(messageInput);
      setSendingMessage(true);
      const formdata = { message: messageInput };
      http
        .post(
          `${env.clinton_homes_base_url}/user/create-message/${roomId}`,
          formdata
        )
        .then((response) => {
          console.log(response);
          setMessageInput("");
          triggerReload();
          setSendingMessage(false);
        })
        .catch((error) => {
          setSendingMessage(false);
          console.log(error);
        });
    }
    // console.log(roomId);
  };

  useEffect(() => {
    if (initialId) {
      setRoomId(initialId);
    }
  }, [initialId]);

  return (
    <div>
      {userType === "user" && <DashboardNav />}
      <MessagesContainer userType={userType}>
        <ChatRooms updateRoomId={updateRoomId} roomId={roomId} />

        {!showMobileMessage && (
          <ChatRoomsMobile
            updateRoomId={updateRoomId}
            roomId={roomId}
            setShowMobileMessage={setShowMobileMessage}
            setSenderDetails={setSenderDetails}
          />
        )}

        <Divider userType={userType}></Divider>
        <MessageArea
          handleSendMessage={handleSendMessage}
          roomId={roomId}
          messageInput={messageInput}
          setMessageInput={setMessageInput}
          reloadCount={reloadCount}
        />

        {showMobileMessage && (
          <MessageAreaMobile
            handleSendMessage={handleSendMessage}
            roomId={roomId}
            messageInput={messageInput}
            setMessageInput={setMessageInput}
            reloadCount={reloadCount}
            senderDetails={senderDetails}
            setShowMobileMessage={setShowMobileMessage}
          />
        )}
      </MessagesContainer>
    </div>
  );
};

export default Messages;

const MessagesContainer = styled.div`
  display: flex;
  width: 95%;
  background-color: #fff;
  border-radius: 25px;
  margin: 0px auto;
  height: calc(100vh - 204px);
  ${({ userType }) => userType !== "user" && " height: 100vh;"}
  min-height: 500px;

  @media only screen and (max-width: 768px) {
    display: block;
  }
`;

const Divider = styled.div`
  width: 1px;
  height: calc(100vh - 204px);
  ${({ userType }) => userType !== "user" && " height: 90vh;"}
  background-color: #eaecf0;
  min-height: 500px;
  margin: 24px 0px;

  @media only screen and (max-width: 768px) {
    display: none;
  }
`;
