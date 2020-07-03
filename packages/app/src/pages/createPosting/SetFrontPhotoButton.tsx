import React from "react";
import { useDispatch } from "react-redux";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { IconButton, makeStyles, createStyles } from "@material-ui/core";
import { movePhoto } from "../../reducers/photosReducer";

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

export default function MovePhotoButton({ url }: Props): React.ReactElement {
  const classes = useStyles();
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(movePhoto(url));
  }

  return (
    <IconButton
      className={classes.icon}
      aria-label="move photo"
      onClick={handleClick}
    >
      <ArrowBackIcon />
    </IconButton>
  );
}
