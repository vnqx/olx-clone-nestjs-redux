import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadPostings } from "../../reducers/postingsReducer";
import PostingList from "./PostingList";
import { Container } from "@material-ui/core";
import { RootState } from "../../store";

export default function Postings(): React.ReactElement {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadPostings());
  }, [dispatch]);

  const postings = useSelector((state: RootState) => state.postings);

  return (
    <Container maxWidth="md">
      <PostingList postings={postings} />
    </Container>
  );
}
