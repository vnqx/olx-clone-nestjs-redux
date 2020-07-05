import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
  Button,
  Chip,
} from "@material-ui/core";
import { RootState } from "../store";
import { loadFullPosting } from "../reducers/fullPostingReducer";
import FollowButton from "../components/FollowButton";
import PhonePopover from "./fullPosting/PhonePopover";
import EditPostingButton from "./account/EditPostingButton";
import DeletePostingButton from "./account/DeletePostingButton";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    link: {
      textDecoration: "none",
      color: "inherit",
    },
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
    message: {
      marginRight: theme.spacing(1),
    },
  }),
);

export default function FullPosting(): React.ReactElement {
  const classes = useStyles();
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loadFullPosting(id));
  }, [dispatch, id]);

  const { myPostings, fullPosting: posting } = useSelector(
    (state: RootState) => state,
  );

  // in case there's loaded some posting in the store already
  // not to display the old one
  if (posting?.id !== id) return <div>loading...</div>;

  const isMyPosting = myPostings
    .map((posting) => posting.id)
    .includes(posting.id);

  return (
    <Container component="main" maxWidth="sm">
      <Card>
        <div className={classes.header}>
          <CardHeader title={posting.title} subheader={`$${posting.price}`} />
          <div className={classes.chips}>
            <Chip color="primary" label={posting.condition} />
            <Chip label={posting.city} />
          </div>
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
          <div className={classes.iconActions}>
            <FollowButton id={posting.id} />
            <PhonePopover phone={posting.phone} />
          </div>
          <div className={classes.message}>
            {!isMyPosting ? (
              <Button
                variant="outlined"
                color="primary"
                onClick={() => navigate(`/postings/${posting.id}/chat`)}
              >
                Send message
              </Button>
            ) : (
              <>
                <EditPostingButton postingId={posting.id} />
                <DeletePostingButton postingId={posting.id} />
              </>
            )}
          </div>
        </CardActions>
      </Card>
    </Container>
  );
}
