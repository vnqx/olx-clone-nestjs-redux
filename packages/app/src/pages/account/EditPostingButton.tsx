import React from "react";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@material-ui/core";
import { Edit } from "@material-ui/icons";

interface Props {
  postingId: string;
}

export default function EditPostingButton({
  postingId,
}: Props): React.ReactElement {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/postings/${postingId}/edit`);
  }

  return (
    <IconButton aria-label="edit posting" onClick={handleClick}>
      <Edit fontSize="large" />
    </IconButton>
  );
}
