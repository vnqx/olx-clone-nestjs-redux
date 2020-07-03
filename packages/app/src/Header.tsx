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
  Theme,
} from "@material-ui/core";
import NavLink from "./components/header/NavLink";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
    toolbar: {
      "& > *": {
        textDecoration: "none",
        margin: theme.spacing(0, 1),
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

          {me ? (
            <>
              <NavLink to="postings/create" text="New" />
              <NavLink to="account/followed" text="Followed" />
              <SignOutButton />
            </>
          ) : (
            <>
              <NavLink to="auth/sign-in" text="Sign In" />
              <NavLink to="auth/sign-up" text="Sign Up" />
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
