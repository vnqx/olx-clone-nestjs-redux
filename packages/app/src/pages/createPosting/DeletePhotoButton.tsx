import React from "react";
import { IconButton } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch } from "react-redux";
import { deletePhoto } from "../../reducers/photosReducer";

interface Props {
  url: string;
}

const useStyles = makeStyles(() =>
  createStyles({
    icon: {
      color: "rgba(255, 255, 255, 0.54)",
    },
  }),
);

export default function DeletePhotoButton({ url }: Props): React.ReactElement {
  const classes = useStyles();
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(deletePhoto(url));
  }

  return (
    <IconButton
      className={classes.icon}
      aria-label="delete photo"
      onClick={handleClick}
    >
      <DeleteIcon />
    </IconButton>
  );
}
