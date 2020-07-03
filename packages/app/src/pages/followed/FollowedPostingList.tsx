import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import CustomPostingItem from "../../components/CustomPostingItem";
import FollowButton from "../../components/FollowButton";

export default function FollowedPostingList(): React.ReactElement {
  const followedPostings = useSelector(
    (state: RootState) => state.followedPostings,
  );
  return (
    <div>
      {followedPostings.map((posting) => (
        <CustomPostingItem
          posting={posting}
          key={posting.id}
          controls={<FollowButton id={posting.id} />}
        />
      ))}
    </div>
  );
}
