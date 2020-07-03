import React, { useEffect } from "react";
import { Container } from "@material-ui/core";
import ChatList from "./chats/ChatList";
import { loadChats } from "../reducers/chatsReducer";
import { useDispatch } from "react-redux";

export default function Chats(): React.ReactElement {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadChats());
  }, [dispatch]);

  return (
    <Container component="main" maxWidth="sm">
      <ChatList />
    </Container>
  );
}
