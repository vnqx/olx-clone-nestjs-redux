import React from "react";
import PostingItem from "./PostingItem";
import { Grid } from "@material-ui/core";
import { RootState } from "../../store";
import { useSelector } from "react-redux";

const x = {
  id: 12313,
  price: 12123,
  title: "trewtwer",
  photos: [],
} as any;

export default function PostingList(): React.ReactElement {
  const postings = useSelector((state: RootState) => state.postings);
  postings.push(x);
  return (
    <Grid container justify="center" spacing={2}>
      {postings.map((posting) => (
        <PostingItem posting={posting} key={posting.id} />
      ))}
    </Grid>
  );
}
