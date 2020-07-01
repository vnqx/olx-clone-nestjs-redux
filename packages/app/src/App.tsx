import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { initializeMe } from "./reducers/meReducer";
import { RootState } from "./store";

export default function App(): React.ReactElement {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeMe());
  }, [dispatch]);

  const me = useSelector((state: RootState) => {
    return state.me;
  });

  console.log(me);

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
