import React from "react";
import { Posting } from "../../types";
import {
  Grid,
  Card,
  CardMedia,
  CardHeader,
  makeStyles,
  createStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { RootState } from "../../store";
import { useSelector } from "react-redux";

interface Props {
  posting: Posting;
}

const useStyles = makeStyles(() =>
  createStyles({
    action: {
      display: "flex",
    },
    media: {
      height: 322,
      width: 322,
    },
    card: { maxWidth: 322 },
    header: { maxWidth: 322, display: "flex" },
    item: {
      display: "flex",
      justifyContent: "center",
    },
    bottom: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
  }),
);

export default function PostingItem({ posting }: Props): React.ReactElement {
  const classes = useStyles();
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card className={classes.card}>
        <Link to={`/postings/${posting.id}`}>
          <CardMedia
            className={classes.media}
            image={posting.photos[0] || "https://i.stack.imgur.com/y9DpT.jpg"}
            title={posting.title}
          />
        </Link>
        <div className={classes.bottom}>
          <div className={classes.header}>
            <CardHeader title={`$${posting.price}`} subheader={posting.title} />
          </div>
          <div className={classes.action}>action</div>
        </div>
      </Card>
    </Grid>
  );
}
