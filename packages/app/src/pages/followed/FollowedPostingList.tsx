import React from "react";
import FollowedPostingItem from "./FollowedPostingItem";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export default function FollowedPostingList(): React.ReactElement {
  const followedPostings = useSelector(
    (state: RootState) => state.followedPostings,
  );
  return (
    <div>
      {followedPostings.map((posting) => (
        <FollowedPostingItem posting={posting} key={posting.id} />
      ))}
    </div>
  );
}
