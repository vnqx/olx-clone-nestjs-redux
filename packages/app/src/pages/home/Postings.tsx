import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadPostings } from "../../reducers/postingsReducer";
import PostingList from "./PostingList";
import { Container } from "@material-ui/core";
import { RootState } from "../../store";

export default function Postings(): React.ReactElement {
  const dispatch = useDispatch();
  const filter = useSelector((state: RootState) => state.filter);

  useEffect(() => {
    dispatch(loadPostings(filter));
  }, [dispatch, filter]);

  return (
    <Container maxWidth="md">
      <PostingList />
    </Container>
  );
}
