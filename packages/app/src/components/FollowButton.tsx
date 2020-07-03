import React from "react";
import { IconButton, makeStyles, createStyles, Theme } from "@material-ui/core";
import { StarBorder, Star } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { followPosting } from "../reducers/followedPostingsReducer";

interface Props {
  id: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      color: "gold",
      marginRight: theme.spacing(1),
    },
  }),
);

export default function FollowButton({ id }: Props): React.ReactElement {
  const classes = useStyles();
  const dispatch = useDispatch();
  const followedPostings = useSelector(
    (state: RootState) => state.followedPostings,
  );
  const followedPostingIds = followedPostings.map((posting) => posting.id);
  const isFollowed = followedPostingIds.includes(id);

  function handleClick() {
    dispatch(followPosting(id));
  }

  return (
    <IconButton
      aria-label={`${isFollowed && "un"}follow the posting`}
      className={classes.icon}
      onClick={handleClick}
    >
      {isFollowed ? <Star fontSize="large" /> : <StarBorder fontSize="large" />}
    </IconButton>
  );
}
