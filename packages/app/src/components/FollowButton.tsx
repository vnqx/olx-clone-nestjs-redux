import React from "react";
import { IconButton, makeStyles, createStyles, Theme } from "@material-ui/core";
import { StarBorder, Star } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { followPosting } from "../reducers/followedPostingsReducer";
import { useNavigate } from "react-router-dom";

interface Props {
  id: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      color: "gold",
      margin: theme.spacing(0, 1),
    },
  }),
);

export default function FollowButton({ id }: Props): React.ReactElement {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { followedPostings, me } = useSelector((state: RootState) => state);
  const followedPostingIds = followedPostings.map((posting) => posting.id);
  const isFollowed = followedPostingIds.includes(id);

  function handleClick() {
    if (!me) {
      navigate("/auth/sign-in");
    } else {
      dispatch(followPosting(id));
    }
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
