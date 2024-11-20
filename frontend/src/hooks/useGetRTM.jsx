import { setMessages } from "@/redux/chatSlice";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetRTM = () => {
  const { socket } = useSelector((store) => store.socketio);
  const { messages } = useSelector((store) => store.chat);
  const dispatch = useDispatch();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      dispatch(setMessages([...messages, newMessage]));
    });
    return () => {
      socket?.off("newMessage");
    };
  }, [messages, setMessages]);
};

export default useGetRTM;
