import React from "react";
import styled from "styled-components";

const MessageBubble = ({ text, isSender }) => {
  return (
    <MessageBubbleContainer isSender={isSender}>
      <MessageBubbleStyle>
        <p>{text}</p>
      </MessageBubbleStyle>
    </MessageBubbleContainer>
  );
};

export default MessageBubble;

const MessageBubbleContainer = styled.div`
  display: flex;
  ${({ isSender }) =>
    isSender ? "justify-content: end" : "justify-content: start"}
`;

const MessageBubbleStyle = styled.div`
  border-radius: 10px;
  background: #f8f9fa;
  padding: 8px 16px;
  width: fit-content;
  max-width: 55%;
  margin-bottom: 24px;

  p {
    color: #192861;
    font-size: 16px;
    font-weight: 400;
    letter-spacing: 0.016px;
    line-height: 28px;
  }
`;
