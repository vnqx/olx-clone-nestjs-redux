import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "./components/header/SignOutButton";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import {
  Avatar,
  createStyles,
  makeStyles,
  Theme,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
} from "@material-ui/core";

console.log("ddd");
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      textDecoration: "none",
    },
  }),
);

export default function Header(): React.ReactElement {
  const classes = useStyles();
  const me = useSelector((state: RootState) => state.auth.me);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            component={Link}
            to="/"
            variant="h5"
            className={classes.title}
            color="inherit"
          >
            Clolx
          </Typography>
          <IconButton
            aria-label="create posting"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
            component={Link}
            to="/postings/create"
          >
            {/* <AddIcon fontSize="large" /> */}
            Add
          </IconButton>
          {me ? (
            <SignOutButton />
          ) : (
            <>
              {/* <Link to="auth/sign-in" component={Button}>
                Sign In
              </Link> */}
              <Button component={Link} to="auth/sign-in">
                Sign In
              </Button>
              <Button component={Link} to="auth/sign-up">
                Sign Up
              </Button>
            </>
          )}
          <Avatar />
        </Toolbar>
      </AppBar>
    </div>
  );
}
