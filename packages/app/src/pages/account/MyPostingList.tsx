import React from "react";
import { Posting } from "../../types";
import MyPostingItem from "./MyPostingItem";

interface Props {
  postings: Posting[];
}

export default function MyPostingList({ postings }: Props): React.ReactElement {
  return (
    <div>
      {postings.map((posting) => (
        <MyPostingItem key={posting.id} posting={posting} />
      ))}
    </div>
  );
}
