import React, { useState, useEffect } from "react";
import styled from "styled-components";
import env from "../../env";
import { http } from "../../app/services/axios-https";
import InputCommonWithIcon from "../inputField/InputCommonWithIcon";
import MessageBubble from "./MessageBubble";
import sendMessage from "../../assets/common/send-message-icon.svg";
import spinner from "../../assets/common/message-spinner.svg";
import Avatar from "react-avatar";
import useGetChatRoomMessages from "../../app/services/messages/useGetChatRoomMessages";

const MessageAreaMobile = ({
  handleSendMessage,
  roomId,
  messageInput,
  setMessageInput,
  reloadCount,
  senderDetails,
  setShowMobileMessage,
}) => {
  const { messagesLoading, messageList } = useGetChatRoomMessages(
    roomId,
    reloadCount
  );

  const user = env?.getUser();

  // useEffect(() => {
  //   console.log(user?.userType);
  // }, []);

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
          <SenderDetails>
            <div onClick={() => setShowMobileMessage(false)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M12.5 5C12.5 5 7.50001 8.68242 7.5 10C7.49999 11.3177 12.5 15 12.5 15"
                  stroke="#721F4B"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <Avatar name={senderDetails} round color="#721F4B" size={50} />
            <p>{senderDetails}</p>
          </SenderDetails>
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

export default MessageAreaMobile;

const MessageAreaContainer = styled.div`
  /* background-color: #eeb4b4; */
  display: none;
  position: relative;
  width: 70%;
  margin: 24px;
  border-radius: 13px;
  height: 80%;
  overflow-y: auto;

  @media only screen and (max-width: 1150px) {
    width: 50%;
  }

  @media only screen and (max-width: 768px) {
    display: block;
    width: 90%;
  }
`;

const MessageInputWrapper = styled.div`
  position: absolute;
  bottom: 0%;
  right: 6%;
  width: 60%;
  ${({ userType }) => userType !== "user" && " width: 40%;"}
  margin-bottom: 50px;

  @media only screen and (max-width: 768px) {
    width: 90%;
  }
`;

const MessageBubbleContainer = styled.div``;

const SenderDetails = styled.div`
  background-color: #f8f4f6;
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 16px;
  margin-bottom: 24px;

  p {
    color: #721f4b;
    font-size: 12px;
    font-weight: 400;
    letter-spacing: 0.012px;
  }
`;
