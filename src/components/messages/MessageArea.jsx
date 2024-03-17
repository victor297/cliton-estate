import React, { useState, useEffect } from "react";
import styled from "styled-components";
import env from "../../env";
import { http } from "../../app/services/axios-https";
import InputCommonWithIcon from "../../components/inputField/InputCommonWithIcon";
import MessageBubble from "./MessageBubble";
import sendMessage from "../../assets/common/send-message-icon.svg";
import spinner from "../../assets/common/message-spinner.svg";
import { useLocation } from "react-router-dom";
import useGetChatRooms from "../../app/services/messages/useGetChatRooms";
import useGetChatRoomMessages from "../../app/services/messages/useGetChatRoomMessages";

const MessageArea = ({
  handleSendMessage,
  roomId,
  messageInput,
  setMessageInput,
  reloadCount,
}) => {
  const { messagesLoading, messageList } = useGetChatRoomMessages(
    roomId,
    reloadCount
  );

  const user = env?.getUser();

  return (
    <>
      {messagesLoading ? (
        <MessageAreaContainer>
          <h3
            style={{ color: "#e8e8e8", textAlign: "center" }}
            // onClick={() => console.log(user.userType)}
          >
            Updating Chat...
          </h3>
        </MessageAreaContainer>
      ) : !roomId ? (
        <MessageAreaContainer>
          <h3 style={{ color: "#e8e8e8", textAlign: "center" }}>
            No Chat Available
          </h3>
        </MessageAreaContainer>
      ) : (
        <MessageAreaContainer>
          {messageList.map((message) => {
            return (
              <MessageBubbleContainer>
                <MessageBubble
                  text={message.message}
                  isSender={message.sender === user._id}
                />
              </MessageBubbleContainer>
            );
          })}
        </MessageAreaContainer>
      )}
      <MessageInputWrapper userType={user?.userType}>
        <InputCommonWithIcon
          placeholder="Type a message"
          icon={messagesLoading ? spinner : sendMessage}
          iconMarginTop={messagesLoading ? "5px" : "9px"}
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          onClickIcon={handleSendMessage}
        />
      </MessageInputWrapper>
    </>
  );
};

export default MessageArea;

const MessageAreaContainer = styled.div`
  /* background-color: #eeb4b4; */
  position: relative;
  width: 70%;
  margin: 24px;
  border-radius: 13px;
  height: 80%;
  overflow-y: auto;

  @media only screen and (max-width: 992px) {
    width: 50%;
  }

  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

const MessageInputWrapper = styled.div`
  position: absolute;
  bottom: 0%;
  right: 6%;
  width: 60%;
  ${({ userType }) => userType !== "user" && " width: 40%;"}
  margin-bottom: 50px;

  @media only screen and (max-width: 1150px) {
    /* width: 30%;
    right: 3%; */
    width: 40%;
    ${({ userType }) => userType !== "user" && " width: 30%; right: 2%"}
  }

  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

const MessageBubbleContainer = styled.div``;
