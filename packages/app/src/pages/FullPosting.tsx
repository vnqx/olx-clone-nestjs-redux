import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { initPosting } from "../reducers/postingsReducer";
import {
  Container,
  Card,
  makeStyles,
  Theme,
  createStyles,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
} from "@material-ui/core";
import { RootState } from "../store";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
    actions: {
      display: "flex",
      justifyContent: "space-between",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    iconActions: {
      display: "flex",
      flexDirection: "row",
    },
    chips: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      "& > *": {
        marginRight: theme.spacing(1),
      },
    },
  }),
);

export default function FullPosting(): React.ReactElement {
  const classes = useStyles();
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initPosting(id));
  }, [dispatch, id]);

  const posting = useSelector((state: RootState) => state.postings.fullPosting);

  if (!posting) return <div>ooasodasodasodasodo</div>;

  return (
    <Container component="main" maxWidth="sm">
      <Card>
        <div className={classes.header}>
          <CardHeader title={posting.title} subheader={`$${posting.price}`} />
          <div className={classes.chips}>chip: condition, chip: category</div>
        </div>
        {posting.photos.map((url) => (
          <CardMedia
            key={url}
            className={classes.media}
            image={url}
            title={posting.title}
          />
        ))}
        <CardContent>
          <Typography variant="body1" color="textSecondary" component="p">
            {posting.description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing className={classes.actions}>
          <div className={classes.iconActions}>follow/unfollow, phone</div>
          <div>message dialog</div>
        </CardActions>
      </Card>
    </Container>
  );
}
