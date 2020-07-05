import React from "react";
import {
  makeStyles,
  createStyles,
  ListItem,
  Avatar,
  ListItemText,
} from "@material-ui/core";
import { Message, Posting } from "../../interfaces";
import { RootState } from "../../store";
import { useSelector } from "react-redux";

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
  const { me, fullChat } = useSelector((state: RootState) => state);

  return (
    <ListItem key={message.id}>
      {/*<Avatar src={me.id !== posting.user.id && posting.photos[0]} />*/}
      <ListItemText
        className={classes.wrap}
        primary={message.content}
        // secondary={message.sentTime}
      />
    </ListItem>
  );
}
