import { useState, useEffect } from "react";

import useGetChatRooms from "./useGetChatRooms";

import env from "../../../env";
import { http } from "../axios-https";
import { toast } from "react-hot-toast";

const useGetChatRoomMessages = (chatRoomId, reloadProp) => {
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [messageList, setMessageList] = useState([]);

  const getChatRoomMessages = () => {
    if (chatRoomId) {
      setMessagesLoading(true);
      http
        .get(`${env.clinton_homes_base_url}/user/get-messages/${chatRoomId}`)
        .then((response) => {
          // console.log(response.data.data);
          setMessageList([...response.data.data]);
          setMessagesLoading(false);
        })
        .catch((error) => {
          // console.log(error);
          toast.error(error);
        });
    }
  };

  useEffect(() => {
    getChatRoomMessages();
  }, [chatRoomId]);

  useEffect(() => {
    getChatRoomMessages();
  }, [reloadProp]);

  return { messagesLoading, messageList };
};

export default useGetChatRoomMessages;
