import React from "react";
import FollowedPostingList from "./FollowedPostingList";
import { Container } from "@material-ui/core";

export default function FollowedPostings(): React.ReactElement {
  return (
    <Container maxWidth="sm" component="main">
      <FollowedPostingList />
    </Container>
  );
}
