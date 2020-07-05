import React from "react";
import {
  makeStyles,
  createStyles,
  ListItem,
  Avatar,
  ListItemText,
  Typography,
  ListItemAvatar,
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

  return (
    <ListItem key={message.id}>
      <ListItemAvatar>
        <Avatar />
      </ListItemAvatar>
      <ListItemText
        className={classes.wrap}
        primary={
          <Typography variant="body1">{`${message.user.firstName} ${message.user.lastName}`}</Typography>
        }
        secondary={
          <Typography variant="subtitle1">{message.content}</Typography>
        }
      />
    </ListItem>
  );
}
