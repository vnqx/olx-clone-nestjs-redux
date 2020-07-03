import React from "react";
import PostingItem from "./PostingItem";
import { Grid } from "@material-ui/core";
import { RootState } from "../../store";
import { useSelector } from "react-redux";

export default function PostingList(): React.ReactElement {
  const postings = useSelector((state: RootState) => state.postings);
  return (
    <Grid container justify="center" spacing={2}>
      {postings.map((posting) => (
        <PostingItem posting={posting} key={posting.id} />
      ))}
    </Grid>
  );
}
