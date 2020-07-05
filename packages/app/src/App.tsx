import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";
import { useDispatch, useSelector } from "react-redux";
import { loadMe } from "./reducers/meReducer";
import FullPosting from "./pages/FullPosting";
import Home from "./pages/Home";
import CreatePosting from "./pages/CreatePosting";
import { loadFollowedPostings } from "./reducers/followedPostingsReducer";
import { RootState } from "./store";
import Footer from "./components/Footer";
import Followed from "./pages/Followed";
import MyPostings from "./pages/account/MyPostings";
import EditPosting from "./pages/EditPosting";
import Chats from "./pages/Chats";
import FullChat from "./pages/FullChat";
import { Container, createStyles, makeStyles, Theme } from "@material-ui/core";
import { loadMyPostings } from "./reducers/myPostingsReducer";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      paddingTop: theme.spacing(4),
    },
  }),
);

export default function App(): React.ReactElement | null {
  const dispatch = useDispatch();
  const me = useSelector((state: RootState) => state.me);
  const classes = useStyles();

  useEffect(() => {
    if (me) {
      dispatch(loadFollowedPostings());
      dispatch(loadMyPostings());
    } else {
      dispatch(loadMe());
    }
  }, [dispatch, me]);

  return (
    <>
      <Header />
      <Container maxWidth="md" component="main" className={classes.container}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="auth">
            <Route path="sign-in" element={<SignIn />} />
            <Route path="sign-up" element={<SignUp />} />
          </Route>
          <Route path="postings/:id" element={<FullPosting />} />
          {me ? (
            <>
              <Route path="postings">
                <Route path="create" element={<CreatePosting />} />
                <Route path=":id/edit" element={<EditPosting />} />
                <Route path=":id/chat" element={<FullChat />} />
              </Route>
              <Route path="account">
                <Route path="followed" element={<Followed />} />
                <Route path="postings" element={<MyPostings />} />
              </Route>

              <Route path="chats" element={<Chats />} />
            </>
          ) : (
            <Route path="*" element={<SignIn />} />
          )}
        </Routes>
      </Container>
      <Footer />
    </>
  );
}
