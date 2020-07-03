import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "./components/header/SignOutButton";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import {
  Avatar,
  createStyles,
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
    toolbar: {
      "& > a": {
        textDecoration: "none",
      },
    },
  }),
);

export default function Header(): React.ReactElement {
  const classes = useStyles();
  const me = useSelector((state: RootState) => state.me);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Typography
            component={Link}
            to="/"
            variant="h5"
            className={classes.title}
            color="inherit"
          >
            Clolx
          </Typography>
          <Link to="postings/create">
            <Button>New</Button>
          </Link>
          {me ? (
            <SignOutButton />
          ) : (
            <>
              <Link to="auth/sign-in">
                <Button>Sign In</Button>
              </Link>
              <Link to="auth/sign-up">
                <Button>Sign Up</Button>
              </Link>
            </>
          )}

          <Link to="account">
            <Avatar />
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}
