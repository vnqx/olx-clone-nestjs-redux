import React from "react";
import ChatItem from "./ChatItem";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { createStyles, List, Paper, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: "36ch",
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: "inline",
    },
  }),
);

export default function ChatList(): React.ReactElement {
  const classes = useStyles();
  const chats = useSelector((state: RootState) => state.chats);

  return (
    <Paper>
      {chats.map((chat) => (
        <ChatItem chat={chat} key={chat.id} />
      ))}
    </Paper>
  );
}
