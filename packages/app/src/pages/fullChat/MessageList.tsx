import React from "react";
import MessageItem from "./MessageItem";
import { Message } from "../../interfaces";
import { List, Paper } from "@material-ui/core";

interface Props {
  messages: Message[];
}

export default function MessageList({ messages }: Props): React.ReactElement {
  return (
    <Paper>
      {messages.map((message) => (
        <MessageItem message={message} key={message.id} />
      ))}
    </Paper>
  );
}
