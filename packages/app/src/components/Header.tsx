import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import {
  Avatar,
  createStyles,
  makeStyles,
  AppBar,
  Toolbar,
  Theme,
  IconButton,
} from "@material-ui/core";
import { resetFilter } from "../reducers/filterReducer";
import Search from "../pages/home/Search";
import HomeIcon from "@material-ui/icons/Home";
import AddIcon from "@material-ui/icons/Add";
import StarIcon from "@material-ui/icons/Star";
import ChatIcon from "@material-ui/icons/Chat";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { signOut } from "../reducers/meReducer";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import NavLink from "./NavLink";

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
      display: "flex",
      justifyContent: "center",
    },
  }),
);

export default function Header(): React.ReactElement {
  const dispatch = useDispatch();
  const classes = useStyles();
  const navigate = useNavigate();
  const me = useSelector((state: RootState) => state.me);
  const location = useLocation();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="home"
            component={Link}
            to="/"
            onClick={() => dispatch(resetFilter())}
          >
            <HomeIcon fontSize="large" />
          </IconButton>

          {me ? (
            <>
              <IconButton
                color="inherit"
                aria-label="new posting"
                component={Link}
                to="postings/create"
              >
                <AddIcon fontSize="large" />
              </IconButton>
              <IconButton
                color="inherit"
                aria-label="followed postings"
                component={Link}
                to="account/followed"
              >
                <StarIcon fontSize="large" />
              </IconButton>

              <IconButton
                color="inherit"
                aria-label="chats"
                component={Link}
                to="chats"
              >
                <ChatIcon fontSize="large" />
              </IconButton>
              <IconButton
                color="inherit"
                aria-label="account"
                component={Link}
                to="account/postings"
              >
                <AccountCircleIcon fontSize="large" />
              </IconButton>
              <IconButton
                color="inherit"
                aria-label="sign out"
                onClick={() => dispatch(signOut(navigate))}
              >
                <ExitToAppIcon fontSize="large" />
              </IconButton>
            </>
          ) : (
            <>
              <NavLink to="auth/sign-in" text="Sign In" />
              <NavLink to="auth/sign-up" text="Sign Up" />
            </>
          )}
        </Toolbar>
      </AppBar>
      {location.pathname === "/" && <Search />}
    </div>
  );
}
