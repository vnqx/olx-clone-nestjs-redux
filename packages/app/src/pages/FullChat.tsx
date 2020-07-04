import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { loadFullChat } from "../reducers/fullChatReducer";
import MessageList from "./fullChat/MessageList";
import CreateMessageForm from "./fullChat/CreateMessageForm";

export default function FullChat(): React.ReactElement {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadFullChat(id));
  }, [dispatch, id]);

  const chat = useSelector((state: RootState) => state.fullChat);

  if (!chat) return <div>loading...</div>;

  return (
    <div>
      <MessageList messages={chat.messages} />
      <CreateMessageForm chatId={chat.id} />
    </div>
  );
}
