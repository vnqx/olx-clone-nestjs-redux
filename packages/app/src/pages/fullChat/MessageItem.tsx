import React from "react";
import {
  makeStyles,
  createStyles,
  ListItem,
  Avatar,
  ListItemText,
} from "@material-ui/core";
import { Message } from "../../interfaces";

interface Props {
  message: Message;
}

const useStyles = makeStyles(() =>
  createStyles({
    wrap: {
      wordWrap: "break-word",
    },
  }),
);

export default function MessageItem({ message }: Props): React.ReactElement {
  const classes = useStyles();

  return (
    <ListItem key={message.id}>
      <Avatar />
      <ListItemText
        className={classes.wrap}
        primary={message.content}
        // secondary={message.sentTime}
      />
    </ListItem>
  );
}
