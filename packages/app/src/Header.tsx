import React from "react";
import { Link, useLocation } from "react-router-dom";
import SignOutButton from "./components/header/SignOutButton";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./store";
import {
  Avatar,
  createStyles,
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  Theme,
} from "@material-ui/core";
import NavLink from "./components/header/NavLink";
import { resetFilter } from "./reducers/filterReducer";
import Search from "./pages/home/Search";

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
  const dispatch = useDispatch();
  const classes = useStyles();
  const me = useSelector((state: RootState) => state.me);
  const location = useLocation();

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
            onClick={() => dispatch(resetFilter())}
          >
            Clolx
          </Typography>

          {me ? (
            <>
              <NavLink to="postings/create" text="New" />
              <NavLink to="account/followed" text="Followed" />
              <NavLink to="chats" text="chats" />
              <SignOutButton />
            </>
          ) : (
            <>
              <NavLink to="auth/sign-in" text="Sign In" />
              <NavLink to="auth/sign-up" text="Sign Up" />
            </>
          )}

          <Link to="account/postings">
            <Avatar />
          </Link>
        </Toolbar>
      </AppBar>
      {location.pathname === "/" && <Search />}
    </div>
  );
}
