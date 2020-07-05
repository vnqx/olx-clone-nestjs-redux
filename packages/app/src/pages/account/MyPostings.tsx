import React from "react";
import MyPostingList from "./MyPostingList";
import { Container } from "@material-ui/core";

export default function MyPostings(): React.ReactElement {
  return (
    <Container maxWidth="sm" component="main">
      <MyPostingList />
    </Container>
  );
}
