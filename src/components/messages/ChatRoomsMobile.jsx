import React, { useState } from "react";
import styled from "styled-components";
import env from "../../env";
import useGetChatRooms from "../../app/services/messages/useGetChatRooms";
import ChatRoom from "./ChatRoom";

const ChatRoomsMobile = ({
  updateRoomId,
  roomId,
  setShowMobileMessage,
  setSenderDetails,
}) => {
  const { roomsLoading, chatRoomList } = useGetChatRooms();

  const { userType } = env?.getUser();

  return (
    <>
      {roomsLoading ? (
        <ChatRoomsContainer>
          {" "}
          <h3 style={{ color: "#e8e8e8", textAlign: "center" }}>
            Loading Chatrooms...
          </h3>
        </ChatRoomsContainer>
      ) : chatRoomList.length === 0 ? (
        <ChatRoomsContainer>
          {" "}
          <h3 style={{ color: "#e8e8e8", textAlign: "center" }}>
            Chatroom Empty
          </h3>
        </ChatRoomsContainer>
      ) : (
        <ChatRoomsContainer>
          {chatRoomList.map((room) => {
            const projectManagerName = `${room?.projectManager?.firstName} ${room?.projectManager?.lastName}`;
            const userName = `${room?.user?.firstName} ${room?.user?.lastName}`;
            return (
              <>
                <ChatRoom
                  name={userType === "user" ? projectManagerName : userName}
                  handleChatroomClick={() => {
                    updateRoomId(room._id);
                    setSenderDetails(
                      userType === "user" ? projectManagerName : userName
                    );
                    setShowMobileMessage(true);
                  }}
                  roomId={roomId}
                  active={roomId === room._id}
                  chatRoomId={room._id}
                />
              </>
            );
          })}
        </ChatRoomsContainer>
      )}
    </>
  );
};

export default ChatRoomsMobile;

const ChatRoomsContainer = styled.div`
  /* background-color: #dac4c4; */
  display: none;
  margin: 24px;
  border-radius: 13px;
  height: 90%;
  overflow-y: auto;

  @media only screen and (max-width: 1150px) {
    width: 50%;
  }

  @media only screen and (max-width: 768px) {
    display: block;
    width: 90%;
  }
`;
