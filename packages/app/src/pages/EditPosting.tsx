import React, { useEffect } from "react";
import {
  Typography,
  makeStyles,
  Theme,
  createStyles,
  Container,
} from "@material-ui/core";
import { useParams } from "react-router-dom";
import { loadFullPosting } from "../reducers/fullPostingReducer";
import { useDispatch, useSelector } from "react-redux";
import EditPostingForm from "./editPosting/EditPostingForm";
import { RootState } from "../store";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  }),
);

export default function EditPosting(): React.ReactElement {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id } = useParams();

  const posting = useSelector((state: RootState) => state.fullPosting);

  useEffect(() => {
    dispatch(loadFullPosting(id));
  }, [dispatch, id]);

  if (!posting) return <div>loading...</div>;

  return (
    <Container component="main" maxWidth="sm">
      <div className={classes.paper}>
        <Typography component="h1" variant="h4">
          Edit the posting
        </Typography>
        <EditPostingForm />
      </div>
    </Container>
  );
}
