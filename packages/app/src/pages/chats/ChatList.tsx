import React from "react";
import ChatItem from "./ChatItem";
import { RootState } from "../../store";
import { useSelector } from "react-redux";

export default function ChatList(): React.ReactElement {
  const chats = useSelector((state: RootState) => state.chats);

  return (
    <div>
      {chats.map((chat) => (
        <ChatItem chat={chat} key={chat.id} />
      ))}
    </div>
  );
}
