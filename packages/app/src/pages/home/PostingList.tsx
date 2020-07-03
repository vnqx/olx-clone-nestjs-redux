import React from "react";
import PostingItem from "./PostingItem";
import { Grid } from "@material-ui/core";
import { Posting } from "../../types";

interface Props {
  postings: Posting[];
}

export default function PostingList({ postings }: Props): React.ReactElement {
  return (
    <Grid container justify="center" spacing={2}>
      {postings.map((posting) => (
        <PostingItem posting={posting} key={posting.id} />
      ))}
    </Grid>
  );
}
