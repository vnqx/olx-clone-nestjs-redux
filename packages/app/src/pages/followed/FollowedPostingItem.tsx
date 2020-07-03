import React from "react";
import { Posting } from "../../types";
import {
  makeStyles,
  Theme,
  createStyles,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from "@material-ui/core";
import FollowButton from "../../components/FollowButton";

interface Props {
  posting: Posting;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    details: {
      display: "flex",
      flexDirection: "column",
    },
    content: {
      flex: "1 0 auto",
    },
    cover: {
      width: 151,
    },
    controls: {
      display: "flex",
      alignItems: "center",
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    launch: {
      color: "deepskyblue",
    },
  }),
);

export default function FollowedPostingItem({
  posting,
}: Props): React.ReactElement {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.cover}
        title={posting.title}
        image={posting.photos[0]}
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography variant="h5" component="h5">
            {posting.title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            ${posting.price}
          </Typography>
          {/* <LastUpdated updatedAt={posting.updatedAt} /> */}
        </CardContent>
        <div className={classes.controls}>
          {/* <LaunchButton id={posting.id} /> */}
          <FollowButton id={posting.id} />
        </div>
      </div>
    </Card>
  );
}
