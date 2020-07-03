import React from "react";
import MyPostingItem from "./MyPostingItem";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export default function MyPostingList(): React.ReactElement {
  const postings = useSelector((state: RootState) => state.myPostings);

  return (
    <div>
      {postings.map((posting) => (
        <MyPostingItem key={posting.id} posting={posting} />
      ))}
    </div>
  );
}
