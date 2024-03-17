import React from "react";
import styled from "styled-components";
import Avatar from "react-avatar";

const ChatRoom = ({ name, handleChatroomClick, active, chatRoomId }) => {
  return (
    <ChatRoomContainer onClick={handleChatroomClick} active={active}>
      <div className="avatar-message-wrapper">
        <Avatar name={name} round color="#721F4B" size={75} />

        <div className="message-summary">
          <p className="name">{name}</p>
          <p className="message-excerpt">Room id: {chatRoomId}</p>
        </div>
      </div>

      <div className="time-container">
        <p className="time">2.22pm</p>
        <p className="unread-message-count">1</p>
      </div>
    </ChatRoomContainer>
  );
};

export default ChatRoom;

const ChatRoomContainer = styled.div`
  padding: 24px 20px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #192861;
  border-radius: 13px;
  /* background-color: #fff; */
  ${({ active }) => !active && "background-color: #f8f4f6"}
  box-shadow: 0px 8px 50px -4px rgba(16, 24, 40, 0.01),
    0px 20px 50px -4px rgba(16, 24, 40, 0.03),
    1px -4px 50px 4px rgba(16, 24, 40, 0.01),
    0px -10px 50px 4px rgba(0, 0, 0, 0.03);

  .avatar-message-wrapper {
    display: flex;
    gap: 12px;

    .message-summary {
      display: flex;
      flex-direction: column;
      justify-content: center;
      font-weight: 400;
      letter-spacing: 0.016px;

      .name {
        font-size: 16px;
        margin-bottom: 8px;
      }
      .message-excerpt {
        font-size: 12px;
      }
    }
  }

  .time-container {
    display: flex;
    flex-direction: column;
    align-items: end;

    .time {
      font-size: 12px;
      font-weight: 400;
      letter-spacing: 0.016px;
      margin-bottom: 14px;
    }

    .unread-message-count {
      font-size: 8px;
      font-weight: 400;
      letter-spacing: 0.008px;
      background-color: #f8f4f6;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #192861;
    }
  }

  &:hover {
    background-color: #f8f4f6;
    color: #721f4b;

    .unread-message-count {
      background-color: #fff;
      color: #721f4b;
    }
  }
`;
