import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import MyPostingList from "./MyPostingList";
import { loadMyPostings } from "../../reducers/myPostingsReducer";
import { Container } from "@material-ui/core";

export default function MyPostings(): React.ReactElement {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadMyPostings());
  }, [dispatch]);

  return (
    <Container maxWidth="sm" component="main">
      <MyPostingList />
    </Container>
  );
}
