import React from "react";
import ChatItem from "./ChatItem";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { Paper, Typography } from "@material-ui/core";

export default function ChatList(): React.ReactElement {
  const chats = useSelector((state: RootState) => state.chats);

  if (chats.length === 0)
    return (
      <Typography variant="h3" align="center">
        Send your first message for the chats to appear
      </Typography>
    );

  return (
    <Paper>
      {chats.map((chat) => (
        <ChatItem chat={chat} key={chat.id} />
      ))}
    </Paper>
  );
}
