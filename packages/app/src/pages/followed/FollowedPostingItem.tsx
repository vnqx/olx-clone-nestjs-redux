import React from "react";
import { Posting } from "../../types";

interface Props {
  posting: Posting;
}

export default function FollowedPostingItem({
  posting,
}: Props): React.ReactElement {
  return <div>{posting.title}</div>;
}
