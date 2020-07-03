import React from "react";
import CustomPostingItem from "../../components/CustomPostingItem";
import DeletePostingButton from "./DeletePostingButton";
import { Posting } from "../../types";
import EditPostingButton from "./EditPostingButton";

interface Props {
  posting: Posting;
}

export default function MyPostingItem({ posting }: Props): React.ReactElement {
  return (
    <CustomPostingItem
      posting={posting}
      key={posting.id}
      controls={
        <>
          <EditPostingButton postingId={posting.id} />
          <DeletePostingButton postingId={posting.id} />
        </>
      }
    />
  );
}
