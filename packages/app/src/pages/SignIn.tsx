import React from "react";
import SignInForm from "./signIn/SignInForm";
import {
  Container,
  Typography,
  Paper,
  Avatar,
  makeStyles,
  Theme,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
}));

export default function SignIn(): React.ReactElement {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="sm">
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <SignInForm />
      </Paper>
    </Container>
  );
}
