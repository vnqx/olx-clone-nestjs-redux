import React from "react";
import { ChatPreview } from "../../interfaces";
import {
  Avatar,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Typography,
  Divider,
  createStyles,
  Theme,
} from "@material-ui/core";
import { getDaysAgoString } from "../../utils/getDaysAgoString";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

interface Props {
  chat: ChatPreview;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    link: {
      textDecoration: "none",
      color: "inherit",
    },
  }),
);

export default function ChatItem({ chat }: Props): React.ReactElement {
  const classes = useStyles();
  return (
    <Link to={`/postings/${chat.posting.id}/chat`} className={classes.link}>
      <Divider />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar src={chat.posting.photos[0]} />
        </ListItemAvatar>
        <ListItemText
          primary={<Typography variant="h6">{chat.posting.title}</Typography>}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                // className={classes.inline}
                color="textPrimary"
              >
                {chat.messages[0].content}
              </Typography>
              {` — ${getDaysAgoString(chat.messages[0].sentTime)}`}
            </React.Fragment>
          }
        />
      </ListItem>
    </Link>
  );
}
