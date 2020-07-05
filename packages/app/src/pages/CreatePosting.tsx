import React from "react";
import CreatePostingForm from "./createPosting/CreatePostingForm";
import {
  Typography,
  makeStyles,
  Theme,
  createStyles,
  Container,
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  }),
);

export default function CreatePosting(): React.ReactElement {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="sm">
      <div className={classes.paper}>
        <Typography component="h1" variant="h4">
          Create new posting
        </Typography>
        <CreatePostingForm />
      </div>
    </Container>
  );
}
