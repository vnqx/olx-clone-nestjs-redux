import React from "react";
import MyPostingItem from "./MyPostingItem";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Typography } from "@material-ui/core";

export default function MyPostingList(): React.ReactElement {
  const postings = useSelector((state: RootState) => state.myPostings);
  if (postings.length === 0)
    return (
      <Typography variant="h3" align="center">
        Add your first posting so that it will show up here
      </Typography>
    );

  return (
    <div>
      {postings.map((posting) => (
        <MyPostingItem key={posting.id} posting={posting} />
      ))}
    </div>
  );
}
