import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Header from "./Header";
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

export default function App(): React.ReactElement {
  const dispatch = useDispatch();
  const me = useSelector((state: RootState) => state.me);

  useEffect(() => {
    if (me) {
      dispatch(loadFollowedPostings());
    } else {
      dispatch(loadMe());
    }
  }, [dispatch, me]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="auth">
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
        </Route>
        <Route path="postings">
          <Route path="create" element={<CreatePosting />} />
          <Route path=":id" element={<FullPosting />} />
          <Route path=":id/edit" element={<EditPosting />} />
          <Route path=":id/chat" element={<FullChat />} />
        </Route>
        <Route path="account">
          <Route path="followed" element={<Followed />} />
          <Route path="postings" element={<MyPostings />} />
        </Route>

        <Route path="chats" element={<Chats />} />
      </Routes>
      <Footer />
    </>
  );
}
