import React from "react";
import { useDispatch } from "react-redux";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { IconButton, makeStyles, createStyles } from "@material-ui/core";
import { movePhotoLeft, movePhotoRight } from "../../reducers/photosReducer";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

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

export default function MovePhotoButtons({ url }: Props): React.ReactElement {
  const classes = useStyles();
  const dispatch = useDispatch();

  function handleMovePhotoLeft() {
    dispatch(movePhotoLeft(url));
  }

  function handleMovePhotoRight() {
    dispatch(movePhotoRight(url));
  }

  return (
    <>
      <IconButton
        className={classes.icon}
        aria-label="move photo left"
        onClick={handleMovePhotoLeft}
        disableTouchRipple
      >
        <ArrowBackIcon />
      </IconButton>
      <IconButton
        className={classes.icon}
        aria-label="move photo right"
        onClick={handleMovePhotoRight}
        disableTouchRipple
      >
        <ArrowForwardIcon />
      </IconButton>
    </>
  );
}
