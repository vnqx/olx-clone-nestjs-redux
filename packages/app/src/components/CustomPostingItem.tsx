import React from "react";
import {
  makeStyles,
  Theme,
  createStyles,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from "@material-ui/core";
import { Posting } from "../types";
import { getDaysElapsed } from "../utils/getDaysElapsed";
import { Link, useNavigate } from "react-router-dom";

interface Props {
  posting: Posting;
  controls: React.ReactElement;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    link: {
      fontWeight: 600,
      textDecoration: "none",
      color: "inherit",
      "&:visited": {
        color: "inherit",
      },
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

export default function CustomPostingItem({
  posting,
  controls,
}: Props): React.ReactElement {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.cover}
        title={posting.title}
        image={posting.photos[0]}
        onClick={() => navigate(`/postings/${posting.id}`)}
      />

      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography variant="h5" component="h5">
            <Link className={classes.link} to={`/postings/${posting.id}`}>
              {posting.title}
            </Link>
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            ${posting.price}
          </Typography>
          <Typography variant="body2">
            Updated{" "}
            {getDaysElapsed(posting.updatedAt) > 1
              ? `${getDaysElapsed(posting.updatedAt)} days ago`
              : "today"}
          </Typography>
        </CardContent>
        <div className={classes.controls}>{controls}</div>
      </div>
    </Card>
  );
}
