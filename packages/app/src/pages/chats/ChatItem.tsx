import React from "react";
import { Chat } from "../../interfaces";

interface Props {
  chat: Chat;
}

export default function ChatItem({ chat }: Props): React.ReactElement {
  return <div>{chat.id}</div>;
}
