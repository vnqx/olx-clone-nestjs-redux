import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Header from "./Header";
import { useDispatch } from "react-redux";
import { initMe } from "./reducers/authReducer";

export default function App(): React.ReactElement {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initMe());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<div>qweqwe</div>} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
      </Routes>
    </>
  );
}
