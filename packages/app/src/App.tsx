import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Header from "./Header";
import { useDispatch } from "react-redux";
import { initMe } from "./reducers/authReducer";
import FullPosting from "./pages/FullPosting";
import Home from "./pages/Home";
import CreatePosting from "./pages/CreatePosting";

export default function App(): React.ReactElement {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initMe());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="auth">
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
        </Route>
        <Route path="postings/create" element={<CreatePosting />} />
        <Route path="postings/:id" element={<FullPosting />} />
      </Routes>
    </>
  );
}
