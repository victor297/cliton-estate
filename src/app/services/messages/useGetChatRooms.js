import { useState, useEffect } from "react";

import env from "../../../env";
import { http } from "../axios-https";
import { toast } from "react-hot-toast";

const useGetChatRooms = () => {
  const [roomsLoading, setRoomsLoading] = useState(false);
  const [chatRoomList, setChatRoomList] = useState([]);
  const [initialId, setInitialId] = useState("");

  const getChatRooms = () => {
    setRoomsLoading(true);
    http
      .get(`${env.clinton_homes_base_url}/user/get-chat-rooms`)
      .then((response) => {
        // console.log(response.data.data);
        setChatRoomList([...response.data.data].reverse());
        setInitialId(response.data.data[response.data.data.length - 1]?._id); //last item is now first item
        setRoomsLoading(false);
      })
      .catch((error) => {
        toast.error(error);

        // console.log(error);
      });
  };

  useEffect(() => {
    getChatRooms();
  }, []);

  return { roomsLoading, chatRoomList, initialId };
};

export default useGetChatRooms;
