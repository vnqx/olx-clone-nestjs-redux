import React from "react";
import SignUpForm from "./signUp/SignUpForm";
import {
  Container,
  makeStyles,
  Theme,
  Paper,
  Avatar,
  Typography,
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

export default function SignUp(): React.ReactElement {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="sm">
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <SignUpForm />
      </Paper>
    </Container>
  );
}
