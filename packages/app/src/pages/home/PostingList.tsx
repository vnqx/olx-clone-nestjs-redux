import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import PostingItem from "./PostingItem";
import { Grid } from "@material-ui/core";

export default function PostingList(): React.ReactElement {
  const postings = useSelector((state: RootState) => state.postings.all);

  return (
    <Grid container justify="center" spacing={2}>
      {postings.map((posting) => (
        <PostingItem posting={posting} key={posting.id} />
      ))}
    </Grid>
  );
}
