import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { loadFullChat } from "../reducers/fullChatReducer";
import MessageList from "./fullChat/MessageList";
import CreateMessageForm from "./fullChat/CreateMessageForm";
import {
  Container,
  createStyles,
  makeStyles,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles(() =>
  createStyles({
    link: {
      textDecoration: "none",
      color: "inherit",
      fontWeight: "bold",
    },
  }),
);

export default function FullChat(): React.ReactElement {
  const { id } = useParams();
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(loadFullChat(id));
  }, [dispatch, id]);

  const chat = useSelector((state: RootState) => state.fullChat);
  if (!chat) return <div>loading...</div>;

  return (
    <Container maxWidth="sm" component="main">
      <Link to={`/postings/${chat.posting.id}`} className={classes.link}>
        <Typography variant="h2" align="center">
          {chat.posting.title}
        </Typography>
      </Link>
      <MessageList messages={chat.messages} />
      <CreateMessageForm chatId={chat.id} />
    </Container>
  );
}
