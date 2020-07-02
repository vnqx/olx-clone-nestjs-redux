import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initPostings } from "../../reducers/postingsReducer";
import PostingList from "./PostingList";
import { Container } from "@material-ui/core";

export default function Postings(): React.ReactElement {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initPostings());
  }, [dispatch]);

  return (
    <Container maxWidth="md">
      <PostingList />
    </Container>
  );
}
