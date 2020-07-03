import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import MyPostingList from "./MyPostingList";
import { loadMyPostings } from "../../reducers/myPostingsReducer";
import { Container } from "@material-ui/core";

export default function MyPostings(): React.ReactElement {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadMyPostings());
  }, [dispatch]);

  const myPostings = useSelector((state: RootState) => state.myPostings);

  return (
    <Container maxWidth="sm" component="main">
      <MyPostingList postings={myPostings} />
    </Container>
  );
}
