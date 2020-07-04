import React from "react";
import MessageItem from "./MessageItem";
import { Message } from "../../interfaces";
import { List } from "@material-ui/core";

interface Props {
  messages: Message[];
}

export default function MessageList({ messages }: Props): React.ReactElement {
  return (
    <List>
      {messages.map((message) => (
        <MessageItem message={message} key={message.id} />
      ))}
    </List>
  );
}
