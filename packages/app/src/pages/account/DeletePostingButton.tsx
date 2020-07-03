import React from "react";
import { Delete } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { deleteMyPosting } from "../../reducers/myPostingsReducer";

interface Props {
  postingId: string;
}

export default function DeletePostingButton({
  postingId,
}: Props): React.ReactElement {
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(deleteMyPosting(postingId));
  }

  return (
    <IconButton aria-label="delete posting" onClick={handleClick}>
      <Delete fontSize="large" />
    </IconButton>
  );
}
